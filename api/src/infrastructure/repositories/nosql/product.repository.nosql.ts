import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { IProductRepository } from '../../../common/interfaces/product.repository.interface';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { CreateProductDto } from '../../../common/dto/create-product.dto';
import { UpdateProductDto } from '../../../common/dto/update-product.dto';
import { ProductNotFoundException } from '../../../common/exceptions/product-not-found.exception';

interface ProductDocument extends Document {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductRepositoryNosql implements IProductRepository, OnModuleInit, OnModuleDestroy {
  private productModel: unknown;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    const { Schema, model } = await import('mongoose');

    const productSchema = new Schema<ProductDocument>(
      {
        id: { type: String, required: true, unique: true, index: true },
        name: { type: String, required: true, maxlength: 255 },
        description: { type: String, default: null },
        price: { type: Number, required: true, min: 0 },
        stock: { type: Number, required: true, default: 0, min: 0 },
        category: { type: String, default: null, maxlength: 100 },
      },
      {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        versionKey: false,
      },
    );

    this.productModel = model<ProductDocument>('Product', productSchema);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.connection.readyState === 1) {
      await this.connection.close();
    }
  }

  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private mapDocumentToEntity(doc: ProductDocument): ProductEntity {
    const entity = new ProductEntity();
    entity.id = doc.id;
    entity.name = doc.name;
    entity.description = doc.description;
    entity.price = doc.price;
    entity.stock = doc.stock;
    entity.category = doc.category;
    entity.createdAt = doc.createdAt;
    entity.updatedAt = doc.updatedAt;
    return entity;
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const ProductModel = this.productModel as new (args: Partial<ProductDocument>) => ProductDocument;
    const product = new ProductModel({
      id: this.generateUuid(),
      name: createProductDto.name,
      description: createProductDto.description || null,
      price: createProductDto.price,
      stock: createProductDto.stock || 0,
      category: createProductDto.category || null,
    } as Partial<ProductDocument>);

    const savedProduct = await product.save();
    return this.mapDocumentToEntity(savedProduct);
  }

  async findAll(): Promise<ProductEntity[]> {
    const ProductModel = this.productModel as {
      find: () => { sort: () => { exec: () => Promise<ProductDocument[]> } };
    };
    const products = await ProductModel.find().sort({ createdAt: -1 }).exec();
    return products.map((doc: ProductDocument) => this.mapDocumentToEntity(doc));
  }

  async findOne(id: string): Promise<ProductEntity | null> {
    const ProductModel = this.productModel as {
      findOne: (query: { id: string }) => { exec: () => Promise<ProductDocument | null> };
    };
    const product = await ProductModel.findOne({ id }).exec();

    if (!product) {
      return null;
    }

    return this.mapDocumentToEntity(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity | null> {
    const ProductModel = this.productModel as {
      findOne: (query: { id: string }) => { exec: () => Promise<ProductDocument | null> };
      findOneAndUpdate: (
        query: { id: string },
        update: Partial<ProductDocument>,
        options: { new: boolean },
      ) => { exec: () => Promise<ProductDocument | null> };
    };

    const existingProduct = await ProductModel.findOne({ id }).exec();

    if (!existingProduct) {
      return null;
    }

    const updateData: Partial<ProductDocument> = {};

    if (updateProductDto.name !== undefined) {
      updateData.name = updateProductDto.name;
    }
    if (updateProductDto.description !== undefined) {
      updateData.description = updateProductDto.description;
    }
    if (updateProductDto.price !== undefined) {
      updateData.price = updateProductDto.price;
    }
    if (updateProductDto.stock !== undefined) {
      updateData.stock = updateProductDto.stock;
    }
    if (updateProductDto.category !== undefined) {
      updateData.category = updateProductDto.category;
    }

    const updatedProduct = await ProductModel
      .findOneAndUpdate({ id }, updateData, { new: true })
      .exec();

    if (!updatedProduct) {
      return null;
    }

    return this.mapDocumentToEntity(updatedProduct);
  }

  async remove(id: string): Promise<boolean> {
    const ProductModel = this.productModel as {
      deleteOne: (query: { id: string }) => { exec: () => Promise<{ deletedCount: number }> };
    };
    const result = await ProductModel.deleteOne({ id }).exec();

    return result.deletedCount > 0;
  }

  async exists(id: string): Promise<boolean> {
    const ProductModel = this.productModel as {
      findOne: (query: { id: string }) => { exec: () => Promise<ProductDocument | null> };
    };
    const product = await ProductModel.findOne({ id }).exec();
    return product !== null;
  }

  async findByCategory(category: string): Promise<ProductEntity[]> {
    const ProductModel = this.productModel as {
      find: (query: { category: string }) => { sort: () => { exec: () => Promise<ProductDocument[]> } };
    };
    const products = await ProductModel.find({ category }).sort({ createdAt: -1 }).exec();
    return products.map((doc: ProductDocument) => this.mapDocumentToEntity(doc));
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<ProductEntity[]> {
    const ProductModel = this.productModel as {
      find: (query: { price: { $gte: number; $lte: number } }) => { exec: () => Promise<ProductDocument[]> };
    };
    const products = await ProductModel.find({ price: { $gte: minPrice, $lte: maxPrice } }).exec();
    return products.map((doc: ProductDocument) => this.mapDocumentToEntity(doc));
  }

  async updateStock(id: string, quantity: number): Promise<ProductEntity | null> {
    const ProductModel = this.productModel as {
      findOne: (query: { id: string }) => { exec: () => Promise<ProductDocument | null> };
      findOneAndUpdate: (
        query: { id: string },
        update: { $inc: { stock: number } },
        options: { new: boolean },
      ) => { exec: () => Promise<ProductDocument | null> };
    };

    const existingProduct = await ProductModel.findOne({ id }).exec();
    if (!existingProduct) {
      return null;
    }

    const updatedProduct = await ProductModel
      .findOneAndUpdate({ id }, { $inc: { stock: quantity } }, { new: true })
      .exec();

    if (!updatedProduct) {
      return null;
    }

    return this.mapDocumentToEntity(updatedProduct);
  }
}
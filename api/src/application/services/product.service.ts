import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IProductRepository } from '../../common/interfaces/product.repository.interface';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../common/dto/create-product.dto';
import { UpdateProductDto } from '../../common/dto/update-product.dto';
import { ProductNotFoundException } from '../../common/exceptions/product-not-found.exception';

export const PRODUCT_REPOSITORY_TOKEN = 'PRODUCT_REPOSITORY_TOKEN';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const product = new ProductEntity();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.stock = createProductDto.stock;
    product.category = createProductDto.category;
    product.createdAt = new Date();
    product.updatedAt = new Date();

    return await this.productRepository.create(createProductDto);
  }

  async getProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new ProductNotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const existingProduct = await this.productRepository.findOne(id);
    if (!existingProduct) {
      throw new ProductNotFoundException(`Product with ID ${id} not found`);
    }

    if (updateProductDto.name !== undefined) {
      existingProduct.name = updateProductDto.name;
    }
    if (updateProductDto.price !== undefined) {
      existingProduct.price = updateProductDto.price;
    }
    if (updateProductDto.stock !== undefined) {
      existingProduct.stock = updateProductDto.stock;
    }
    if (updateProductDto.category !== undefined) {
      existingProduct.category = updateProductDto.category;
    }
    existingProduct.updatedAt = new Date();

    return await this.productRepository.update(id, updateProductDto);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new ProductNotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.remove(id);
  }
}
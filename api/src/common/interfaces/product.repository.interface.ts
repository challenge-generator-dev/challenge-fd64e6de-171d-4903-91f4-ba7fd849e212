import { ProductEntity } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export interface IProductRepository {
  create(createProductDto: CreateProductDto): Promise<ProductEntity>;
  findAll(): Promise<ProductEntity[]>;
  findOne(id: string): Promise<ProductEntity | null>;
  update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity | null>;
  remove(id: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;
  findByCategory(category: string): Promise<ProductEntity[]>;
  findByPriceRange(minPrice: number, maxPrice: number): Promise<ProductEntity[]>;
  updateStock(id: string, quantity: number): Promise<ProductEntity | null>;
}

export const PRODUCT_REPOSITORY_TOKEN = 'IProductRepository';

export type ProductRepositoryInterface = IProductRepository;
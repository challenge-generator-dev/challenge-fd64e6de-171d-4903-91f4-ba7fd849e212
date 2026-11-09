import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool, PoolConfig } from 'pg';
import { ConfigService } from '@nestjs/config';
import { IProductRepository } from '../../../common/interfaces/product.repository.interface';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { CreateProductDto } from '../../../common/dto/create-product.dto';
import { UpdateProductDto } from '../../../common/dto/update-product.dto';
import { ProductNotFoundException } from '../../../common/exceptions/product-not-found.exception';

@Injectable()
export class ProductRepositorySql implements IProductRepository, OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const poolConfig: PoolConfig = {
      host: this.configService.get<string>('DB_SQL_HOST', 'localhost'),
      port: this.configService.get<number>('DB_SQL_PORT', 5432),
      user: this.configService.get<string>('DB_SQL_USER', 'postgres'),
      password: this.configService.get<string>('DB_SQL_PASSWORD', 'postgres'),
      database: this.configService.get<string>('DB_SQL_DATABASE', 'products'),
      max: this.configService.get<number>('DB_SQL_POOL_MAX', 10),
      idleTimeoutMillis: this.configService.get<number>('DB_SQL_IDLE_TIMEOUT', 30000),
      connectionTimeoutMillis: this.configService.get<number>('DB_SQL_CONNECTION_TIMEOUT', 2000),
    };

    this.pool = new Pool(poolConfig);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    try {
      await this.pool.query(createTableQuery);
    } catch (error) {
      console.error('Error al crear la tabla de productos:', error);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
    }
  }

  private mapRowToEntity(row: Record<string, unknown>): ProductEntity {
    const entity = new ProductEntity();
    entity.id = row.id as string;
    entity.name = row.name as string;
    entity.description = row.description as string | null;
    entity.price = Number(row.price);
    entity.stock = row.stock as number;
    entity.category = row.category as string | null;
    entity.createdAt = row.created_at as Date;
    entity.updatedAt = row.updated_at as Date;
    return entity;
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const query = `
      INSERT INTO products (name, description, price, stock, category)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      createProductDto.name,
      createProductDto.description || null,
      createProductDto.price,
      createProductDto.stock || 0,
      createProductDto.category || null,
    ];

    const result = await this.pool.query(query, values);
    return this.mapRowToEntity(result.rows[0]);
  }

  async findAll(): Promise<ProductEntity[]> {
    const query = 'SELECT * FROM products ORDER BY created_at DESC;';
    const result = await this.pool.query(query);
    return result.rows.map((row) => this.mapRowToEntity(row));
  }

  async findOne(id: string): Promise<ProductEntity | null> {
    const query = 'SELECT * FROM products WHERE id = $1;';
    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToEntity(result.rows[0]);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity | null> {
    const existingProduct = await this.findOne(id);
    if (!existingProduct) {
      return null;
    }

    const updates: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (updateProductDto.name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(updateProductDto.name);
    }
    if (updateProductDto.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(updateProductDto.description);
    }
    if (updateProductDto.price !== undefined) {
      updates.push(`price = $${paramIndex++}`);
      values.push(updateProductDto.price);
    }
    if (updateProductDto.stock !== undefined) {
      updates.push(`stock = $${paramIndex++}`);
      values.push(updateProductDto.stock);
    }
    if (updateProductDto.category !== undefined) {
      updates.push(`category = $${paramIndex++}`);
      values.push(updateProductDto.category);
    }

    if (updates.length === 0) {
      return existingProduct;
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE products
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *;
    `;

    const result = await this.pool.query(query, values);
    return this.mapRowToEntity(result.rows[0]);
  }

  async remove(id: string): Promise<boolean> {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING id;';
    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      return false;
    }
    return true;
  }

  async exists(id: string): Promise<boolean> {
    const query = 'SELECT 1 FROM products WHERE id = $1 LIMIT 1;';
    const result = await this.pool.query(query, [id]);
    return result.rows.length > 0;
  }

  async findByCategory(category: string): Promise<ProductEntity[]> {
    const query = 'SELECT * FROM products WHERE category = $1 ORDER BY created_at DESC;';
    const result = await this.pool.query(query, [category]);
    return result.rows.map((row) => this.mapRowToEntity(row));
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<ProductEntity[]> {
    const query = 'SELECT * FROM products WHERE price >= $1 AND price <= $2 ORDER BY price ASC;';
    const result = await this.pool.query(query, [minPrice, maxPrice]);
    return result.rows.map((row) => this.mapRowToEntity(row));
  }

  async updateStock(id: string, quantity: number): Promise<ProductEntity | null> {
    const existingProduct = await this.findOne(id);
    if (!existingProduct) {
      return null;
    }

    const query = `
      UPDATE products
      SET stock = stock + $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *;
    `;

    const result = await this.pool.query(query, [quantity, id]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToEntity(result.rows[0]);
  }
}
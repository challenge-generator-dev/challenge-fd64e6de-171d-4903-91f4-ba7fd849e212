import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsNotEmpty, IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class ProductEntity {
  @ApiProperty({
    description: 'Identificador único del producto',
    example: '60d5ec9f8b3a8b001f1a5c7a',
    required: false,
  })
  @Prop({ type: String })
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Gamer',
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Laptop con GPU dedicada para gaming',
    required: false,
  })
  @Prop()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1299.99,
  })
  @Prop({ required: true })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Cantidad en stock',
    example: 50,
  })
  @Prop({ required: true, default: 0 })
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({
    description: 'Categoría del producto',
    example: 'Electrónicos',
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
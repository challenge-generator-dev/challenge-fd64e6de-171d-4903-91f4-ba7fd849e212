import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Gamer',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Laptop con GPU dedicada para gaming',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1299.99,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Cantidad en stock',
    example: 50,
  })
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({
    description: 'Categoría del producto',
    example: 'Electrónicos',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
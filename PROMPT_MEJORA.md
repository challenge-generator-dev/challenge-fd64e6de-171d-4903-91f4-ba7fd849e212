# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de Operaciones CRUD en Bases de Datos
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del Entorno — objetivo: Configurar el entorno de desarrollo para trabajar con bases de datos SQL y NoSQL. — entregable (NO resolver): Entorno de desarrollo configurado con acceso a bases de datos SQL y NoSQL.
- Fase 2: Implementación de Operaciones CRUD en SQL — objetivo: Implementar operaciones CRUD en una base de datos SQL. — entregable (NO resolver): Operaciones CRUD funcionales en una base de datos SQL.
- Fase 3: Implementación de Operaciones CRUD en NoSQL — objetivo: Implementar operaciones CRUD en una base de datos NoSQL. — entregable (NO resolver): Operaciones CRUD funcionales en una base de datos NoSQL.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "product-api",
  "version": "1.0.0",
  "description": "API para gestión de productos con soporte para SQL y NoSQL",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "start:dev": "ts-node-dev src/main.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint \"src/**/*.ts\" --fix"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.4.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "@nestjs/config": "^3.1.0",
    "pg": "^8.11.3",
    "mongoose": "^8.0.3",
    "@nestjs/mongoose": "^10.0.2",
    "aws-sdk": "^2.1536.0",
    "@aws-sdk/client-dynamodb": "^3.485.0",
    "@aws-sdk/lib-dynamodb": "^3.485.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1",
    "typescript": "^5.3.3",
    "ts-node": "^10.9.1",
    "ts-node-dev": "^2.0.0",
    "@types/node": "^20.10.5",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "prettier": "^3.1.1"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "esModuleInterop": true
  },
  "exclude": ["node_modules", "dist"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle('Product API')
    .setDescription('API para gestión de productos con SQL y NoSQL')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

// === ARCHIVO: api/src/domain/entities/product.entity.ts ===
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

// === ARCHIVO: api/src/common/dto/create-product.dto.ts ===
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

// === ARCHIVO: api/src/common/dto/update-product.dto.ts ===
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Gamer Actualizada',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Laptop con GPU dedicada para gaming y mayor RAM',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1399.99,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Cantidad en stock',
    example: 30,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'Categoría del producto',
    example: 'Electrónicos',
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;
}

// === ARCHIVO: api/src/common/interfaces/product.repository.interface.ts ===
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

// === ARCHIVO: api/src/common/exceptions/product-not-found.exception.ts ===
import {
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  private readonly productId: string;
  private readonly timestamp: Date;
  private readonly searchContext: string;

  constructor(productId: string, searchContext?: string) {
    const message = `Producto con ID '${productId}' no encontrado`;
    const status = HttpStatus.NOT_FOUND;
    
    super(
      {
        statusCode: status,
        message: message,
        error: 'Not Found',
        productId: productId,
        timestamp: new Date().toISOString(),
        searchContext: searchContext || 'default',
        suggestion: 'Verifique que el ID sea correcto o que el producto no haya sido eliminado anteriormente.',
        availableEndpoints: [
          'GET /products - Listar todos los productos',
          'GET /products/:id - Obtener un producto específico',
          'POST /products - Crear un nuevo producto',
        ],
      },
      status,
    );
    
    this.productId = productId;
    this.timestamp = new Date();
    this.searchContext = searchContext || 'default';
    
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (!this.productId || this.productId.trim() === '') {
      throw new Error('El ID del producto no puede estar vacío');
    }
    
    if (this.productId.length > 100) {
      throw new Error('El ID del producto no puede exceder 100 caracteres');
    }
    
    const validContexts = ['default', 'update', 'delete', 'stock'];
    if (!validContexts.includes(this.searchContext)) {
      throw new Error('El contexto de búsqueda debe ser uno de: default, update, delete, stock');
    }
  }

  getProductId(): string {
    return this.productId;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }

  getSearchContext(): string {
    return this.searchContext;
  }

  static createForUpdate(productId: string): ProductNotFoundException {
    return new ProductNotFoundException(productId, 'update');
  }

  static createForDelete(productId: string): ProductNotFoundException {
    return new ProductNotFoundException(productId, 'delete');
  }

  static createForStock(productId: string): ProductNotFoundException {
    return new ProductNotFoundException(productId, 'stock');
  }

  static createForFind(productId: string): ProductNotFoundException {
    return new ProductNotFoundException(productId, 'default');
  }
}

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductService } from './application/services/product.service';
import { ProductRepositorySql } from './infrastructure/repositories/sql/product.repository.sql';
import { ProductRepositoryNosql } from './infrastructure/repositories/nosql/product.repository.nosql';
import { PRODUCT_REPOSITORY_TOKEN } from './common/interfaces/product.repository.interface';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.nosql.uri') || 'mongodb://localhost:27017/productdb',
        dbName: configService.get<string>('database.nosql.database') || 'productdb',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY_TOKEN,
      useFactory: (configService: ConfigService): any => {
        const dbType = configService.get<string>('database.preferred') || 'sql';
        
        if (dbType === 'nosql') {
          return new ProductRepositoryNosql(configService);
        }
        
        return new ProductRepositorySql(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [ProductService, PRODUCT_REPOSITORY_TOKEN],
})
export class AppModule {}

// === ARCHIVO: api/src/application/services/product.service.ts ===
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

// === ARCHIVO: api/src/infrastructure/controllers/product.controller.ts ===
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, ParseUUIDPipe, NotFoundExceptionMiddleware } from '@nestjs/common';
import { ProductService } from '../../application/services/product.service';
import { CreateProductDto } from '../../common/dto/create-product.dto';
import { UpdateProductDto } from '../../common/dto/update-product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: ProductEntity })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [ProductEntity] })
  async getProducts(): Promise<ProductEntity[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: 'string' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: ProductEntity })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async getProductById(@Param('id', ParseUUIDPipe) id: string): Promise<ProductEntity> {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: 'string' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado', type: ProductEntity })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: 'string' })
  @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/sql/product.repository.sql.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/nosql/product.repository.nosql.ts ===
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

// === ARCHIVO: api/src/config/configuration.ts ===
import { ConfigFactory } from '@nestjs/config';

const configuration: ConfigFactory = () => ({
  database: {
    sql: {
      host: process.env.DATABASE_SQL_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_SQL_PORT || '5432', 10),
      username: process.env.DATABASE_SQL_USERNAME || 'postgres',
      password: process.env.DATABASE_SQL_PASSWORD || 'postgres',
      database: process.env.DATABASE_SQL_DATABASE || 'productdb',
    },
    nosql: {
      uri: process.env.DATABASE_NOSQL_URI || 'mongodb://localhost:27017',
      database: process.env.DATABASE_NOSQL_DATABASE || 'productdb',
    },
    preferred: process.env.DATABASE_PREFERRED || 'sql',
  },
  app: {
    host: process.env.APP_HOST || '0.0.0.0',
    port: parseInt(process.env.APP_PORT || '3000', 10),
    name: process.env.APP_NAME || 'product-api',
    env: process.env.NODE_ENV || 'development',
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    dynamodb: {
      tableName: process.env.AWS_DYNAMODB_TABLE || 'products',
    },
  },
});

export default configuration;

// === ARCHIVO: client/package.json ===
{
  "name": "product-management-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "19.0.0-rc.0",
    "react-dom": "19.0.0-rc.0",
    "react-router-dom": "6.21.1",
    "axios": "1.6.2"
  },
  "devDependencies": {
    "@types/react": "18.2.45",
    "@types/react-dom": "18.2.18",
    "@vitejs/plugin-react": "4.2.1",
    "vite": "5.0.10",
    "typescript": "^5.2.2",
    "@types/node": "^20.10.5",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "@testing-library/react": "14.1.2",
    "vitest": "1.1.0",
    "jsdom": "^23.0.1"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "plugins": [
      "react",
      "@typescript-eslint",
      "react-hooks",
      "react-refresh"
    ],
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { "allowConstantExport": true }
      ]
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'axios']
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src"
  ]
}


// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// === ARCHIVO: client/src/App.tsx ===
import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ProductService } from '@/services/productService';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkApiAvailability = async () => {
      try {
        await ProductService.getProducts();
        setLoading(false);
      } catch (err) {
        setError('Failed to connect to the API. Please ensure the backend is running.');
        setLoading(false);
      }
    };

    checkApiAvailability();
  }, []);

  if (loading) {
    return <div className="loading">Loading application...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Product Management</h1>
        <nav>
          <button
            onClick={() => navigate('/')}
            className={location.pathname === '/' ? 'active' : ''}
          >
            Products
          </button>
          <button
            onClick={() => navigate('/new')}
            className={location.pathname === '/new' ? 'active' : ''}
          >
            Add Product
          </button>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

export default App;

// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gestión de Productos</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/pages/ProductList.tsx ===
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const API_URL = 'http://localhost:3000';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Product[]>(`${API_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Error al cargar productos';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Error al eliminar producto';
      alert(message);
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={fetchProducts}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="page-header">
        <h1>Gestión de Productos</h1>
        <Link to="/products/new" className="btn btn-primary">
          Nuevo Producto
        </Link>
      </header>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No hay productos registrados.</p>
          <Link to="/products/new" className="btn btn-secondary">
            Crear primer producto
          </Link>
        </div>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td className="actions">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-small"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deleteLoading === product.id}
                    className="btn btn-small btn-danger"
                  >
                    {deleteLoading === product.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// === ARCHIVO: client/src/pages/ProductForm.tsx ===
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface ProductFormData {
  name: string;
  price: string;
  stock: string;
  category: string;
}

const API_URL = 'http://localhost:3000';

export function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    stock: '',
    category: '',
  });

  const isEditing = !!id;

  useEffect(() => {
    if (id) {
      fetchProduct(parseInt(id, 10));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setFetching(true);
      const response = await axios.get<Product>(`${API_URL}/products/${productId}`);
      const product = response.data;
      setFormData({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
      });
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Error al cargar el producto';
      setError(message);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('El nombre es obligatorio');
      return false;
    }
    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      setError('El precio debe ser un número positivo');
      return false;
    }
    const stock = parseInt(formData.stock, 10);
    if (isNaN(stock) || stock < 0) {
      setError('El stock debe ser un número entero positivo');
      return false;
    }
    if (!formData.category.trim()) {
      setError('La categoría es obligatoria');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        category: formData.category.trim(),
      };

      if (isEditing) {
        await axios.put(`${API_URL}/products/${id}`, payload);
      } else {
        await axios.post(`${API_URL}/products`, payload);
      }

      navigate('/products');
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : `Error al ${isEditing ? 'actualizar' : 'crear'} el producto`;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="container">
        <div className="loading">Cargando producto...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="page-header">
        <h1>{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h1>
        <button
          onClick={() => navigate('/products')}
          className="btn btn-secondary"
        >
          Volver
        </button>
      </header>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            placeholder="Ingresa el nombre del producto"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            placeholder="Ej: Electrónica, Ropa, Alimentos"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Precio ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={loading}
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              disabled={loading}
              min="0"
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading
              ? isEditing
                ? 'Actualizando...'
                : 'Creando...'
              : isEditing
              ? 'Actualizar Producto'
              : 'Crear Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/App.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/setupTests.ts ===
// Setup de tests generado automaticamente (referenciado por la config del runner).
// Agrega aca matchers globales o mocks compartidos.
export {};


// === ARCHIVO: client/src/router.ts ===
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ProductList } from './pages/ProductList';
import { ProductForm } from './pages/ProductForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: 'new',
        element: <ProductForm />,
      },
      {
        path: 'edit/:id',
        element: <ProductForm />,
      },
    ],
  },
]);

// === ARCHIVO: client/src/services/productService.ts ===
import axios, { AxiosInstance } from 'axios';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
  description?: string;
}

const API_BASE_URL = 'http://localhost:3000';

class ProductServiceClass {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  async getProducts(): Promise<Product[]> {
    const response = await this.client.get<Product[]>('/products');
    return response.data;
  }

  async getProductById(id: string): Promise<Product> {
    const response = await this.client.get<Product>(`/products/${id}`);
    return response.data;
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    const response = await this.client.post<Product>('/products', data);
    return response.data;
  }

  async updateProduct(id: string, data: UpdateProductDto): Promise<Product> {
    const response = await this.client.put<Product>(`/products/${id}`, data);
    return response.data;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.client.delete(`/products/${id}`);
  }
}

export const ProductService = new ProductServiceClass();

// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```

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
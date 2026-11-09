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
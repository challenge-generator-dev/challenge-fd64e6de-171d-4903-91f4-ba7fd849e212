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
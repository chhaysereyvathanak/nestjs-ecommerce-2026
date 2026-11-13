import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  findAll() {
    return [
      { id: 1, name: 'Sample Product', price: 19.99 },
      { id: 2, name: 'Another Product', price: 29.99 },
      { id: 3, name: 'Best Product', price: 49.99 },
    ];
  }
}

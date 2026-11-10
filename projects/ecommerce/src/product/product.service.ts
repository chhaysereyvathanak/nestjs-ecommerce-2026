import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  private products = [
    { id: 1, name: 'Sample Product', price: 19.99, categoryId: 1 },
    { id: 2, name: 'Another Product', price: 29.99, categoryId: 1 },
    { id: 3, name: 'Best Product', price: 49.99, categoryId: 1 },
  ];

  constructor(private readonly categoryService: CategoryService) {}

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(dto: CreateProductDto) {
    this.categoryService.findOne(dto.categoryId);
    const nextId = Math.max(0, ...this.products.map((item) => item.id)) + 1;
    const product = {
      id: nextId,
      name: dto.name,
      price: dto.price,
      categoryId: dto.categoryId,
    };
    this.products.push(product);
    return product;
  }

  update(id: number, dto: UpdateProductDto) {
    if (dto.categoryId !== undefined) {
      this.categoryService.findOne(dto.categoryId);
    }
    const product = this.findOne(id);
    Object.assign(product, dto);
    return product;
  }

  remove(id: number) {
    this.findOne(id);
    this.products = this.products.filter((item) => item.id !== id);
    return { removed: true };
  }
}

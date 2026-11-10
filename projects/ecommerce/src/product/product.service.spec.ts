import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { CategoryService } from '../category/category.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, CategoryService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throws NotFoundException when the product does not exist', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });
});

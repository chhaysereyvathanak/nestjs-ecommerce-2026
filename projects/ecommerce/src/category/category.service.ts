import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private categories = [{ id: 1, name: 'Lighting' }];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }

  create(dto: CreateCategoryDto) {
    const nextId = Math.max(0, ...this.categories.map((item) => item.id)) + 1;
    const category = { id: nextId, name: dto.name };
    this.categories.push(category);
    return category;
  }

  update(id: number, dto: UpdateCategoryDto) {
    const category = this.findOne(id);
    Object.assign(category, dto);
    return category;
  }

  remove(id: number) {
    this.findOne(id);
    this.categories = this.categories.filter((item) => item.id !== id);
    return { removed: true };
  }
}

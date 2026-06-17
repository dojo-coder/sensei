import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { Item } from './item.interface';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Item {
    const item = this.itemsService.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item;
  }
}

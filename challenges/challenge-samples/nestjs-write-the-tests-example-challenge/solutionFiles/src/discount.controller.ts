import { Controller, Get, Query } from '@nestjs/common';
import { DiscountService } from './discount.service';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get()
  apply(@Query('price') price: string, @Query('percent') percent: string): { total: number } {
    return { total: this.discountService.apply(Number(price), Number(percent)) };
  }
}

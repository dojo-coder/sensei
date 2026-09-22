import { Module } from '@nestjs/common';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';

@Module({
  imports: [],
  controllers: [DiscountController],
  providers: [DiscountService]
})
export class AppModule {}

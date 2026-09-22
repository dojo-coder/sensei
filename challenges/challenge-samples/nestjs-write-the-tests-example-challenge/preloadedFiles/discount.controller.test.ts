import 'reflect-metadata';
import { describe, it, expect, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { DiscountController } from './src/discount.controller';
import { DiscountService } from './src/discount.service';

describe('DiscountController', () => {
  let controller: DiscountController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [DiscountController],
      providers: [DiscountService]
    }).compile();

    controller = moduleRef.get<DiscountController>(DiscountController);
  });

  it('applies a 20% discount to a price of 100', () => {
    expect(controller.apply('100', '20')).toEqual({ total: 80 });
  });

  // Add tests until every hidden bug is caught.
});

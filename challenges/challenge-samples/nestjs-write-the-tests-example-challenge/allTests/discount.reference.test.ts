import 'reflect-metadata';
import { describe, it, expect, beforeEach } from 'vitest';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DiscountController } from './src/discount.controller';
import { DiscountService } from './src/discount.service';

describe('DiscountController (reference suite)', () => {
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

  it('keeps the full price for a 0% discount', () => {
    expect(controller.apply('100', '0')).toEqual({ total: 100 });
  });

  it('returns 0 for a 100% discount', () => {
    expect(controller.apply('100', '100')).toEqual({ total: 0 });
  });

  it('rounds the discounted price to cents', () => {
    expect(controller.apply('19.99', '15')).toEqual({ total: 16.99 });
  });

  it('rejects a percent above 100', () => {
    expect(() => controller.apply('100', '150')).toThrow(BadRequestException);
  });

  it('rejects a negative percent', () => {
    expect(() => controller.apply('100', '-5')).toThrow(BadRequestException);
  });
});

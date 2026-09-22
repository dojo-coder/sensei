import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DiscountService {
  /**
   * Applies a percentage discount to a price and returns the discounted price,
   * rounded to cents.
   */
  apply(price: number, percent: number): number {
    if (!Number.isFinite(price) || price < 0) {
      throw new BadRequestException('price must be a non-negative number');
    }

    if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
      throw new BadRequestException('percent must be between 0 and 100');
    }

    const discounted = price * (percent / 100);

    return Math.round(discounted * 100) / 100;
  }
}

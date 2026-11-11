The NestJS discount endpoint in `src/discount.service.ts` and `src/discount.controller.ts` is already written and **correct**. Write the **Vitest tests** in `discount.controller.test.ts` that prove it, building a `TestingModule` with `@nestjs/testing` like the starter test does.

`GET /discount?price=100&percent=20` answers `{ "total": 80 }`; in your tests you call `controller.apply('100', '20')` directly. Your tests run against the real code and against several hidden **buggy copies** of the service (mutants). A strong test suite passes on the real one and fails on every buggy one.

### Rules & clarifications

- The total is the price **minus** the percentage discount, **rounded to cents**.
- `percent` must be between **0 and 100**, both included; outside that range the call throws a **`BadRequestException`**.
- A negative or non-numeric `price` also throws a `BadRequestException`.
- Your tests must **pass** against the reference code and **fail** against **every** hidden mutant.
- A single ordinary discount catches almost nothing: think about the **edges of the percent range**, **invalid input** and **rounding**.

### Examples

- `controller.apply('100', '20')` returns `{ total: 80 }`
- `controller.apply('100', '0')` returns `{ total: 100 }`
- `controller.apply('100', '100')` returns `{ total: 0 }`
- `controller.apply('19.99', '15')` returns `{ total: 16.99 }` _(16.9915 rounded to cents)_
- `controller.apply('100', '150')` throws `BadRequestException`
- `controller.apply('-5', '10')` throws `BadRequestException`

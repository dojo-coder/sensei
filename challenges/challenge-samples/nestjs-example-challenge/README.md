Implement an `AppService.getHello()` method that returns the string `Hello, World!`.

The NestJS scaffolding is already wired:

- `src/main.ts` — bootstraps the app on port 3000 (readonly)
- `src/app.module.ts` — registers `AppController` + `AppService` (readonly)
- `src/app.controller.ts` — handles `GET /` and delegates to `AppService.getHello()` (readonly)
- `src/app.service.ts` — **the file you edit**

Replace the body of `AppService.getHello()` so it returns the string `'Hello, World!'`. NestJS will auto-serialize the string to a `text/plain` response.

## Expected solution

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, World!';
  }
}
```

Do not modify `app.controller.ts` or `app.module.ts` — they are readonly. Tests build a `TestingModule` with both providers and assert `controller.getHello()` returns `'Hello, World!'`.

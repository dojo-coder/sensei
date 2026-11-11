Write the method `getHello()` of the class `AppService`, which returns the string `Hello, World!`. The controller already answers `GET /` with the value this method returns.

### Rules & clarifications

- The text is exactly `Hello, World!`, with the capital letters, the comma and the exclamation mark, and no spaces before or after it.
- The method returns a string, not an object.
- Write the method in `src/app.service.ts`. The tests build the module and call the controller without starting a server; `src/app.controller.ts`, `src/app.module.ts` and `src/main.ts` are read-only.

### Examples

- `getHello()` returns `"Hello, World!"`.
- `GET /` answers status `200` and the text `Hello, World!`.

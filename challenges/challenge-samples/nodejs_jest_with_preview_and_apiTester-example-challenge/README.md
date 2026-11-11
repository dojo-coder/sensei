An application still calls an old user API, whose methods receive separate arguments. The new API has other method names, and every method receives a single object.

Write the function `createApiWrapper(newApi)`, which receives the new API and returns an object with the four old methods. Each old method calls the matching new method and returns its result.

### Input and output

- `newApi` is an object with four functions: `fetchUser({ userId })`, `updateUser({ userId, ...data })`, `removeUser({ userId })` and `getUsers({ page, limit })`.
- The function returns an object with the methods `getUser(id)`, `saveUser(id, data)`, `deleteUser(id)` and `listUsers(page, limit)`.

### Rules & clarifications

- `getUser(id)` calls `newApi.fetchUser({ userId: id })`.
- `saveUser(id, data)` calls `newApi.updateUser({ userId: id, ...data })`: the fields of `data` are placed next to `userId`. For an empty `data` object the argument is `{ userId: id }`.
- `deleteUser(id)` calls `newApi.removeUser({ userId: id })`.
- `listUsers(page, limit)` calls `newApi.getUsers({ page, limit })`.
- Every old method returns exactly what the new method returns.
- An `id` can be a number or a string and is passed on unchanged; `0` is a valid `id`.
- Write the function in `index.js`. The same file starts a small server that uses your wrapper: open the **Preview** or the **API tester** and call `/user/get?id=1`, `/user/save?id=1&name=Jane`, `/user/delete?id=1` or `/users/list?page=1&limit=10`.
- Press **Run** to execute `main.js`, which prints the result of each old method.

### Examples

For `const wrapper = createApiWrapper(newApi)`:

- `wrapper.getUser(1)` calls `newApi.fetchUser({ userId: 1 })` and returns its result.
- `wrapper.saveUser(1, { name: "Jane" })` calls `newApi.updateUser({ userId: 1, name: "Jane" })`.
- `wrapper.deleteUser(1)` calls `newApi.removeUser({ userId: 1 })`.
- `wrapper.listUsers(1, 10)` calls `newApi.getUsers({ page: 1, limit: 10 })`.

Create a wrapper function that bridges deprecated API method signatures to a new API interface, ensuring backwards compatibility during migration.

## Challenge

Your legacy codebase uses an old API with simple method signatures:

* `getUser(id)` - Get a user by ID
* `saveUser(id, data)` - Update a user's data
* `deleteUser(id)` - Delete a user
* `listUsers(page, limit)` - List users with pagination

The new API has been refactored to use object parameters:

* `fetchUser({ userId })` - Get a user by ID
* `updateUser({ userId, ...data })` - Update a user's data
* `removeUser({ userId })` - Remove a user
* `getUsers({ page, limit })` - List users with pagination

## Task

Implement the `createApiWrapper` function that takes the new API object and returns a wrapper object with the old method signatures. The wrapper should translate calls from the old format to the new format.

## Example

```javascript
const newApi = {
  fetchUser: ({ userId }) => ({ id: userId, name: 'John' }),
  updateUser: ({ userId, name }) => ({ success: true, id: userId, name }),
  removeUser: ({ userId }) => ({ deleted: true, id: userId }),
  getUsers: ({ page, limit }) => ({ users: [], page, limit })
};

const wrapper = createApiWrapper(newApi);

wrapper.getUser(1);           // Calls newApi.fetchUser({ userId: 1 })
wrapper.saveUser(1, { name: 'Jane' }); // Calls newApi.updateUser({ userId: 1, name: 'Jane' })
wrapper.deleteUser(1);        // Calls newApi.removeUser({ userId: 1 })
wrapper.listUsers(1, 10);     // Calls newApi.getUsers({ page: 1, limit: 10 })
```

## Requirements

1. `getUser(id)` should call `newApi.fetchUser({ userId: id })` and return the result
2. `saveUser(id, data)` should call `newApi.updateUser({ userId: id, ...data })` and return the result
3. `deleteUser(id)` should call `newApi.removeUser({ userId: id })` and return the result
4. `listUsers(page, limit)` should call `newApi.getUsers({ page, limit })` and return the result
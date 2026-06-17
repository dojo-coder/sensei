const { createApiWrapper } = require('./index');

const newApi = {
  fetchUser: ({ userId }) => ({ id: userId, name: 'John Doe' }),
  updateUser: ({ userId, name }) => ({ success: true, id: userId, name }),
  removeUser: ({ userId }) => ({ deleted: true, id: userId }),
  getUsers: ({ page, limit }) => ({ users: ['user1', 'user2'], page, limit })
};

const wrapper = createApiWrapper(newApi);

console.log('wrapper.getUser(1):', wrapper.getUser(1));
console.log('wrapper.saveUser(1, { name: "Jane" }):', wrapper.saveUser(1, { name: 'Jane' }));
console.log('wrapper.deleteUser(1):', wrapper.deleteUser(1));
console.log('wrapper.listUsers(1, 10):', wrapper.listUsers(1, 10));

const { createApiWrapper } = require('./index');

describe('createApiWrapper', () => {
  let mockNewApi;
  let wrapper;

  beforeEach(() => {
    mockNewApi = {
      fetchUser: jest.fn(({ userId }) => ({ id: userId, name: 'Test User', email: 'test@example.com' })),
      updateUser: jest.fn(({ userId, ...data }) => ({ success: true, id: userId, ...data })),
      removeUser: jest.fn(({ userId }) => ({ deleted: true, id: userId })),
      getUsers: jest.fn(({ page, limit }) => ({ users: ['user1', 'user2'], page, limit, total: 100 }))
    };
    wrapper = createApiWrapper(mockNewApi);
  });

  describe('getUser', () => {
    it('should call fetchUser with userId object', () => {
      wrapper.getUser(123);
      expect(mockNewApi.fetchUser).toHaveBeenCalledWith({ userId: 123 });
    });

    it('should return the result from fetchUser', () => {
      const result = wrapper.getUser(456);
      expect(result).toEqual({ id: 456, name: 'Test User', email: 'test@example.com' });
    });

    it('should handle string user ids', () => {
      wrapper.getUser('abc-123');
      expect(mockNewApi.fetchUser).toHaveBeenCalledWith({ userId: 'abc-123' });
    });

    it('should handle zero as user id', () => {
      wrapper.getUser(0);
      expect(mockNewApi.fetchUser).toHaveBeenCalledWith({ userId: 0 });
    });
  });

  describe('saveUser', () => {
    it('should call updateUser with userId and spread data', () => {
      wrapper.saveUser(1, { name: 'John' });
      expect(mockNewApi.updateUser).toHaveBeenCalledWith({ userId: 1, name: 'John' });
    });

    it('should return the result from updateUser', () => {
      const result = wrapper.saveUser(1, { name: 'Jane' });
      expect(result).toEqual({ success: true, id: 1, name: 'Jane' });
    });

    it('should handle multiple data fields', () => {
      wrapper.saveUser(5, { name: 'Alice', email: 'alice@example.com', age: 30 });
      expect(mockNewApi.updateUser).toHaveBeenCalledWith({
        userId: 5,
        name: 'Alice',
        email: 'alice@example.com',
        age: 30
      });
    });

    it('should handle empty data object', () => {
      wrapper.saveUser(10, {});
      expect(mockNewApi.updateUser).toHaveBeenCalledWith({ userId: 10 });
    });
  });

  describe('deleteUser', () => {
    it('should call removeUser with userId object', () => {
      wrapper.deleteUser(99);
      expect(mockNewApi.removeUser).toHaveBeenCalledWith({ userId: 99 });
    });

    it('should return the result from removeUser', () => {
      const result = wrapper.deleteUser(42);
      expect(result).toEqual({ deleted: true, id: 42 });
    });

    it('should handle string user ids', () => {
      wrapper.deleteUser('user-xyz');
      expect(mockNewApi.removeUser).toHaveBeenCalledWith({ userId: 'user-xyz' });
    });
  });

  describe('listUsers', () => {
    it('should call getUsers with page and limit', () => {
      wrapper.listUsers(2, 25);
      expect(mockNewApi.getUsers).toHaveBeenCalledWith({ page: 2, limit: 25 });
    });

    it('should return the result from getUsers', () => {
      const result = wrapper.listUsers(1, 10);
      expect(result).toEqual({ users: ['user1', 'user2'], page: 1, limit: 10, total: 100 });
    });

    it('should handle first page with default limit', () => {
      wrapper.listUsers(1, 20);
      expect(mockNewApi.getUsers).toHaveBeenCalledWith({ page: 1, limit: 20 });
    });

    it('should handle large page numbers', () => {
      wrapper.listUsers(100, 50);
      expect(mockNewApi.getUsers).toHaveBeenCalledWith({ page: 100, limit: 50 });
    });
  });
});

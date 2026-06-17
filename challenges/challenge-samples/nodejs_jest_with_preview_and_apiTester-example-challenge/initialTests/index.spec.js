const { createApiWrapper } = require('./index');

describe('createApiWrapper', () => {
  let mockNewApi;
  let wrapper;

  beforeEach(() => {
    mockNewApi = {
      fetchUser: jest.fn(({ userId }) => ({ id: userId, name: 'Test User' })),
      updateUser: jest.fn(({ userId, name }) => ({ success: true, id: userId, name })),
      removeUser: jest.fn(({ userId }) => ({ deleted: true, id: userId })),
      getUsers: jest.fn(({ page, limit }) => ({ users: [], page, limit }))
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
      expect(result).toEqual({ id: 456, name: 'Test User' });
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
  });

  describe('deleteUser', () => {
    it('should call removeUser with userId object', () => {
      wrapper.deleteUser(99);
      expect(mockNewApi.removeUser).toHaveBeenCalledWith({ userId: 99 });
    });
  });

  describe('listUsers', () => {
    it('should call getUsers with page and limit', () => {
      wrapper.listUsers(2, 25);
      expect(mockNewApi.getUsers).toHaveBeenCalledWith({ page: 2, limit: 25 });
    });
  });
});

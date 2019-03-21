const { verifyContent, verifyPassword } = require('../server/utilities/verify');

describe('verifyContent', () => {
  test('should be a function', () => {
    expect(typeof verifyContent).toBe('function');
  });

  test('should a return { email: false, restaurant: false } if account email and restaurnat are already in DB', () => {
    const mockData = { email: 'test@test.com', restaurant: 'test' };

    return verifyContent(mockData).then((data) => {
      expect(data).toBe({ email: false, restaurant: false });
    });
  });
});

describe('verifyPassword', () => {
  test('should be a function', () => {
    expect(typeof verifyPassword).toBe('function');
  });
});

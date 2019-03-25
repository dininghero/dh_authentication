const { JsonWebToken } = require('../server/utilities/jwt');

const jwt = new JsonWebToken();

describe('new JsonWebToken()', () => {
  test('should be a class', () => {
    expect(new JsonWebToken()).toBeInstanceOf(JsonWebToken);
  });
});

/* jwt.addAlgorithm() */
describe('jwt.addAlgorithm()', () => {
  const mockAlgo = 'HS256';
  test('should be a class method', () => {
    expect(typeof jwt.addAlgorithm).toBe('function');
  });
  test('should return an object', () => {
    expect(typeof jwt.addAlgorithm(mockAlgo)).toBe('object');
  });
  test('should add property alg', () => {
    expect(jwt.addAlgorithm(mockAlgo)).toEqual(
      expect.objectContaining({
        alg: 'HS256',
        typ: 'JWT',
      }),
    );
  });
});

/* jwt.addEmail() */
describe('jwt.addEmail()', () => {
  const mockEmail = 'test@test.com';
  test('should be a class method', () => {
    expect(typeof jwt.addEmail).toBe('function');
  });
  test('should return an object', () => {
    expect(typeof jwt.addEmail(mockEmail)).toBe('object');
  });
  test('should add property email', () => {
    expect(jwt.addEmail(mockEmail)).toEqual(
      expect.objectContaining({
        iss: 'https://www.dininghero.com',
        iat: expect.any(Object),
        xsrfToken: '',
        email: 'test@test.com',
      }),
    );
  });
});

/* jwt.addAdministratorStatus() */
describe('jwt.addAdministratorStatus()', () => {
  const mockAdminStatus = false;
  test('should be a class method', () => {
    expect(typeof jwt.addAdministratorStatus).toBe('function');
  });
  test('should return an object', () => {
    expect(typeof jwt.addAdministratorStatus(mockAdminStatus)).toBe('object');
  });
  test('should add property admin', () => {
    expect(jwt.addAdministratorStatus(mockAdminStatus)).toEqual(
      expect.objectContaining({
        iss: 'https://www.dininghero.com',
        iat: expect.any(Object),
        xsrfToken: '',
        admin: false,
      }),
    );
  });
});

/* jwt.addExpiration() */
describe('jwt.addExpiration()', () => {
  const mockTime = 1;
  test('should be a class method', () => {
    expect(typeof jwt.addExpiration).toBe('function');
  });
  test('should return an object', () => {
    expect(typeof jwt.addExpiration(mockTime)).toBe('object');
  });
  test('should add property exp', () => {
    expect(jwt.addExpiration(mockTime)).toEqual(
      expect.objectContaining({
        iss: 'https://www.dininghero.com',
        iat: expect.any(Object),
        xsrfToken: '',
        exp: expect.any(Object),
      }),
    );
  });
});

/* jwt.base64toBase64Url() */
describe('jwt.base64toBase64Url()', () => {
  const mockBase64 = '+test/=';
  test('should be a class method', () => {
    expect(typeof jwt.base64toBase64Url).toBe('function');
  });
  test('should return a string', () => {
    expect(typeof jwt.base64toBase64Url(mockBase64)).toBe('string');
  });
  test('should replace \'/+=\' by \'_-\'', () => {
    expect(jwt.base64toBase64Url(mockBase64)).toEqual('-test_');
  });
});

/* jwt.generateSignedToken() */
describe('jwt.generateSignedToken()', () => {
  const mockHeader = { typ: 'JWT', alg: 'HS256' };
  const mockPayload = {
    iss: 'https://www.dininghero.com',
    iat: new Date(),
    xsrfToken: '',
    email: 'test@test.com',
    admin: false,
    exp: new Date(),
  };
  test('should be a class method', () => {
    expect(typeof jwt.generateSignedToken).toBe('function');
  });
  test('should return a string', () => {
    expect(typeof jwt.generateSignedToken(mockHeader, mockPayload)).toBe('string');
  });
});

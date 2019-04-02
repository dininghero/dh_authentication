const { DecodeJsonWebToken } = require('../server/utilities/decode');

const decodeJWT = new DecodeJsonWebToken();

/** new decodeJWT() */
describe('decodeJWT()', () => {
  test('should be a class', () => {
    expect(new DecodeJsonWebToken()).toBeInstanceOf(DecodeJsonWebToken);
  });
});

/** decodeJWT.authenticateJWT() */
describe('decodeJWT.authenticateJWT()', () => {
  const mockJsonWebToken = 'test';
  const mockKeyTrue = 'test';
  test('should be a class method', () => {
    expect(typeof decodeJWT.authenticateJWT).toBe('function');
  });
  test('should return a boolean', () => {
    expect(typeof decodeJWT.authenticateJWT(mockJsonWebToken, mockKeyTrue)).toBe('boolean');
  });
  test('should return false', () => {
    expect(decodeJWT.authenticateJWT(mockJsonWebToken, mockKeyTrue)).toEqual(false);
  });
});

/** decodeJWT.verifyExpiration() */
describe('decodeJWT.verifyExpiration()', () => {
  test('should be a class method', () => {
    expect(typeof decodeJWT.verifyExpiration).toBe('function');
  });
});

/** decodeJWT.convertBase64() */
describe('decodeJWT.convertBase64()', () => {
  const mockString = '+test/=';
  test('should be a class method', () => {
    expect(typeof decodeJWT.convertBase64).toBe('function');
  });
  test('should return a string', () => {
    expect(typeof decodeJWT.convertBase64(mockString)).toBe('string');
  });
  test('should replace \'/+=\' by \'_-\'', () => {
    expect(decodeJWT.convertBase64(mockString)).toEqual('-test_');
  });
});

/** decodeJWT.decodeBase64Url() */
describe('decodeJWT.decodeBase64Url()', () => {
  const mockToken = '-test_';
  test('should be a class method', () => {
    expect(typeof decodeJWT.decodeBase64Url).toBe('function');
  });
  test('should return a string', () => {
    expect(typeof decodeJWT.decodeBase64Url(mockToken)).toBe('string');
  });
  test('should be replace \'-_\' by \'+/\'', () => {
    expect(decodeJWT.decodeBase64Url(mockToken)).toEqual('+test/==');
  });
});

/** decodeJWT.readJsonWebToken() */
describe('decodeJWT.readJsonWebToken()', () => {
  const mockDecodedbase64 = 'test.test';
  test('should be a class method', () => {
    expect(typeof decodeJWT.readJsonWebToken).toBe('function');
  });
  test('should return an object', () => {
    expect(typeof decodeJWT.readJsonWebToken(mockDecodedbase64)).toBe('object');
  });
  test('should be formatted with properties header and payload', () => {
    expect(decodeJWT.readJsonWebToken(mockDecodedbase64)).toEqual(
      expect.objectContaining({
        header: expect.any(String),
        payload: expect.any(String),
      }),
    );
  });
});

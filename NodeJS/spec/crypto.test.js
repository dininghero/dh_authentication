const { _crypto } = require('../server/utilities/crypto');

const crypto = new _crypto();

/** new crypto() */
describe('new _crypto()', () => {
  test('should be a class', () => {
    expect(new _crypto()).toBeInstanceOf(_crypto);
  });
});

/** crypto.salt() */
describe('crypto.salt()', () => {
  const mockInput = 16;
  test('should be a class method', () => {
    expect(typeof crypto.salt).toBe('function');
  });
  test('should return a Salt string', () => {
    expect(typeof crypto.salt(mockInput)).toBe('string');
  });
  test('should return a Salt value with the length of 16', () => {
    expect(crypto.salt(mockInput)).toHaveLength(16);
  });
});

/** crypto.encryption() */
describe('crypto.encryption()', () => {
  const mockPW = '1234';
  test('should be a class method', () => {
    expect(typeof crypto.encryption).toBe('function');
  });
  test('should return an object', () => {
    expect(typeof crypto.encryption(mockPW)).toBe('object');
  });
  test('should be formatted with properties hash and salt', () => {
    expect(crypto.encryption(mockPW)).toEqual(
      expect.objectContaining({
        hash: expect.any(String),
        salt: expect.any(String),
      }),
    );
  });
});

/** crypto.decryption() */
describe('crypto.decryption()', () => {
  const mockSalt = 'bd41';
  const mockPW = '1234';
  test('should be a class method', () => {
    expect(typeof crypto.decryption).toBe('function');
  });
  test('should return a Hash String', () => {
    expect(typeof crypto.decryption(mockPW, mockSalt)).toBe('string');
  });
  test('should return a Hash value with the length of 128', () => {
    expect(crypto.decryption(mockPW, mockSalt)).toHaveLength(128);
  });
});

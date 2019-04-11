const { ValidateAccountField } = require('../server/utilities/validateAccountField');

const validation = new ValidateAccountField();

describe('new ValidateAccountField()', () => {
  test('should be a class', () => {
    expect(new ValidateAccountField()).toBeInstanceOf(ValidateAccountField);
  });
});

/** validation.validatePassword() */
describe('validation.validatePassword()', () => {
  test('should be a class method', () => {
    expect(typeof validation.validatePassword).toBe('function');
  });
});

/** validation.validateEmail() */
describe('validation.validateEmail()', () => {
  test('should be a class method', () => {
    expect(typeof validation.validateEmail).toBe('function');
  });
});

/** validation.validateName() */
describe('validation.validateName()', () => {
  test('should be a class method', () => {
    expect(typeof validation.validateName).toBe('function');
  });
});

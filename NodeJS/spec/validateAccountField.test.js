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
  test('should reject password if it doesn\'t match regex', () => {
    validation.validatePassword('wrongpw');
    expect(validation.pw).toEqual(false);
  });
  test('should accept password if it matches regex', () => {
    validation.validatePassword('Okpass0rd!');
    expect(validation.pw).toEqual(true);
  });
});

/** validation.validateEmail() */
describe('validation.validateEmail()', () => {
  test('should be a class method', () => {
    expect(typeof validation.validateEmail).toBe('function');
  });
  test('should reject email if it doesn\'t match regex', () => {
    validation.validateEmail('wrongemail');
    expect(validation.email).toEqual(false);
  });
  test('should accept email if it matches regex', () => {
    validation.validateEmail('ok@email.com');
    expect(validation.email).toEqual(true);
  });
});

/** validation.validateName() */
describe('validation.validateName()', () => {
  test('should be a class method', () => {
    expect(typeof validation.validateName).toBe('function');
  });
  test('should reject firstname if it doesn\'t match regex', () => {
    validation.validateName('John1', 'first');
    expect(validation.firstName).toEqual(false);
  });
  test('should accept firstname if it matches regex', () => {
    validation.validateName('John', 'first');
    expect(validation.firstName).toEqual(true);
  });
  test('should reject lastname if it doesn\'t match regex', () => {
    validation.validateName('Doe1', 'last');
    expect(validation.lastName).toEqual(false);
  });
  test('should accept lastname if it matches regex', () => {
    validation.validateName('Doe', 'last');
    expect(validation.lastName).toEqual(true);
  });
});

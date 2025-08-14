import {
  isDefined,
  isUndefined,
  isNull,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isObject,
  isArray,
  isPlainObject,
  isEmpty,
  isValidEmail,
  isValidUrl,
  isValidPhoneNumber,
  isValidCreditCard,
  isValidPostalCode,
  isValidIpAddress,
  isValidDate,
  isValidJson,
  isValidUuid,
  isValidHexColor,
  isValidRgbColor,
  isValidHslColor,
  isValidPassword,
  isValidSSN,
  isValidISBN,
  validateSchema
} from '../validation';

describe('Validation Utilities', () => {
  describe('isDefined', () => {
    test('returns true for defined values', () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined('')).toBe(true);
      expect(isDefined(false)).toBe(true);
      expect(isDefined([])).toBe(true);
      expect(isDefined({})).toBe(true);
    });

    test('returns false for undefined values', () => {
      expect(isDefined(undefined)).toBe(false);
      expect(isDefined(null)).toBe(false);
    });
  });

  describe('isUndefined', () => {
    test('returns true for undefined values', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    test('returns false for defined values', () => {
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
      expect(isUndefined('')).toBe(false);
    });
  });

  describe('isNull', () => {
    test('returns true for null values', () => {
      expect(isNull(null)).toBe(true);
    });

    test('returns false for non-null values', () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
      expect(isNull('')).toBe(false);
    });
  });

  describe('isString', () => {
    test('returns true for strings', () => {
      expect(isString('hello')).toBe(true);
      expect(isString('')).toBe(true);
      expect(isString(String('test'))).toBe(true);
    });

    test('returns false for non-strings', () => {
      expect(isString(123)).toBe(false);
      expect(isString(true)).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString({})).toBe(false);
    });
  });

  describe('isNumber', () => {
    test('returns true for numbers', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(-123.45)).toBe(true);
      expect(isNumber(Infinity)).toBe(true);
      expect(isNumber(NaN)).toBe(true);
    });

    test('returns false for non-numbers', () => {
      expect(isNumber('123')).toBe(false);
      expect(isNumber(true)).toBe(false);
      expect(isNumber([])).toBe(false);
      expect(isNumber({})).toBe(false);
    });
  });

  describe('isBoolean', () => {
    test('returns true for booleans', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean(Boolean(1))).toBe(true);
    });

    test('returns false for non-booleans', () => {
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean([])).toBe(false);
    });
  });

  describe('isFunction', () => {
    test('returns true for functions', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function() {})).toBe(true);
      expect(isFunction(async () => {})).toBe(true);
    });

    test('returns false for non-functions', () => {
      expect(isFunction(123)).toBe(false);
      expect(isFunction('function')).toBe(false);
      expect(isFunction([])).toBe(false);
    });
  });

  describe('isObject', () => {
    test('returns true for objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject([])).toBe(true);
      expect(isObject(new Date())).toBe(true);
      expect(isObject(null)).toBe(false);
    });

    test('returns false for non-objects', () => {
      expect(isObject(123)).toBe(false);
      expect(isObject('string')).toBe(false);
      expect(isObject(true)).toBe(false);
      expect(isObject(undefined)).toBe(false);
    });
  });

  describe('isArray', () => {
    test('returns true for arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray(new Array())).toBe(true);
    });

    test('returns false for non-arrays', () => {
      expect(isArray({})).toBe(false);
      expect(isArray('array')).toBe(false);
      expect(isArray(123)).toBe(false);
    });
  });

  describe('isPlainObject', () => {
    test('returns true for plain objects', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
      expect(isPlainObject(Object.create(null))).toBe(true);
    });

    test('returns false for non-plain objects', () => {
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject(new Date())).toBe(false);
      expect(isPlainObject(() => {})).toBe(false);
    });
  });

  describe('isEmpty', () => {
    test('returns true for empty values', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    test('returns false for non-empty values', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(false)).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    test('returns true for valid emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.email+tag@domain.co.uk')).toBe(true);
      expect(isValidEmail('user123@test-domain.org')).toBe(true);
    });

    test('returns false for invalid emails', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    test('returns true for valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('ftp://files.example.com')).toBe(true);
      expect(isValidUrl('ws://websocket.example.com')).toBe(true);
    });

    test('returns false for invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('http://')).toBe(false);
      expect(isValidUrl('ftp://')).toBe(false);
      expect(isValidUrl('')).toBe(false);
    });
  });

  describe('isValidPhoneNumber', () => {
    test('returns true for valid phone numbers', () => {
      expect(isValidPhoneNumber('+1-555-123-4567')).toBe(true);
      expect(isValidPhoneNumber('555-123-4567')).toBe(true);
      expect(isValidPhoneNumber('(555) 123-4567')).toBe(true);
      expect(isValidPhoneNumber('555.123.4567')).toBe(true);
    });

    test('returns false for invalid phone numbers', () => {
      expect(isValidPhoneNumber('123')).toBe(false);
      expect(isValidPhoneNumber('not-a-phone')).toBe(false);
      expect(isValidPhoneNumber('')).toBe(false);
    });
  });

  describe('isValidCreditCard', () => {
    test('returns true for valid credit card numbers', () => {
      expect(isValidCreditCard('4532015112830366')).toBe(true); // Visa
      expect(isValidCreditCard('5555555555554444')).toBe(true); // Mastercard
      expect(isValidCreditCard('378282246310005')).toBe(true);  // Amex
    });

    test('returns false for invalid credit card numbers', () => {
      expect(isValidCreditCard('1234567890123456')).toBe(false);
      expect(isValidCreditCard('not-a-card')).toBe(false);
      expect(isValidCreditCard('')).toBe(false);
    });
  });

  describe('isValidPostalCode', () => {
    test('returns true for valid postal codes', () => {
      expect(isValidPostalCode('12345')).toBe(true);      // US ZIP
      expect(isValidPostalCode('12345-6789')).toBe(true); // US ZIP+4
      expect(isValidPostalCode('A1B2C3')).toBe(true);    // Canadian
    });

    test('returns false for invalid postal codes', () => {
      expect(isValidPostalCode('123')).toBe(false);
      expect(isValidPostalCode('not-a-code')).toBe(false);
      expect(isValidPostalCode('')).toBe(false);
    });
  });

  describe('isValidIpAddress', () => {
    test('returns true for valid IP addresses', () => {
      expect(isValidIpAddress('192.168.1.1')).toBe(true);
      expect(isValidIpAddress('10.0.0.1')).toBe(true);
      expect(isValidIpAddress('172.16.0.1')).toBe(true);
      expect(isValidIpAddress('::1')).toBe(true); // IPv6 localhost
    });

    test('returns false for invalid IP addresses', () => {
      expect(isValidIpAddress('256.1.2.3')).toBe(false);
      expect(isValidIpAddress('1.2.3.256')).toBe(false);
      expect(isValidIpAddress('not-an-ip')).toBe(false);
      expect(isValidIpAddress('')).toBe(false);
    });
  });

  describe('isValidDate', () => {
    test('returns true for valid dates', () => {
      expect(isValidDate('2024-01-15')).toBe(true);
      expect(isValidDate('2024/01/15')).toBe(true);
      expect(isValidDate('01/15/2024')).toBe(true);
    });

    test('returns false for invalid dates', () => {
      expect(isValidDate('2024-13-45')).toBe(false);
      expect(isValidDate('not-a-date')).toBe(false);
      expect(isValidDate('')).toBe(false);
    });
  });

  describe('isValidJson', () => {
    test('returns true for valid JSON strings', () => {
      expect(isValidJson('{"key": "value"}')).toBe(true);
      expect(isValidJson('[1, 2, 3]')).toBe(true);
      expect(isValidJson('"simple string"')).toBe(true);
      expect(isValidJson('123')).toBe(true);
    });

    test('returns false for invalid JSON strings', () => {
      expect(isValidJson('{"key": "value"')).toBe(false);
      expect(isValidJson('not json')).toBe(false);
      expect(isValidJson('')).toBe(false);
    });
  });

  describe('isValidUuid', () => {
    test('returns true for valid UUIDs', () => {
      expect(isValidUuid('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
      expect(isValidUuid('00000000-0000-0000-0000-000000000000')).toBe(true);
    });

    test('returns false for invalid UUIDs', () => {
      expect(isValidUuid('not-a-uuid')).toBe(false);
      expect(isValidUuid('123e4567-e89b-12d3-a456')).toBe(false);
      expect(isValidUuid('')).toBe(false);
    });
  });

  describe('isValidHexColor', () => {
    test('returns true for valid hex colors', () => {
      expect(isValidHexColor('#ff0000')).toBe(true);
      expect(isValidHexColor('#00ff00')).toBe(true);
      expect(isValidHexColor('#0000ff')).toBe(true);
      expect(isValidHexColor('#fff')).toBe(true);
    });

    test('returns false for invalid hex colors', () => {
      expect(isValidHexColor('not-a-color')).toBe(false);
      expect(isValidHexColor('#gg0000')).toBe(false);
      expect(isValidHexColor('')).toBe(false);
    });
  });

  describe('isValidRgbColor', () => {
    test('returns true for valid RGB colors', () => {
      expect(isValidRgbColor('rgb(255, 0, 0)')).toBe(true);
      expect(isValidRgbColor('rgb(0, 255, 0)')).toBe(true);
      expect(isValidRgbColor('rgb(0, 0, 255)')).toBe(true);
    });

    test('returns false for invalid RGB colors', () => {
      expect(isValidRgbColor('not-rgb')).toBe(false);
      expect(isValidRgbColor('rgb(256, 0, 0)')).toBe(false);
      expect(isValidRgbColor('')).toBe(false);
    });
  });

  describe('isValidHslColor', () => {
    test('returns true for valid HSL colors', () => {
      expect(isValidHslColor('hsl(0, 100%, 50%)')).toBe(true);
      expect(isValidHslColor('hsl(120, 100%, 50%)')).toBe(true);
      expect(isValidHslColor('hsl(240, 100%, 50%)')).toBe(true);
    });

    test('returns false for invalid HSL colors', () => {
      expect(isValidHslColor('not-hsl')).toBe(false);
      expect(isValidHslColor('hsl(400, 100%, 50%)')).toBe(false);
      expect(isValidHslColor('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    test('returns true for valid passwords', () => {
      expect(isValidPassword('Password123!')).toBe(true);
      expect(isValidPassword('StrongP@ss1')).toBe(true);
    });

    test('returns false for invalid passwords', () => {
      expect(isValidPassword('weak')).toBe(false);
      expect(isValidPassword('nouppercaseornumber')).toBe(false);
      expect(isValidPassword('')).toBe(false);
    });
  });

  describe('isValidSSN', () => {
    test('returns true for valid SSNs', () => {
      expect(isValidSSN('123-45-6789')).toBe(true);
      expect(isValidSSN('123456789')).toBe(true);
    });

    test('returns false for invalid SSNs', () => {
      expect(isValidSSN('000-00-0000')).toBe(false);
      expect(isValidSSN('not-ssn')).toBe(false);
      expect(isValidSSN('')).toBe(false);
    });
  });

  describe('isValidISBN', () => {
    test('returns true for valid ISBNs', () => {
      expect(isValidISBN('978-0-7475-3269-9')).toBe(true);
      expect(isValidISBN('0-7475-3269-9')).toBe(true);
    });

    test('returns false for invalid ISBNs', () => {
      expect(isValidISBN('not-isbn')).toBe(false);
      expect(isValidISBN('978-0-7475-3269-0')).toBe(false);
      expect(isValidISBN('')).toBe(false);
    });
  });

  describe('validateSchema', () => {
    test('returns true for valid data', () => {
      const schema = {
        name: isString,
        age: isNumber,
        email: isValidEmail
      };
      
      const data = {
        name: 'John Doe',
        age: 30,
        email: 'john@example.com'
      };
      
      const result = validateSchema(data, schema);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('returns false for invalid data', () => {
      const schema = {
        name: isString,
        age: isNumber,
        email: isValidEmail
      };
      
      const data = {
        name: 'John Doe',
        age: 'not-a-number',
        email: 'invalid-email'
      };
      
      const result = validateSchema(data, schema);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('handles simple validation', () => {
      const schema = {
        name: isString,
        age: isNumber
      };
      
      const data = {
        name: 'John',
        age: 30
      };
      
      const result = validateSchema(data, schema);
      expect(result.isValid).toBe(true);
    });
  });
}); 
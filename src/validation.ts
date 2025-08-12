/**
 * Validation utility functions
 */

/**
 * Checks if a value is defined (not null or undefined)
 */
export function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

/**
 * Checks if a value is undefined
 */
export function isUndefined(value: any): value is undefined {
  return value === undefined;
}

/**
 * Checks if a value is null
 */
export function isNull(value: any): value is null {
  return value === null;
}

/**
 * Checks if a value is a string
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}

/**
 * Checks if a value is a number
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Checks if a value is a boolean
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Checks if a value is a function
 */
export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

/**
 * Checks if a value is an object
 */
export function isObject(value: any): value is object {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Checks if a value is an array
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a plain object
 */
export function isPlainObject(value: any): value is Record<string, any> {
  if (!isObject(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/**
 * Checks if a value is empty
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (isString(value) || isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
}

/**
 * Checks if a value is a valid email
 */
export function isValidEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Checks if a value is a valid URL
 */
export function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a value is a valid phone number
 */
export function isValidPhoneNumber(value: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Checks if a value is a valid credit card number
 */
export function isValidCreditCard(value: string): boolean {
  const cleaned = value.replace(/\s/g, '');
  if (!/^\d+$/.test(cleaned)) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]!);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

/**
 * Checks if a value is a valid postal code
 */
export function isValidPostalCode(value: string): boolean {
  const postalRegex = /^[0-9]{5}(-[0-9]{4})?$/;
  return postalRegex.test(value);
}

/**
 * Checks if a value is a valid IP address
 */
export function isValidIpAddress(value: string): boolean {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  
  return ipv4Regex.test(value) || ipv6Regex.test(value);
}

/**
 * Checks if a value is a valid date
 */
export function isValidDate(value: any): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Checks if a value is a valid JSON string
 */
export function isValidJson(value: string): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a value is a valid UUID
 */
export function isValidUuid(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Checks if a value is a valid hex color
 */
export function isValidHexColor(value: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(value);
}

/**
 * Checks if a value is a valid RGB color
 */
export function isValidRgbColor(value: string): boolean {
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const match = value.match(rgbRegex);
  if (!match) return false;
  
  const [, r, g, b] = match;
  return [r, g, b].every(val => parseInt(val!) >= 0 && parseInt(val!) <= 255);
}

/**
 * Checks if a value is a valid HSL color
 */
export function isValidHslColor(value: string): boolean {
  const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
  const match = value.match(hslRegex);
  if (!match) return false;
  
  const [, h, s, l] = match;
  return parseInt(h!) >= 0 && parseInt(h!) <= 360 &&
         parseInt(s!) >= 0 && parseInt(s!) <= 100 &&
         parseInt(l!) >= 0 && parseInt(l!) <= 100;
}

/**
 * Checks if a value is a valid password strength
 */
export function isValidPassword(value: string, options: {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
} = {}): boolean {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false
  } = options;
  
  if (value.length < minLength) return false;
  if (requireUppercase && !/[A-Z]/.test(value)) return false;
  if (requireLowercase && !/[a-z]/.test(value)) return false;
  if (requireNumbers && !/\d/.test(value)) return false;
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) return false;
  
  return true;
}

/**
 * Checks if a value is a valid social security number
 */
export function isValidSSN(value: string): boolean {
  const ssnRegex = /^(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;
  return ssnRegex.test(value);
}

/**
 * Checks if a value is a valid ISBN
 */
export function isValidISBN(value: string): boolean {
  const cleaned = value.replace(/[\s\-]/g, '');
  
  if (cleaned.length === 10) {
    // ISBN-10
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleaned[i]!) * (10 - i);
    }
    const checkDigit = cleaned[9] === 'X' ? 10 : parseInt(cleaned[9]!);
    sum += checkDigit;
    return sum % 11 === 0;
  } else if (cleaned.length === 13) {
    // ISBN-13
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleaned[i]!) * (i % 2 === 0 ? 1 : 3);
    }
    const checkDigit = parseInt(cleaned[12]!);
    return (10 - (sum % 10)) % 10 === checkDigit;
  }
  
  return false;
}

/**
 * Validates an object against a schema
 */
export function validateSchema<T>(
  obj: any,
  schema: Record<keyof T, (value: any) => boolean>
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const [key, validator] of Object.entries(schema)) {
    if (!(validator as (value: any) => boolean)(obj[key])) {
      errors.push(`Invalid value for ${key}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
} 
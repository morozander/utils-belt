import {
  // Array utilities
  range,
  unique,
  chunk,
  shuffle,
  // Object utilities
  deepClone,
  pick,
  omit,
  // String utilities
  capitalize,
  camelCase,
  kebabCase,
  // Number utilities
  clamp,
  formatCurrency,
  // Function utilities
  debounce,
  throttle,
  // Date utilities
  formatDate,
  addDays,
  // Validation utilities
  isDefined,
  isValidEmail,
  // Common utilities
  generateId,
  sleep,
} from '../index';

describe('Tiny Toolbox', () => {
  describe('Array utilities', () => {
    test('range should create array of numbers', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
    });

    test('unique should remove duplicates', () => {
      expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
    });

    test('chunk should split array into chunks', () => {
      expect(chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
    });

    test('shuffle should return array of same length', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffle(arr);
      expect(shuffled).toHaveLength(arr.length);
      expect(shuffled.sort()).toEqual(arr.sort());
    });
  });

  describe('Object utilities', () => {
    test('deepClone should create deep copy', () => {
      const original = { a: { b: { c: 1 } } };
      const cloned = deepClone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.a).not.toBe(original.a);
    });

    test('pick should select specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    test('omit should exclude specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
    });
  });

  describe('String utilities', () => {
    test('capitalize should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    test('camelCase should convert to camelCase', () => {
      expect(camelCase('hello world')).toBe('helloWorld');
      expect(camelCase('hello-world')).toBe('helloWorld');
    });

    test('kebabCase should convert to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('Hello World')).toBe('hello-world');
    });
  });

  describe('Number utilities', () => {
    test('clamp should constrain values', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    test('formatCurrency should format currency', () => {
      expect(formatCurrency(1234.56)).toContain('$1,234.56');
    });
  });

  describe('Function utilities', () => {
    test('debounce should delay function execution', async () => {
      let callCount = 0;
      const debouncedFn = debounce(() => callCount++, 100);
      
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      expect(callCount).toBe(0);
      
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(callCount).toBe(1);
    });

    test('throttle should limit function execution', async () => {
      let callCount = 0;
      const throttledFn = throttle(() => callCount++, 100);
      
      throttledFn();
      throttledFn();
      throttledFn();
      
      expect(callCount).toBe(1);
      
      await new Promise(resolve => setTimeout(resolve, 150));
      throttledFn();
      expect(callCount).toBe(2);
    });
  });

  describe('Date utilities', () => {
    test('formatDate should format date', () => {
      const date = new Date('2024-01-15T10:30:00');
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15');
    });

    test('addDays should add days to date', () => {
      const date = new Date('2024-01-15');
      const newDate = addDays(date, 1);
      expect(newDate.getDate()).toBe(16);
    });
  });

  describe('Validation utilities', () => {
    test('isDefined should check if value is defined', () => {
      expect(isDefined('hello')).toBe(true);
      expect(isDefined(null)).toBe(false);
      expect(isDefined(undefined)).toBe(false);
    });

    test('isValidEmail should validate email format', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
    });
  });

  describe('Common utilities', () => {
    test('generateId should generate unique id', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
    });

    test('sleep should delay execution', async () => {
      const start = Date.now();
      await sleep(100);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(95);
    });
  });
}); 
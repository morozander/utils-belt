import {
  generateId,
  generateUuid,
  sleep,
  retryWithBackoff,
  timeout,
  deepFreeze,
  deepCopy,
  merge
} from '../common';

describe('Common Utilities', () => {
  describe('generateId', () => {
    test('generates unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
    });

    test('generates IDs with consistent format', () => {
      const id = generateId();
      expect(id).toMatch(/^[a-z0-9]+$/);
    });
  });

  describe('generateUuid', () => {
    test('generates valid UUIDs', () => {
      const uuid = generateUuid();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      
      expect(uuid).toMatch(uuidRegex);
    });

    test('generates different UUIDs', () => {
      const uuid1 = generateUuid();
      const uuid2 = generateUuid();
      
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe('sleep', () => {
    test('sleeps for specified duration', async () => {
      const start = Date.now();
      await sleep(100);
      const end = Date.now();
      
      expect(end - start).toBeGreaterThanOrEqual(90);
    });

    test('handles zero duration', async () => {
      const start = Date.now();
      await sleep(0);
      const end = Date.now();
      
      expect(end - start).toBeLessThan(10);
    });
  });

  describe('retryWithBackoff', () => {
    test('retries function with exponential backoff', async () => {
      let attempts = 0;
      const failingFn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('Failed');
        return 'Success';
      };
      
      const result = await retryWithBackoff(failingFn, 3, 100);
      
      expect(result).toBe('Success');
      expect(attempts).toBe(3);
    });

    test('fails after max attempts', async () => {
      let attempts = 0;
      const alwaysFailingFn = async () => {
        attempts++;
        throw new Error('Always fails');
      };
      
      await expect(retryWithBackoff(alwaysFailingFn, 3, 100)).rejects.toThrow('Always fails');
      expect(attempts).toBe(3);
    });

    test('succeeds on first attempt', async () => {
      let attempts = 0;
      const successFn = async () => {
        attempts++;
        return 'Success';
      };
      
      const result = await retryWithBackoff(successFn, 3, 100);
      
      expect(result).toBe('Success');
      expect(attempts).toBe(1);
    });
  });

  describe('timeout', () => {
    test('resolves when promise completes before timeout', async () => {
      const fastPromise = Promise.resolve('Success');
      
      const result = await timeout(fastPromise, 1000);
      expect(result).toBe('Success');
    });

    test('rejects when promise times out', async () => {
      const slowPromise = new Promise(resolve => setTimeout(() => resolve('Success'), 200));
      
      await expect(timeout(slowPromise, 100)).rejects.toThrow('Timeout');
    });

    test('handles already resolved promises', async () => {
      const resolvedPromise = Promise.resolve('Success');
      
      const result = await timeout(resolvedPromise, 1000);
      expect(result).toBe('Success');
    });
  });

  describe('deepFreeze', () => {
    test('freezes object deeply', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: [3, 4]
        }
      };
      
      const frozen = deepFreeze(obj);
      
      expect(Object.isFrozen(frozen)).toBe(true);
      expect(Object.isFrozen(frozen.b)).toBe(true);
      expect(Object.isFrozen(frozen.b.d)).toBe(true);
    });

    test('handles primitive values', () => {
      expect(deepFreeze(42)).toBe(42);
      expect(deepFreeze('hello')).toBe('hello');
      expect(deepFreeze(null)).toBe(null);
    });

    test('handles arrays', () => {
      const arr = [1, [2, 3], { a: 4 }];
      const frozen = deepFreeze(arr);
      
      expect(Object.isFrozen(frozen)).toBe(true);
      expect(Object.isFrozen(frozen[1])).toBe(true);
      expect(Object.isFrozen(frozen[2])).toBe(true);
    });
  });

  describe('deepCopy', () => {
    test('creates deep copy of objects', () => {
      const original = {
        a: 1,
        b: {
          c: 2,
          d: [3, 4]
        }
      };
      
      const copied = deepCopy(original);
      
      expect(copied).toEqual(original);
      expect(copied).not.toBe(original);
      expect(copied.b).not.toBe(original.b);
      expect(copied.b.d).not.toBe(original.b.d);
    });

    test('handles primitive values', () => {
      expect(deepCopy(42)).toBe(42);
      expect(deepCopy('hello')).toBe('hello');
      expect(deepCopy(null)).toBe(null);
    });

    test('handles arrays', () => {
      const original = [1, [2, 3], { a: 4 }];
      const copied = deepCopy(original);
      
      expect(copied).toEqual(original);
      expect(copied).not.toBe(original);
      expect(copied[1]).not.toBe(original[1]);
      expect(copied[2]).not.toBe(original[2]);
    });

    test('handles dates', () => {
      const original = new Date('2024-01-01');
      const copied = deepCopy(original);
      
      expect(copied).toEqual(original);
      expect(copied).not.toBe(original);
      expect(copied.getTime()).toBe(original.getTime());
    });
  });

  describe('merge', () => {
    test('merges multiple objects', () => {
      const obj1: any = { a: 1, b: 2 };
      const obj2: any = { a: 2, b: 3, c: 4 };
      const obj3: any = { a: 3, d: 5 };
      
      const result = merge(obj1, obj2, obj3);
      
      expect(result).toEqual({ a: 3, b: 3, c: 4, d: 5 });
    });

    test('handles empty objects', () => {
      const result = merge({}, { a: 1 }, {});
      expect(result).toEqual({ a: 1 });
    });

    test('handles single object', () => {
      const obj = { a: 1, b: 2 };
      const result = merge(obj);
      expect(result).toEqual(obj);
    });

    test('overwrites properties from later objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 3, b: 4 };
      
      const result = merge(obj1, obj2);
      expect(result.a).toBe(3);
      expect(result.b).toBe(4);
    });
  });
}); 
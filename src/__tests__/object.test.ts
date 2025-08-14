import {
  deepClone,
  deepMerge,
  pick,
  omit,
  get,
  set,
  has,
  invert,
  fromEntries,
  toEntries,
  size,
  mapValues,
  mapKeys
} from '../object';

describe('Object Utilities', () => {
  describe('deepClone', () => {
    test('creates deep copy of primitive values', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(true)).toBe(true);
      expect(deepClone(null)).toBe(null);
      expect(deepClone(undefined)).toBe(undefined);
    });

    test('creates deep copy of objects', () => {
      const original = { a: { b: { c: 1 } } };
      const cloned = deepClone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.a).not.toBe(original.a);
      expect(cloned.a.b).not.toBe(original.a.b);
    });

    test('creates deep copy of arrays', () => {
      const original = [1, [2, [3]]];
      const cloned = deepClone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[1]).not.toBe(original[1]);
      expect(cloned[1][1]).not.toBe(original[1][1]);
    });

    test('creates deep copy of dates', () => {
      const original = new Date('2024-01-01');
      const cloned = deepClone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.getTime()).toBe(original.getTime());
    });

    test('handles circular references', () => {
      const original: any = { a: 1 };
      original.self = original;
      const cloned = deepClone(original);
      expect(cloned.self).toBe(cloned);
      expect(cloned.a).toBe(1);
    });
  });

  describe('deepMerge', () => {
    test('merges multiple objects deeply', () => {
      const obj1: any = { a: 1, b: { c: 2 } };
      const obj2: any = { b: { d: 3 }, e: 4 };
      const result = deepMerge(obj1, obj2);
      expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    });

    test('overwrites primitive values', () => {
      const obj1: any = { a: 1, b: 2 };
      const obj2: any = { a: 3, c: 4 };
      const result = deepMerge(obj1, obj2);
      expect(result).toEqual({ a: 3, b: 2, c: 4 });
    });

    test('handles empty objects', () => {
      const result = deepMerge({}, { a: 1 }, {});
      expect(result).toEqual({ a: 1 });
    });

    test('handles single object', () => {
      const obj = { a: 1, b: 2 };
      const result = deepMerge(obj);
      expect(result).toEqual(obj);
    });
  });

  describe('pick', () => {
    test('picks specified keys from object', () => {
      const obj: any = { a: 1, b: 2, c: 3 };
      const result = pick(obj, ['a', 'c']);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    test('handles non-existent keys', () => {
      const obj: any = { a: 1, b: 2 };
      const result = pick(obj, ['a', 'c']);
      expect(result).toEqual({ a: 1 });
    });

    test('handles empty keys array', () => {
      const obj: any = { a: 1, b: 2 };
      const result = pick(obj, []);
      expect(result).toEqual({});
    });

    test('handles empty object', () => {
      const result = pick({} as any, ['a', 'b']);
      expect(result).toEqual({});
    });
  });

  describe('omit', () => {
    test('omits specified keys from object', () => {
      const obj: any = { a: 1, b: 2, c: 3 };
      const result = omit(obj, ['b']);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    test('handles non-existent keys', () => {
      const obj: any = { a: 1, b: 2 };
      const result = omit(obj, ['c']);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    test('handles empty keys array', () => {
      const obj: any = { a: 1, b: 2 };
      const result = omit(obj, []);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    test('handles empty object', () => {
      const result = omit({} as any, ['a', 'b']);
      expect(result).toEqual({});
    });
  });

  describe('get', () => {
    test('gets nested property value', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(get(obj, 'a.b.c')).toBe(1);
    });

    test('returns undefined for non-existent path', () => {
      const obj = { a: { b: 1 } };
      expect(get(obj, 'a.b.c')).toBeUndefined();
    });

    test('returns default value for non-existent path', () => {
      const obj = { a: { b: 1 } };
      expect(get(obj, 'a.b.c', 'default')).toBe('default');
    });

    test('handles empty path', () => {
      const obj = { a: 1 };
      expect(get(obj, '')).toBe(obj);
    });

    test('handles null/undefined object', () => {
      expect(get(null, 'a.b')).toBeUndefined();
      expect(get(undefined, 'a.b')).toBeUndefined();
    });
  });

  describe('set', () => {
    test('sets nested property value', () => {
      const obj: any = { a: { b: 1 } };
      set(obj, 'a.b.c', 2);
      expect(obj.a.b.c).toBe(2);
    });

    test('creates intermediate objects', () => {
      const obj: any = {};
      set(obj, 'a.b.c', 1);
      expect(obj.a.b.c).toBe(1);
    });

    test('overwrites existing values', () => {
      const obj: any = { a: { b: 1 } };
      set(obj, 'a.b', 2);
      expect(obj.a.b).toBe(2);
    });

    test('handles empty path', () => {
      const obj: any = {};
      set(obj, '', 'value');
      expect(obj).toEqual({ '': 'value' });
    });
  });

  describe('has', () => {
    test('returns true for existing nested property', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(has(obj, 'a.b.c')).toBe(true);
    });

    test('returns false for non-existent nested property', () => {
      const obj = { a: { b: 1 } };
      expect(has(obj, 'a.b.c')).toBe(false);
    });

    test('returns false for null/undefined object', () => {
      expect(has(null, 'a.b')).toBe(false);
      expect(has(undefined, 'a.b')).toBe(false);
    });

    test('returns true for root property', () => {
      const obj = { a: 1 };
      expect(has(obj, 'a')).toBe(true);
    });

    test('returns false for empty path', () => {
      const obj = { a: 1 };
      expect(has(obj, '')).toBe(false);
    });
  });

  describe('invert', () => {
    test('inverts object keys and values', () => {
      const obj = { a: '1', b: '2' };
      const result = invert(obj);
      expect(result).toEqual({ '1': 'a', '2': 'b' });
    });

    test('handles duplicate values', () => {
      const obj = { a: '1', b: '1' };
      const result = invert(obj);
      expect(result['1']).toBe('b'); // Last one wins
    });

    test('handles empty object', () => {
      const result = invert({});
      expect(result).toEqual({});
    });

    test('converts values to strings', () => {
      const obj = { a: 1, b: true };
      const result = invert(obj);
      expect(result['1']).toBe('a');
      expect(result['true']).toBe('b');
    });
  });

  describe('fromEntries', () => {
    test('creates object from key-value pairs', () => {
      const entries: [string, number][] = [['a', 1], ['b', 2]];
      const result = fromEntries(entries);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    test('handles empty array', () => {
      const result = fromEntries([]);
      expect(result).toEqual({});
    });

    test('overwrites duplicate keys', () => {
      const entries: [string, number][] = [['a', 1], ['a', 2]];
      const result = fromEntries(entries);
      expect(result).toEqual({ a: 2 });
    });
  });

  describe('toEntries', () => {
    test('converts object to key-value pairs', () => {
      const obj = { a: 1, b: 2 };
      const result = toEntries(obj);
      expect(result).toEqual([['a', 1], ['b', 2]]);
    });

    test('handles empty object', () => {
      const result = toEntries({});
      expect(result).toEqual([]);
    });
  });

  describe('size', () => {
    test('returns number of keys in object', () => {
      expect(size({ a: 1, b: 2, c: 3 })).toBe(3);
    });

    test('returns 0 for empty object', () => {
      expect(size({})).toBe(0);
    });

    test('returns 0 for null/undefined', () => {
      expect(size(null)).toBe(0);
      expect(size(undefined)).toBe(0);
    });

    test('returns array length for arrays', () => {
      expect(size([1, 2, 3])).toBe(3);
    });

    test('returns string length for strings', () => {
      expect(size('hello')).toBe(5);
    });
  });

  describe('mapValues', () => {
    test('maps object values using transform function', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = mapValues(obj, (value, key) => value * 2);
      expect(result).toEqual({ a: 2, b: 4, c: 6 });
    });

    test('handles empty object', () => {
      const result = mapValues({}, (value, key) => value);
      expect(result).toEqual({});
    });

    test('passes key to transform function', () => {
      const obj = { a: 1, b: 2 };
      const result = mapValues(obj, (value, key) => `${key}:${value}`);
      expect(result).toEqual({ a: 'a:1', b: 'b:2' });
    });
  });

  describe('mapKeys', () => {
    test('maps object keys using transform function', () => {
      const obj = { a: 1, b: 2 };
      const result = mapKeys(obj, (key, value) => key.toUpperCase());
      expect(result).toEqual({ A: 1, B: 2 });
    });

    test('handles empty object', () => {
      const result = mapKeys({}, (key, value) => key);
      expect(result).toEqual({});
    });

    test('passes value to transform function', () => {
      const obj = { a: 1, b: 2 };
      const result = mapKeys(obj, (key, value) => `${key}${value}`);
      expect(result).toEqual({ a1: 1, b2: 2 });
    });
  });
}); 
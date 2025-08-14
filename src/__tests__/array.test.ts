import {
  range,
  unique,
  groupBy,
  chunk,
  flatten,
  find,
  filter,
  map,
  reduce,
  every,
  some,
  take,
  takeLast,
  drop,
  dropLast,
  shuffle,
  sortBy
} from '../array';

describe('Array Utilities', () => {
  describe('range', () => {
    test('creates array from start to end', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    test('creates array with step', () => {
      expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
    });

    test('handles negative step', () => {
      expect(range(5, 1, -1)).toEqual([5, 4, 3, 2, 1]);
    });

    test('handles single number', () => {
      expect(range(5, 5)).toEqual([5]);
    });
  });

  describe('unique', () => {
    test('removes duplicate values', () => {
      expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
    });

    test('handles empty array', () => {
      expect(unique([])).toEqual([]);
    });

    test('handles array with no duplicates', () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('handles mixed types', () => {
      expect(unique([1, '1', 1, '1'])).toEqual([1, '1']);
    });
  });

  describe('groupBy', () => {
    test('groups array elements by key function', () => {
      const items = [
        { name: 'John', age: 25 },
        { name: 'Jane', age: 25 },
        { name: 'Bob', age: 30 }
      ];
      const result = groupBy(items, item => item.age);
      expect(result).toEqual({
        25: [{ name: 'John', age: 25 }, { name: 'Jane', age: 25 }],
        30: [{ name: 'Bob', age: 30 }]
      });
    });

    test('handles empty array', () => {
      expect(groupBy([], item => item)).toEqual({});
    });

    test('handles string keys', () => {
      const items = ['apple', 'banana', 'apple', 'cherry'];
      const result = groupBy(items, item => item);
      expect(result).toEqual({
        apple: ['apple', 'apple'],
        banana: ['banana'],
        cherry: ['cherry']
      });
    });
  });

  describe('chunk', () => {
    test('splits array into chunks of specified size', () => {
      expect(chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
    });

    test('handles last chunk smaller than size', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    test('handles empty array', () => {
      expect(chunk([], 2)).toEqual([]);
    });

    test('handles chunk size larger than array', () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });
  });

  describe('flatten', () => {
    test('flattens nested array', () => {
      expect(flatten([1, [2, 3], [4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('flattens to specified depth', () => {
      expect(flatten([1, [2, [3, [4]]]], 1)).toEqual([1, 2, [3, [4]]]);
    });

    test('handles empty array', () => {
      expect(flatten([])).toEqual([]);
    });

    test('handles non-array items', () => {
      expect(flatten([1, 'string', [2, 3]])).toEqual([1, 'string', 2, 3]);
    });
  });

  describe('find', () => {
    test('finds first element matching predicate', () => {
      const array = [1, 2, 3, 4, 5];
      const result = find(array, item => item > 3);
      expect(result).toBe(4);
    });

    test('returns undefined when no match found', () => {
      const array = [1, 2, 3];
      const result = find(array, item => item > 5);
      expect(result).toBeUndefined();
    });

    test('handles empty array', () => {
      const result = find([], item => item > 0);
      expect(result).toBeUndefined();
    });
  });

  describe('filter', () => {
    test('filters array elements based on predicate', () => {
      const array = [1, 2, 3, 4, 5];
      const result = filter(array, item => item % 2 === 0);
      expect(result).toEqual([2, 4]);
    });

    test('handles empty array', () => {
      const result = filter([], item => item > 0);
      expect(result).toEqual([]);
    });

    test('returns empty array when no matches', () => {
      const array = [1, 2, 3];
      const result = filter(array, item => item > 5);
      expect(result).toEqual([]);
    });
  });

  describe('map', () => {
    test('maps array elements using transform function', () => {
      const array = [1, 2, 3];
      const result = map(array, item => item * 2);
      expect(result).toEqual([2, 4, 6]);
    });

    test('handles empty array', () => {
      const result = map([], item => item * 2);
      expect(result).toEqual([]);
    });

    test('preserves array length', () => {
      const array = [1, 2, 3];
      const result = map(array, item => item.toString());
      expect(result).toHaveLength(3);
    });
  });

  describe('reduce', () => {
    test('reduces array to single value', () => {
      const array = [1, 2, 3, 4];
      const result = reduce(array, (sum, item) => sum + item, 0);
      expect(result).toBe(10);
    });

    test('handles empty array with initial value', () => {
      const result = reduce([], (sum, item) => sum + item, 5);
      expect(result).toBe(5);
    });

    test('works without initial value', () => {
      const array = [1, 2, 3];
      const result = reduce(array, (sum: number, item: number) => sum + item, 0);
      expect(result).toBe(6);
    });
  });

  describe('every', () => {
    test('returns true when all elements match predicate', () => {
      const array = [2, 4, 6, 8];
      const result = every(array, item => item % 2 === 0);
      expect(result).toBe(true);
    });

    test('returns false when any element does not match', () => {
      const array = [2, 4, 5, 8];
      const result = every(array, item => item % 2 === 0);
      expect(result).toBe(false);
    });

    test('returns true for empty array', () => {
      const result = every([], item => item > 0);
      expect(result).toBe(true);
    });
  });

  describe('some', () => {
    test('returns true when any element matches predicate', () => {
      const array = [1, 3, 5, 6];
      const result = some(array, item => item % 2 === 0);
      expect(result).toBe(true);
    });

    test('returns false when no elements match', () => {
      const array = [1, 3, 5, 7];
      const result = some(array, item => item % 2 === 0);
      expect(result).toBe(false);
    });

    test('returns false for empty array', () => {
      const result = some([], item => item > 0);
      expect(result).toBe(false);
    });
  });

  describe('take', () => {
    test('takes first n elements', () => {
      const array = [1, 2, 3, 4, 5];
      const result = take(array, 3);
      expect(result).toEqual([1, 2, 3]);
    });

    test('handles n larger than array length', () => {
      const array = [1, 2];
      const result = take(array, 5);
      expect(result).toEqual([1, 2]);
    });

    test('handles empty array', () => {
      const result = take([], 3);
      expect(result).toEqual([]);
    });
  });

  describe('takeLast', () => {
    test('takes last n elements', () => {
      const array = [1, 2, 3, 4, 5];
      const result = takeLast(array, 3);
      expect(result).toEqual([3, 4, 5]);
    });

    test('handles n larger than array length', () => {
      const array = [1, 2];
      const result = takeLast(array, 5);
      expect(result).toEqual([1, 2]);
    });

    test('handles empty array', () => {
      const result = takeLast([], 3);
      expect(result).toEqual([]);
    });
  });

  describe('drop', () => {
    test('drops first n elements', () => {
      const array = [1, 2, 3, 4, 5];
      const result = drop(array, 2);
      expect(result).toEqual([3, 4, 5]);
    });

    test('handles n larger than array length', () => {
      const array = [1, 2];
      const result = drop(array, 5);
      expect(result).toEqual([]);
    });

    test('handles empty array', () => {
      const result = drop([], 3);
      expect(result).toEqual([]);
    });
  });

  describe('dropLast', () => {
    test('drops last n elements', () => {
      const array = [1, 2, 3, 4, 5];
      const result = dropLast(array, 2);
      expect(result).toEqual([1, 2, 3]);
    });

    test('handles n larger than array length', () => {
      const array = [1, 2];
      const result = dropLast(array, 5);
      expect(result).toEqual([]);
    });

    test('handles empty array', () => {
      const result = dropLast([], 3);
      expect(result).toEqual([]);
    });
  });

  describe('shuffle', () => {
    test('returns array of same length', () => {
      const array = [1, 2, 3, 4, 5];
      const result = shuffle(array);
      expect(result).toHaveLength(array.length);
    });

    test('contains all original elements', () => {
      const array = [1, 2, 3, 4, 5];
      const result = shuffle(array);
      expect(result.sort()).toEqual(array.sort());
    });

    test('handles empty array', () => {
      const result = shuffle([]);
      expect(result).toEqual([]);
    });

    test('handles single element array', () => {
      const result = shuffle([1]);
      expect(result).toEqual([1]);
    });
  });

  describe('sortBy', () => {
    test('sorts array by key function in ascending order', () => {
      const array = [{ name: 'Bob', age: 30 }, { name: 'Alice', age: 25 }];
      const result = sortBy(array, item => item.age);
      expect(result[0].age).toBe(25);
      expect(result[1].age).toBe(30);
    });

    test('sorts array by key function in descending order', () => {
      const array = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }];
      const result = sortBy(array, item => item.age, 'desc');
      expect(result[0].age).toBe(30);
      expect(result[1].age).toBe(25);
    });

    test('handles empty array', () => {
      const result = sortBy([], item => item);
      expect(result).toEqual([]);
    });

    test('handles array with same keys', () => {
      const array = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 25 }];
      const result = sortBy(array, item => item.age);
      expect(result).toHaveLength(2);
    });
  });
}); 
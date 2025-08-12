/**
 * Array utility functions
 */

/**
 * Creates an array of numbers from start to end (inclusive)
 */
export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Removes duplicate values from an array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Groups array elements by a key function
 */
export function groupBy<T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

/**
 * Chunks an array into smaller arrays of specified size
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Flattens a nested array
 */
export function flatten<T>(array: T[], depth: number = Infinity): T[] {
  if (depth === 0) return array;
  return array.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item, depth - 1) : item);
  }, [] as T[]);
}

/**
 * Finds the first element that matches the predicate
 */
export function find<T>(
  array: T[],
  predicate: (item: T, index: number) => boolean
): T | undefined {
  return array.find(predicate);
}

/**
 * Filters array elements based on a predicate
 */
export function filter<T>(
  array: T[],
  predicate: (item: T, index: number) => boolean
): T[] {
  return array.filter(predicate);
}

/**
 * Maps array elements using a transform function
 */
export function map<T, U>(
  array: T[],
  transform: (item: T, index: number) => U
): U[] {
  return array.map(transform);
}

/**
 * Reduces array to a single value
 */
export function reduce<T, U>(
  array: T[],
  reducer: (accumulator: U, item: T, index: number) => U,
  initialValue: U
): U {
  return array.reduce(reducer, initialValue);
}

/**
 * Checks if all elements match a predicate
 */
export function every<T>(
  array: T[],
  predicate: (item: T, index: number) => boolean
): boolean {
  return array.every(predicate);
}

/**
 * Checks if any element matches a predicate
 */
export function some<T>(
  array: T[],
  predicate: (item: T, index: number) => boolean
): boolean {
  return array.some(predicate);
}

/**
 * Gets the first n elements of an array
 */
export function take<T>(array: T[], n: number): T[] {
  return array.slice(0, n);
}

/**
 * Gets the last n elements of an array
 */
export function takeLast<T>(array: T[], n: number): T[] {
  return array.slice(-n);
}

/**
 * Removes the first n elements from an array
 */
export function drop<T>(array: T[], n: number): T[] {
  return array.slice(n);
}

/**
 * Removes the last n elements from an array
 */
export function dropLast<T>(array: T[], n: number): T[] {
  return array.slice(0, -n);
}

/**
 * Shuffles an array randomly
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
}

/**
 * Sorts an array by a key function
 */
export function sortBy<T, K>(
  array: T[],
  keyFn: (item: T) => K,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  const sorted = [...array].sort((a, b) => {
    const keyA = keyFn(a);
    const keyB = keyFn(b);
    if (keyA < keyB) return order === 'asc' ? -1 : 1;
    if (keyA > keyB) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
} 
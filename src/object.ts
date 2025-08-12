/**
 * Object utility functions
 */

/**
 * Creates a deep clone of an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  
  return obj;
}

/**
 * Merges multiple objects deeply
 */
export function deepMerge<T extends Record<string, any>>(...objects: T[]): T {
  return objects.reduce((result, obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          result[key] = deepMerge(result[key] || {}, obj[key]) as any;
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  }, {} as T);
}

/**
 * Picks specified keys from an object
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Omits specified keys from an object
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}

/**
 * Gets a nested property value using a path string
 */
export function get<T>(obj: any, path: string, defaultValue?: T): T | undefined {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result !== undefined ? result : defaultValue;
}

/**
 * Sets a nested property value using a path string
 */
export function set<T>(obj: any, path: string, value: T): void {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]!] = value;
}

/**
 * Checks if an object has a nested property
 */
export function has(obj: any, path: string): boolean {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || typeof current !== 'object' || !(key in current)) {
      return false;
    }
    current = current[key];
  }
  
  return true;
}

/**
 * Inverts an object's keys and values
 */
export function invert<T extends Record<string, any>>(obj: T): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[String(obj[key])] = key;
    }
  }
  return result;
}

/**
 * Creates an object from an array of key-value pairs
 */
export function fromEntries<T>(entries: [string, T][]): Record<string, T> {
  const result: Record<string, T> = {};
  entries.forEach(([key, value]) => {
    result[key] = value;
  });
  return result;
}

/**
 * Converts an object to an array of key-value pairs
 */
export function toEntries<T>(obj: Record<string, T>): [string, T][] {
  return Object.entries(obj);
}

// This function is moved to validation.ts to avoid duplicates

/**
 * Gets the size of an object (number of keys)
 */
export function size(obj: any): number {
  if (obj === null || obj === undefined) return 0;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length;
  if (typeof obj === 'object') return Object.keys(obj).length;
  return 0;
}

/**
 * Maps object values using a transform function
 */
export function mapValues<T, U>(
  obj: Record<string, T>,
  transform: (value: T, key: string) => U
): Record<string, U> {
  const result: Record<string, U> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = transform(obj[key]!, key);
    }
  }
  return result;
}

/**
 * Maps object keys using a transform function
 */
export function mapKeys<T>(
  obj: Record<string, T>,
  transform: (key: string, value: T) => string
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = transform(key, obj[key]!);
      result[newKey] = obj[key]!;
    }
  }
  return result;
} 
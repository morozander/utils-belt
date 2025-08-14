/**
 * Function utility functions
 */

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttles a function call
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

/**
 * Memoizes a function result
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Composes multiple functions
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduceRight((result, fn) => fn(result), arg);
}

/**
 * Pipes a value through multiple functions
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduce((result, fn) => fn(result), arg);
}

/**
 * Curries a function
 */
export function curry<T extends (...args: any[]) => any>(
  func: T,
  arity: number = func.length
): (...args: any[]) => any {
  return function curried(...args: any[]) {
    if (args.length >= arity) {
      return func(...args);
    }
    return (...moreArgs: any[]) => curried(...args, ...moreArgs);
  };
}

/**
 * Partially applies arguments to a function
 */
export function partial<T extends (...args: any[]) => any>(
  func: T,
  ...partialArgs: any[]
): (...args: any[]) => ReturnType<T> {
  return (...args: any[]) => func(...partialArgs, ...args);
}

/**
 * Creates a function that calls the original function with arguments in reverse order
 */
export function flip<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>) => {
    const reversedArgs = [...args].reverse() as Parameters<T>;
    return func(...reversedArgs);
  };
}

/**
 * Creates a function that negates the result of another function
 */
export function negate<T extends (...args: any[]) => boolean>(
  func: T
): (...args: Parameters<T>) => boolean {
  return (...args: Parameters<T>) => !func(...args);
}

/**
 * Creates a function that calls multiple functions with the same arguments
 */
export function juxt<T extends any[], U>(
  ...fns: Array<(...args: T) => U>
): (...args: T) => U[] {
  return (...args: T) => fns.map(fn => fn(...args));
}

/**
 * Creates a function that calls a function only once
 */
export function once<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  let called = false;
  let result: ReturnType<T>;
  
  return (...args: Parameters<T>) => {
    if (!called) {
      called = true;
      result = func(...args);
    }
    return result;
  };
}

/**
 * Creates a function that calls a function after a delay
 */
export function delay<T extends (...args: any[]) => any>(
  func: T,
  delayMs: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return (...args: Parameters<T>) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(func(...args)), delayMs);
    });
  };
}

/**
 * Creates a function that retries a function call on failure
 */
export function retry<T extends (...args: any[]) => any>(
  func: T,
  maxAttempts: number = 3,
  delayMs: number = 1000
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>) => {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return func(...args);
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }
    }
    
    throw lastError!;
  };
}

/**
 * Creates a function that measures execution time
 */
export function measureTime<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> extends Promise<any> 
  ? Promise<{ result: Awaited<ReturnType<T>>; time: number }>
  : { result: ReturnType<T>; time: number } {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = func(...args);
    
    if (result instanceof Promise) {
      return result.then(res => {
        const time = performance.now() - start;
        return { result: res, time };
      });
    }
    
    const time = performance.now() - start;
    return { result, time };
  }) as any;
}

/**
 * Creates a function that logs input and output
 */
export function log<T extends (...args: any[]) => any>(
  func: T,
  label: string = 'Function'
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>) => {
    console.log(`${label} called with:`, args);
    const result = func(...args);
    console.log(`${label} returned:`, result);
    return result;
  };
}

/**
 * Creates a function that caches results with a custom key function
 */
export function memoizeWith<T extends (...args: any[]) => any>(
  func: T,
  keyFn: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = keyFn(...args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Creates a function that limits the number of concurrent calls
 */
export function limitConcurrency<T extends (...args: any[]) => Promise<any>>(
  func: T,
  maxConcurrent: number
): T {
  let currentConcurrent = 0;
  const queue: Array<() => void> = [];
  
  const execute = async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (currentConcurrent >= maxConcurrent) {
      await new Promise<void>(resolve => queue.push(resolve));
    }
    
    currentConcurrent++;
    try {
      return await func(...args);
    } finally {
      currentConcurrent--;
      if (queue.length > 0) {
        const next = queue.shift()!;
        next();
      }
    }
  };
  
  return execute as T;
} 
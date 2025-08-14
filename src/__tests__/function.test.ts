import {
  debounce,
  throttle,
  memoize,
  compose,
  pipe,
  curry,
  partial,
  flip,
  negate,
  juxt,
  once,
  delay,
  retry,
  measureTime,
  log,
  memoizeWith,
  limitConcurrency
} from '../function';

describe('Function Utilities', () => {
  describe('debounce', () => {
    test('debounces function calls', async () => {
      let callCount = 0;
      const debouncedFn = debounce(() => { callCount++; }, 100);
      
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      expect(callCount).toBe(0);
      
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(callCount).toBe(1);
    });

    test('handles multiple rapid calls', async () => {
      let callCount = 0;
      const debouncedFn = debounce(() => { callCount++; }, 100);
      
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      expect(callCount).toBe(0);
      
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(callCount).toBe(1);
    });
  });

  describe('throttle', () => {
    test('throttles function calls', async () => {
      let callCount = 0;
      const throttledFn = throttle(() => { callCount++; }, 100);
      
      throttledFn();
      throttledFn();
      throttledFn();
      
      expect(callCount).toBe(1);
      
      await new Promise(resolve => setTimeout(resolve, 150));
      throttledFn();
      expect(callCount).toBe(2);
    });

    test('handles multiple rapid calls', async () => {
      let callCount = 0;
      const throttledFn = throttle(() => { callCount++; }, 100);
      
      throttledFn();
      throttledFn();
      throttledFn();
      
      expect(callCount).toBe(1);
      
      await new Promise(resolve => setTimeout(resolve, 150));
      throttledFn();
      expect(callCount).toBe(2);
    });
  });

  describe('memoize', () => {
    test('memoizes function results', () => {
      let callCount = 0;
      const memoizedFn = memoize((a: number, b: number) => {
        callCount++;
        return a + b;
      });
      
      expect(memoizedFn(1, 2)).toBe(3);
      expect(memoizedFn(1, 2)).toBe(3);
      expect(callCount).toBe(1);
      
      expect(memoizedFn(2, 3)).toBe(5);
      expect(callCount).toBe(2);
    });

    test('memoizes different arguments separately', () => {
      let callCount = 0;
      const memoizedFn = memoize((a: number, b: number) => {
        callCount++;
        return a + b;
      });
      
      expect(memoizedFn(1, 2)).toBe(3);
      expect(memoizedFn(2, 3)).toBe(5);
      expect(callCount).toBe(2);
    });
  });

  describe('compose', () => {
    test('composes functions from right to left', () => {
      const addOne = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const square = (x: number) => x * x;
      
      const composed = compose(square, double, addOne);
      expect(composed(3)).toBe(64); // (3 + 1) * 2 = 8, 8^2 = 64
    });

    test('handles single function', () => {
      const double = (x: number) => x * 2;
      const composed = compose(double);
      expect(composed(5)).toBe(10);
    });

    test('handles no functions', () => {
      const composed = compose();
      expect(composed(5)).toBe(5);
    });
  });

  describe('pipe', () => {
    test('pipes functions from left to right', () => {
      const addOne = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const square = (x: number) => x * x;
      
      const piped = pipe(addOne, double, square);
      expect(piped(3)).toBe(64); // (3 + 1) * 2 = 8, 8^2 = 64
    });

    test('handles single function', () => {
      const double = (x: number) => x * 2;
      const piped = pipe(double);
      expect(piped(5)).toBe(10);
    });

    test('handles no functions', () => {
      const piped = pipe();
      expect(piped(5)).toBe(5);
    });
  });

  describe('curry', () => {
    test('curries function with multiple arguments', () => {
      const add = (a: number, b: number, c: number) => a + b + c;
      const curriedAdd = curry(add);
      
      expect(curriedAdd(1)(2)(3)).toBe(6);
      expect(curriedAdd(1, 2)(3)).toBe(6);
      expect(curriedAdd(1, 2, 3)).toBe(6);
    });

    test('handles single argument function', () => {
      const double = (x: number) => x * 2;
      const curriedDouble = curry(double);
      expect(curriedDouble(5)).toBe(10);
    });
  });

  describe('partial', () => {
    test('partially applies function arguments', () => {
      const add = (a: number, b: number, c: number) => a + b + c;
      const partialAdd = partial(add, 1, 2);
      
      expect(partialAdd(3)).toBe(6);
    });

    test('handles no partial arguments', () => {
      const add = (a: number, b: number) => a + b;
      const partialAdd = partial(add);
      expect(partialAdd(1, 2)).toBe(3);
    });
  });

  describe('flip', () => {
    test('flips first two arguments', () => {
      const divide = (a: number, b: number) => a / b;
      const flippedDivide = flip(divide);
      
      expect(divide(10, 2)).toBe(5);
      expect(flippedDivide(10, 2)).toBe(0.2);
    });

    test('handles single argument function', () => {
      const double = (x: number) => x * 2;
      const flippedDouble = flip(double);
      expect(flippedDouble(5)).toBe(10);
    });
  });

  describe('negate', () => {
    test('negates function result', () => {
      const isEven = (x: number) => x % 2 === 0;
      const isOdd = negate(isEven);
      
      expect(isEven(2)).toBe(true);
      expect(isOdd(2)).toBe(false);
      expect(isEven(3)).toBe(false);
      expect(isOdd(3)).toBe(true);
    });
  });

  describe('juxt', () => {
    test('applies multiple functions to same arguments', () => {
      const add = (a: number, b: number) => a + b;
      const multiply = (a: number, b: number) => a * b;
      const subtract = (a: number, b: number) => a - b;
      
      const juxted = juxt(add, multiply, subtract);
      const result = juxted(5, 3);
      
      expect(result).toEqual([8, 15, 2]);
    });

    test('handles single function', () => {
      const double = (x: number) => x * 2;
      const juxted = juxt(double);
      expect(juxted(5)).toEqual([10]);
    });
  });

  describe('once', () => {
    test('calls function only once', () => {
      let callCount = 0;
      const onceFn = once(() => { callCount++; return callCount; });
      
      expect(onceFn()).toBe(1);
      expect(onceFn()).toBe(1);
      expect(onceFn()).toBe(1);
      expect(callCount).toBe(1);
    });

    test('returns same result on subsequent calls', () => {
      let callCount = 0;
      const onceFn = once(() => { callCount++; return callCount; });
      
      const firstResult = onceFn();
      const secondResult = onceFn();
      
      expect(firstResult).toBe(secondResult);
    });
  });

  describe('delay', () => {
    test('delays function execution', async () => {
      let executed = false;
      const delayedFn = delay(() => { executed = true; }, 100);
      
      expect(executed).toBe(false);
      
      delayedFn(); // Call the function to start the delay
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(executed).toBe(true);
    });

    test('passes arguments to delayed function', async () => {
      let result = 0;
      const delayedFn = delay((a: number, b: number) => { result = a + b; }, 100);
      
      delayedFn(2, 3);
      
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(result).toBe(5);
    });
  });

  describe('retry', () => {
    test('retries function on failure', async () => {
      let attempts = 0;
      const failingFn = () => {
        attempts++;
        if (attempts < 3) throw new Error('Failed');
        return 'Success';
      };
      
      const retryFn = retry(failingFn, 3, 100);
      const result = await retryFn();
      
      expect(result).toBe('Success');
      expect(attempts).toBe(3);
    });

    test('fails after max attempts', async () => {
      let attempts = 0;
      const alwaysFailingFn = () => {
        attempts++;
        throw new Error('Always fails');
      };
      
      const retryFn = retry(alwaysFailingFn, 3, 100);
      
      await expect(retryFn()).rejects.toThrow('Always fails');
      expect(attempts).toBe(3);
    });
  });

  describe('measureTime', () => {
    test('measures function execution time', async () => {
      const slowFn = async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return 'Done';
      };
      
      const measuredFn = measureTime(slowFn);
      const { result, time } = await measuredFn();
      
      expect(result).toBe('Done');
      expect(time).toBeGreaterThan(90);
    });

    test('measures synchronous function time', () => {
      const fastFn = () => 'Done';
      
      const measuredFn = measureTime(fastFn);
      const { result, time } = measuredFn();
      
      expect(result).toBe('Done');
      expect(time).toBeGreaterThanOrEqual(0);
    });
  });

  describe('log', () => {
    test('logs function input and output', () => {
      const add = (a: number, b: number) => a + b;
      const loggedAdd = log(add, 'add');
      
      const result = loggedAdd(2, 3);
      expect(result).toBe(5);
    });

    test('works without label', () => {
      const double = (x: number) => x * 2;
      const loggedDouble = log(double);
      
      const result = loggedDouble(4);
      expect(result).toBe(8);
    });
  });

  describe('memoizeWith', () => {
    test('memoizes with custom key function', () => {
      let callCount = 0;
      const memoizedFn = memoizeWith(
        (a: number, b: number) => {
          callCount++;
          return a + b;
        },
        (a, b) => `${a}-${b}`
      );
      
      expect(memoizedFn(1, 2)).toBe(3);
      expect(memoizedFn(1, 2)).toBe(3);
      expect(callCount).toBe(1);
    });
  });

  describe('limitConcurrency', () => {
    test('limits concurrent function executions', async () => {
      let running = 0;
      let maxRunning = 0;
      
      const limitedFn = limitConcurrency(async () => {
        running++;
        maxRunning = Math.max(maxRunning, running);
        await new Promise(resolve => setTimeout(resolve, 100));
        running--;
      }, 2);
      
      const promises = [
        limitedFn(),
        limitedFn(),
        limitedFn(),
        limitedFn()
      ];
      
      await Promise.all(promises);
      expect(maxRunning).toBe(2);
    });

    test('handles single concurrency limit', async () => {
      let running = 0;
      let maxRunning = 0;
      
      const limitedFn = limitConcurrency(async () => {
        running++;
        maxRunning = Math.max(maxRunning, running);
        await new Promise(resolve => setTimeout(resolve, 50));
        running--;
      }, 1);
      
      const promises = [
        limitedFn(),
        limitedFn(),
        limitedFn()
      ];
      
      await Promise.all(promises);
      expect(maxRunning).toBe(1);
    });
  });
}); 
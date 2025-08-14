import {
  clamp,
  isBetween,
  round,
  formatNumber,
  formatCurrency,
  formatPercent,
  randomInt,
  randomFloat,
  isEven,
  isOdd,
  isPrime,
  factorial,
  degreesToRadians,
  radiansToDegrees,
  gcd,
  lcm,
  isPowerOf2,
  nextPowerOf2,
  sum,
  average,
  min,
  max,
  median,
  standardDeviation,
  isFinite,
  isInteger,
  isSafeInteger
} from '../number';

describe('Number Utilities', () => {
  describe('clamp', () => {
    test('clamps value between min and max', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    test('handles edge cases', () => {
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });

    test('handles negative ranges', () => {
      expect(clamp(0, -10, -5)).toBe(-5);
      expect(clamp(-15, -10, -5)).toBe(-10);
    });
  });

  describe('isBetween', () => {
    test('checks if value is between min and max', () => {
      expect(isBetween(5, 0, 10)).toBe(true);
      expect(isBetween(0, 0, 10)).toBe(true);
      expect(isBetween(10, 0, 10)).toBe(true);
      expect(isBetween(-1, 0, 10)).toBe(false);
      expect(isBetween(11, 0, 10)).toBe(false);
    });


  });

  describe('round', () => {
    test('rounds to specified decimal places', () => {
      expect(round(3.14159, 2)).toBe(3.14);
      expect(round(3.14159, 0)).toBe(3);
      expect(round(3.5, 0)).toBe(4);
    });

    test('handles negative decimals', () => {
      expect(round(1234.56, -2)).toBe(1200);
      expect(round(1234.56, -1)).toBe(1230);
    });
  });

  describe('formatNumber', () => {
    test('formats number with locale', () => {
      expect(formatNumber(1234.56, 'en-US')).toMatch(/1,234\.56/);
      expect(formatNumber(1234.56, 'de-DE')).toMatch(/1\.234,56/);
    });

    test('handles locale parameter', () => {
      const result = formatNumber(1234.56, 'de-DE');
      expect(result).toMatch(/1\.234,56/);
    });
  });

  describe('formatCurrency', () => {
    test('formats currency', () => {
      expect(formatCurrency(1234.56, 'USD')).toMatch(/\$1,234\.56/);
      expect(formatCurrency(1234.56, 'EUR')).toMatch(/€1,234\.56/);
    });

    test('handles currency parameter', () => {
      const result = formatCurrency(1234.56, 'EUR', 'de-DE');
      // German locale should use comma as decimal separator and space before euro
      expect(result).toMatch(/1\.234,56\s*€/);
    });
  });

  describe('formatPercent', () => {
    test('formats percentage', () => {
      expect(formatPercent(0.1234)).toMatch(/12\.34%/);
      expect(formatPercent(0.5)).toMatch(/50\.00%/);
    });

    test('handles decimals parameter', () => {
      const result = formatPercent(0.1234, 1);
      expect(result).toMatch(/12\.3%/);
    });
  });

  describe('randomInt', () => {
    test('generates integer within range', () => {
      const result = randomInt(1, 10);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });

    test('handles inclusive bounds', () => {
      const result = randomInt(5, 5);
      expect(result).toBe(5);
    });
  });

  describe('randomFloat', () => {
    test('generates float within range', () => {
      const result = randomFloat(0, 1);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1);
    });

    test('handles negative ranges', () => {
      const result = randomFloat(-1, 0);
      expect(result).toBeGreaterThanOrEqual(-1);
      expect(result).toBeLessThan(0);
    });
  });

  describe('isEven', () => {
    test('checks if number is even', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(4)).toBe(true);
      expect(isEven(1)).toBe(false);
      expect(isEven(3)).toBe(false);
      expect(isEven(0)).toBe(true);
    });
  });

  describe('isOdd', () => {
    test('checks if number is odd', () => {
      expect(isOdd(1)).toBe(true);
      expect(isOdd(3)).toBe(true);
      expect(isOdd(2)).toBe(false);
      expect(isOdd(4)).toBe(false);
      expect(isOdd(0)).toBe(false);
    });
  });

  describe('isPrime', () => {
    test('checks if number is prime', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(1)).toBe(false);
      expect(isPrime(0)).toBe(false);
    });
  });

  describe('factorial', () => {
    test('calculates factorial', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(5)).toBe(120);
      expect(factorial(10)).toBe(3628800);
    });

    test('handles negative numbers', () => {
      expect(factorial(-1)).toBe(1);
    });
  });

  describe('degreesToRadians', () => {
    test('converts degrees to radians', () => {
      expect(degreesToRadians(0)).toBe(0);
      expect(degreesToRadians(180)).toBe(Math.PI);
      expect(degreesToRadians(360)).toBe(2 * Math.PI);
    });
  });

  describe('radiansToDegrees', () => {
    test('converts radians to degrees', () => {
      expect(radiansToDegrees(0)).toBe(0);
      expect(radiansToDegrees(Math.PI)).toBe(180);
      expect(radiansToDegrees(2 * Math.PI)).toBe(360);
    });
  });

  describe('gcd', () => {
    test('calculates greatest common divisor', () => {
      expect(gcd(48, 18)).toBe(6);
      expect(gcd(12, 8)).toBe(4);
      expect(gcd(7, 13)).toBe(1);
    });

    test('handles zero', () => {
      expect(gcd(0, 5)).toBe(5);
      expect(gcd(5, 0)).toBe(5);
    });
  });

  describe('lcm', () => {
    test('calculates least common multiple', () => {
      expect(lcm(12, 18)).toBe(36);
      expect(lcm(4, 6)).toBe(12);
      expect(lcm(7, 13)).toBe(91);
    });

    test('handles zero', () => {
      expect(lcm(0, 5)).toBe(0);
      expect(lcm(5, 0)).toBe(0);
    });
  });

  describe('isPowerOf2', () => {
    test('checks if number is power of 2', () => {
      expect(isPowerOf2(1)).toBe(true);
      expect(isPowerOf2(2)).toBe(true);
      expect(isPowerOf2(4)).toBe(true);
      expect(isPowerOf2(8)).toBe(true);
      expect(isPowerOf2(3)).toBe(false);
      expect(isPowerOf2(6)).toBe(false);
    });

    test('handles edge cases', () => {
      expect(isPowerOf2(0)).toBe(false);
      expect(isPowerOf2(-2)).toBe(false);
    });
  });

  describe('nextPowerOf2', () => {
    test('finds next power of 2', () => {
      expect(nextPowerOf2(3)).toBe(4);
      expect(nextPowerOf2(5)).toBe(8);
      expect(nextPowerOf2(8)).toBe(8);
      expect(nextPowerOf2(9)).toBe(16);
    });

    test('handles edge cases', () => {
      expect(nextPowerOf2(0)).toBe(1);
      expect(nextPowerOf2(1)).toBe(1);
    });
  });

  describe('sum', () => {
    test('calculates sum of array', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
      expect(sum([-1, -2, 3])).toBe(0);
    });

    test('handles empty array', () => {
      expect(sum([])).toBe(0);
    });

    test('handles single element', () => {
      expect(sum([5])).toBe(5);
    });
  });

  describe('average', () => {
    test('calculates average of array', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
      expect(average([0, 10])).toBe(5);
    });

    test('handles empty array', () => {
      expect(average([])).toBe(0);
    });
  });

  describe('min', () => {
    test('finds minimum value', () => {
      expect(min([1, 2, 3, 4, 5])).toBe(1);
      expect(min([-5, -2, 0, 3])).toBe(-5);
    });

    test('handles empty array', () => {
      expect(min([])).toBe(Infinity);
    });
  });

  describe('max', () => {
    test('finds maximum value', () => {
      expect(max([1, 2, 3, 4, 5])).toBe(5);
      expect(max([-5, -2, 0, 3])).toBe(3);
    });

    test('handles empty array', () => {
      expect(max([])).toBe(-Infinity);
    });
  });

  describe('median', () => {
    test('calculates median of array', () => {
      expect(median([1, 2, 3, 4, 5])).toBe(3);
      expect(median([1, 2, 3, 4])).toBe(2.5);
    });

    test('handles empty array', () => {
      expect(median([])).toBe(0);
    });

    test('handles single element', () => {
      expect(median([5])).toBe(5);
    });
  });

  describe('standardDeviation', () => {
    test('calculates standard deviation', () => {
      const result = standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]);
      expect(result).toBeCloseTo(2, 1);
    });

    test('handles empty array', () => {
      expect(standardDeviation([])).toBe(0);
    });

    test('handles single element', () => {
      expect(standardDeviation([5])).toBe(0);
    });
  });

  describe('isFinite', () => {
    test('checks if number is finite', () => {
      expect(isFinite(42)).toBe(true);
      expect(isFinite(0)).toBe(true);
      expect(isFinite(-Infinity)).toBe(false);
      expect(isFinite(Infinity)).toBe(false);
      expect(isFinite(NaN)).toBe(false);
    });
  });

  describe('isInteger', () => {
    test('checks if number is integer', () => {
      expect(isInteger(42)).toBe(true);
      expect(isInteger(0)).toBe(true);
      expect(isInteger(3.14)).toBe(false);
      expect(isInteger(-42)).toBe(true);
    });
  });

  describe('isSafeInteger', () => {
    test('checks if number is safe integer', () => {
      expect(isSafeInteger(42)).toBe(true);
      expect(isSafeInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
      expect(isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
      expect(isSafeInteger(Number.MIN_SAFE_INTEGER - 1)).toBe(false);
    });
  });
}); 
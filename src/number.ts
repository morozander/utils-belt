/**
 * Number utility functions
 */

/**
 * Clamps a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Checks if a number is between min and max (inclusive)
 */
export function isBetween(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Rounds a number to a specified number of decimal places
 */
export function round(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Formats a number with thousands separators
 */
export function formatNumber(value: number, locale: string = 'en-US'): string {
  return value.toLocaleString(locale);
}

/**
 * Formats a number as currency
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return value.toLocaleString(locale, {
    style: 'currency',
    currency: currency
  });
}

/**
 * Formats a number as a percentage
 */
export function formatPercent(
  value: number,
  decimals: number = 2,
  locale: string = 'en-US'
): string {
  return (value * 100).toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }) + '%';
}

/**
 * Generates a random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random float between min and max
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Checks if a number is even
 */
export function isEven(value: number): boolean {
  return value % 2 === 0;
}

/**
 * Checks if a number is odd
 */
export function isOdd(value: number): boolean {
  return value % 2 !== 0;
}

/**
 * Checks if a number is prime
 */
export function isPrime(value: number): boolean {
  if (value < 2) return false;
  if (value === 2) return true;
  if (value % 2 === 0) return false;
  
  const sqrt = Math.sqrt(value);
  for (let i = 3; i <= sqrt; i += 2) {
    if (value % i === 0) return false;
  }
  return true;
}

/**
 * Gets the factorial of a number
 */
export function factorial(value: number): number {
  if (value < 0) return NaN;
  if (value === 0 || value === 1) return 1;
  
  let result = 1;
  for (let i = 2; i <= value; i++) {
    result *= i;
  }
  return result;
}

/**
 * Converts degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Calculates the greatest common divisor of two numbers
 */
export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Calculates the least common multiple of two numbers
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Checks if a number is a power of 2
 */
export function isPowerOf2(value: number): boolean {
  return value > 0 && (value & (value - 1)) === 0;
}

/**
 * Gets the next power of 2 greater than or equal to the given number
 */
export function nextPowerOf2(value: number): number {
  if (value <= 0) return 1;
  let power = 1;
  while (power < value) {
    power *= 2;
  }
  return power;
}

/**
 * Calculates the sum of an array of numbers
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

/**
 * Calculates the average of an array of numbers
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

/**
 * Finds the minimum value in an array of numbers
 */
export function min(numbers: number[]): number {
  if (numbers.length === 0) return NaN;
  return Math.min(...numbers);
}

/**
 * Finds the maximum value in an array of numbers
 */
export function max(numbers: number[]): number {
  if (numbers.length === 0) return NaN;
  return Math.max(...numbers);
}

/**
 * Calculates the median of an array of numbers
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) return NaN;
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1]! + sorted[mid]!) / 2;
  } else {
    return sorted[mid]!;
  }
}

/**
 * Calculates the standard deviation of an array of numbers
 */
export function standardDeviation(numbers: number[]): number {
  if (numbers.length < 2) return 0;
  
  const avg = average(numbers);
  const variance = average(numbers.map(num => Math.pow(num - avg, 2)));
  return Math.sqrt(variance);
}

/**
 * Checks if a number is finite
 */
export function isFinite(value: number): boolean {
  return Number.isFinite(value);
}

/**
 * Checks if a number is an integer
 */
export function isInteger(value: number): boolean {
  return Number.isInteger(value);
}

/**
 * Checks if a number is safe (within safe integer range)
 */
export function isSafeInteger(value: number): boolean {
  return Number.isSafeInteger(value);
} 
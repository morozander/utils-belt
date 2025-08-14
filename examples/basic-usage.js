// Basic usage examples for micro-toolbox
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
  sleep
} from '../dist/index.js';

console.log('=== Micro Toolbox Examples ===\n');

// Array utilities
console.log('Array Utilities:');
const numbers = range(1, 10, 2);
console.log('range(1, 10, 2):', numbers);

const uniqueItems = unique([1, 2, 2, 3, 3, 4]);
console.log('unique([1, 2, 2, 3, 3, 4]):', uniqueItems);

const chunks = chunk([1, 2, 3, 4, 5, 6], 2);
console.log('chunk([1, 2, 3, 4, 5, 6], 2):', chunks);

const shuffled = shuffle([1, 2, 3, 4, 5]);
console.log('shuffle([1, 2, 3, 4, 5]):', shuffled);
console.log();

// Object utilities
console.log('Object Utilities:');
const original = { user: { name: 'John', settings: { theme: 'dark' } } };
const cloned = deepClone(original);
console.log('deepClone:', cloned !== original);

const userInfo = pick(original.user, ['name']);
console.log('pick(original.user, ["name"]):', userInfo);

const userWithoutName = omit(original.user, ['name']);
console.log('omit(original.user, ["name"]):', userWithoutName);
console.log();

// String utilities
console.log('String Utilities:');
console.log('capitalize("hello world"):', capitalize('hello world'));
console.log('camelCase("hello world"):', camelCase('hello world'));
console.log('kebabCase("helloWorld"):', kebabCase('helloWorld'));
console.log();

// Number utilities
console.log('Number Utilities:');
console.log('clamp(5, 0, 10):', clamp(5, 0, 10));
console.log('clamp(-5, 0, 10):', clamp(-5, 0, 10));
console.log('clamp(15, 0, 10):', clamp(15, 0, 10));
console.log('formatCurrency(1234.56):', formatCurrency(1234.56));
console.log();

// Function utilities
console.log('Function Utilities:');
let callCount = 0;
const debouncedFn = debounce(() => {
  callCount++;
  console.log('Debounced function called, count:', callCount);
}, 100);

debouncedFn();
debouncedFn();
debouncedFn();
console.log('Call count before delay:', callCount);

// Wait for debounce
setTimeout(() => {
  console.log('Call count after delay:', callCount);
}, 150);
console.log();

// Date utilities
console.log('Date Utilities:');
const now = new Date();
console.log('formatDate(now):', formatDate(now, 'YYYY-MM-DD'));
console.log('addDays(now, 1):', formatDate(addDays(now, 1), 'YYYY-MM-DD'));
console.log();

// Validation utilities
console.log('Validation Utilities:');
console.log('isDefined("hello"):', isDefined('hello'));
console.log('isDefined(null):', isDefined(null));
console.log('isValidEmail("user@example.com"):', isValidEmail('user@example.com'));
console.log('isValidEmail("invalid-email"):', isValidEmail('invalid-email'));
console.log();

// Common utilities
console.log('Common Utilities:');
const id1 = generateId();
const id2 = generateId();
console.log('generateId():', id1);
console.log('generateId() (different):', id2);
console.log('IDs are different:', id1 !== id2);

// Sleep example
console.log('Sleep example - waiting 1 second...');
const start = Date.now();
await sleep(1000);
const end = Date.now();
console.log(`Slept for ${end - start}ms`);
console.log();

console.log('=== All examples completed! ==='); 
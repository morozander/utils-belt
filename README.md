# Utils Belt

A utility belt library with essential helper functions for JavaScript/TypeScript projects.

## Features

- 🚀 **Micro-sized** - Minimal bundle size with maximum utility
- 📦 **Comprehensive** - 100+ utility functions covering common use cases
- 🔒 **Type Safe** - Full TypeScript support with type definitions
- 🌐 **Universal** - Works in Node.js and browser environments
- 📚 **Well Documented** - JSDoc comments for all functions
- 🧪 **Tested** - Comprehensive test coverage

## Installation

```bash
npm install utils-belt
```

## Usage

### ES Modules

```typescript
import { 
  range, 
  unique, 
  deepClone, 
  capitalize, 
  formatCurrency,
  debounce 
} from 'utils-belt';

// Array utilities
const numbers = range(1, 10); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const uniqueItems = unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]

// Object utilities
const cloned = deepClone({ user: { name: 'John' } });

// String utilities
const title = capitalize('hello world'); // "Hello world"

// Number utilities
const price = formatCurrency(1234.56); // "$1,234.56"

// Function utilities
const debouncedSearch = debounce(searchFunction, 300);
```

### CommonJS

```javascript
const { 
  range, 
  unique, 
  deepClone, 
  capitalize, 
  formatCurrency,
  debounce 
} = require('utils-belt');
```

## API Reference

### Array Utilities

- `range(start, end, step?)` - Creates an array of numbers
- `unique(array)` - Removes duplicate values
- `groupBy(array, keyFn)` - Groups array elements by a key
- `chunk(array, size)` - Splits array into chunks
- `flatten(array, depth?)` - Flattens nested arrays
- `shuffle(array)` - Randomly shuffles array
- `sortBy(array, keyFn, order?)` - Sorts array by key function

### Object Utilities

- `deepClone(obj)` - Creates a deep clone of an object
- `deepMerge(...objects)` - Merges multiple objects deeply
- `pick(obj, keys)` - Picks specified keys from an object
- `omit(obj, keys)` - Omits specified keys from an object
- `get(obj, path, defaultValue?)` - Gets nested property value
- `set(obj, path, value)` - Sets nested property value
- `has(obj, path)` - Checks if object has nested property

### String Utilities

- `capitalize(str)` - Capitalizes first letter
- `camelCase(str)` - Converts to camelCase
- `kebabCase(str)` - Converts to kebab-case
- `snakeCase(str)` - Converts to snake_case
- `pascalCase(str)` - Converts to PascalCase
- `truncate(str, length, suffix?)` - Truncates string
- `stripHtml(html)` - Removes HTML tags
- `escapeHtml(str)` - Escapes HTML characters

### Number Utilities

- `clamp(value, min, max)` - Clamps number between min/max
- `isBetween(value, min, max)` - Checks if number is in range
- `round(value, decimals?)` - Rounds to decimal places
- `formatNumber(value, locale?)` - Formats with separators
- `formatCurrency(value, currency?, locale?)` - Formats as currency
- `formatPercent(value, decimals?, locale?)` - Formats as percentage
- `randomInt(min, max)` - Generates random integer
- `randomFloat(min, max)` - Generates random float

### Function Utilities

- `debounce(func, delay)` - Debounces function calls
- `throttle(func, delay)` - Throttles function calls
- `memoize(func)` - Memoizes function results
- `compose(...fns)` - Composes multiple functions
- `pipe(...fns)` - Pipes value through functions
- `curry(func, arity?)` - Curries a function
- `partial(func, ...args)` - Partially applies arguments
- `once(func)` - Ensures function runs only once

### Date Utilities

- `formatDate(date, format?)` - Formats date to string
- `startOfDay(date)` - Gets start of day
- `endOfDay(date)` - Gets end of day
- `addDays(date, days)` - Adds days to date
- `subDays(date, days)` - Subtracts days from date
- `differenceInDays(date1, date2)` - Gets difference in days
- `isToday(date)` - Checks if date is today
- `getRelativeTime(date)` - Gets relative time string

### Validation Utilities

- `isDefined(value)` - Checks if value is defined
- `isString(value)` - Checks if value is string
- `isNumber(value)` - Checks if value is number
- `isObject(value)` - Checks if value is object
- `isArray(value)` - Checks if value is array
- `isEmpty(value)` - Checks if value is empty
- `isValidEmail(value)` - Validates email format
- `isValidUrl(value)` - Validates URL format
- `isValidCreditCard(value)` - Validates credit card

### Common Utilities

- `generateId()` - Generates unique ID
- `generateUuid()` - Generates UUID v4
- `sleep(ms)` - Sleeps for milliseconds
- `retryWithBackoff(fn, maxRetries?, baseDelay?)` - Retries with backoff
- `timeout(promise, ms)` - Adds timeout to promise
- `deepFreeze(obj)` - Deep freezes object
- `deepCopy(obj)` - Deep copies object

## Examples

### Working with Arrays

```typescript
import { range, unique, groupBy, chunk } from 'utils-belt';

// Create a range of numbers
const numbers = range(1, 20, 2); // [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

// Remove duplicates
const uniqueNumbers = unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]

// Group by category
const products = [
  { name: 'Apple', category: 'fruit' },
  { name: 'Banana', category: 'fruit' },
  { name: 'Carrot', category: 'vegetable' }
];
const grouped = groupBy(products, p => p.category);
// { fruit: [...], vegetable: [...] }

// Split into chunks
const chunks = chunk([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
```

### Working with Objects

```typescript
import { deepClone, pick, omit, get, set } from 'utils-belt';

// Deep clone
const original = { user: { name: 'John', settings: { theme: 'dark' } } };
const cloned = deepClone(original);

// Pick specific keys
const userInfo = pick(original.user, ['name']); // { name: 'John' }

// Omit specific keys
const userWithoutName = omit(original.user, ['name']); // { settings: { theme: 'dark' } }

// Get nested property
const theme = get(original, 'user.settings.theme'); // 'dark'

// Set nested property
set(original, 'user.settings.theme', 'light');
```

### Working with Strings

```typescript
import { 
  capitalize, 
  camelCase, 
  kebabCase, 
  truncate, 
  stripHtml 
} from 'utils-belt';

// Case conversions
capitalize('hello world'); // "Hello world"
camelCase('hello world'); // "helloWorld"
kebabCase('helloWorld'); // "hello-world"
snakeCase('helloWorld'); // "hello_world"

// String manipulation
truncate('This is a very long string', 20); // "This is a very long..."
stripHtml('<p>Hello <strong>World</strong></p>'); // "Hello World"
```

### Working with Functions

```typescript
import { debounce, throttle, memoize, compose } from 'utils-belt';

// Debounce search input
const debouncedSearch = debounce((query) => {
  // Perform search
  console.log('Searching for:', query);
}, 300);

// Throttle scroll events
const throttledScroll = throttle(() => {
  // Handle scroll
  console.log('Scroll event');
}, 100);

// Memoize expensive calculation
const memoizedFactorial = memoize((n) => {
  if (n <= 1) return 1;
  return n * memoizedFactorial(n - 1);
});

// Compose functions
const processText = compose(
  (text) => text.trim(),
  (text) => text.toLowerCase(),
  (text) => text.replace(/\s+/g, '-')
);
const result = processText('  Hello World  '); // "hello-world"
```

### Working with Dates

```typescript
import { 
  formatDate, 
  addDays, 
  isToday, 
  getRelativeTime 
} from 'utils-belt';

// Format dates
const date = new Date();
formatDate(date, 'YYYY-MM-DD HH:mm'); // "2024-01-15 14:30"

// Date arithmetic
const tomorrow = addDays(date, 1);
const nextWeek = addDays(date, 7);

// Date checks
isToday(date); // true/false

// Relative time
getRelativeTime(date); // "2 hours ago"
```

### Working with Validation

```typescript
import { 
  isDefined, 
  isValidEmail, 
  isValidUrl, 
  validateSchema 
} from 'utils-belt';

// Type checks
isDefined('hello'); // true
isDefined(null); // false

// Format validation
isValidEmail('user@example.com'); // true
isValidUrl('https://example.com'); // true

// Schema validation
const userSchema = {
  name: (value: any) => typeof value === 'string' && value.length > 0,
  email: isValidEmail,
  age: (value: any) => typeof value === 'number' && value >= 0
};

const user = { name: 'John', email: 'john@example.com', age: 30 };
const validation = validateSchema(user, userSchema);
// { isValid: true, errors: [] }
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Node.js Support

- Node.js 14+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run tests: `npm test`
6. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

### 1.0.0
- Initial release
- 100+ utility functions
- Full TypeScript support
- Comprehensive documentation
- Browser and Node.js support 
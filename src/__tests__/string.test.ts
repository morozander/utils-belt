import {
  capitalize,
  capitalizeFirstLetterOfEachWord,
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  truncate,
  stripHtml,
  escapeHtml,
  unescapeHtml,
  randomString,
  reverse,
  countOccurrences,
  startsWithIgnoreCase,
  endsWithIgnoreCase,
  trim,
  trimStart,
  trimEnd,
  pad,
  padStart,
  padEnd,
  titleCase,
  isWhitespace
} from '../string';

describe('String Utilities', () => {
  describe('capitalize', () => {
    test('capitalizes first letter of string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    test('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    test('handles single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    test('handles already capitalized string', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    test('handles null and undefined', () => {
      expect(capitalize(null as any)).toBe(null);
      expect(capitalize(undefined as any)).toBe(undefined);
    });
  });

  describe('capitalizeFirstLetterOfEachWord', () => {
    test('capitalizes first letter of each word', () => {
      expect(capitalizeFirstLetterOfEachWord('hello world')).toBe('Hello World');
      expect(capitalizeFirstLetterOfEachWord('john doe smith')).toBe('John Doe Smith');
    });

    test('handles single word', () => {
      expect(capitalizeFirstLetterOfEachWord('hello')).toBe('Hello');
    });

    test('handles empty string', () => {
      expect(capitalizeFirstLetterOfEachWord('')).toBe('');
    });

    test('handles multiple spaces', () => {
      expect(capitalizeFirstLetterOfEachWord('hello   world')).toBe('Hello   World');
    });
  });

  describe('camelCase', () => {
    test('converts string to camelCase', () => {
      expect(camelCase('hello world')).toBe('helloWorld');
      expect(camelCase('hello-world')).toBe('helloWorld');
      expect(camelCase('hello_world')).toBe('helloWorld');
    });

    test('handles single word', () => {
      expect(camelCase('hello')).toBe('hello');
    });

    test('handles empty string', () => {
      expect(camelCase('')).toBe('');
    });

    test('handles already camelCase', () => {
      expect(camelCase('helloWorld')).toBe('helloWorld');
    });
  });

  describe('kebabCase', () => {
    test('converts string to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('Hello World')).toBe('hello-world');
      expect(kebabCase('hello_world')).toBe('hello-world');
    });

    test('handles single word', () => {
      expect(kebabCase('hello')).toBe('hello');
    });

    test('handles empty string', () => {
      expect(kebabCase('')).toBe('');
    });

    test('handles already kebab-case', () => {
      expect(kebabCase('hello-world')).toBe('hello-world');
    });
  });

  describe('snakeCase', () => {
    test('converts string to snake_case', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
      expect(snakeCase('Hello World')).toBe('hello_world');
      expect(snakeCase('hello-world')).toBe('hello_world');
    });

    test('handles single word', () => {
      expect(snakeCase('hello')).toBe('hello');
    });

    test('handles empty string', () => {
      expect(snakeCase('')).toBe('');
    });

    test('handles already snake_case', () => {
      expect(snakeCase('hello_world')).toBe('hello_world');
    });
  });

  describe('pascalCase', () => {
    test('converts string to PascalCase', () => {
      expect(pascalCase('hello world')).toBe('HelloWorld');
      expect(pascalCase('hello-world')).toBe('HelloWorld');
      expect(pascalCase('hello_world')).toBe('HelloWorld');
    });

    test('handles single word', () => {
      expect(pascalCase('hello')).toBe('Hello');
    });

    test('handles empty string', () => {
      expect(pascalCase('')).toBe('');
    });

    test('handles already PascalCase', () => {
      expect(pascalCase('HelloWorld')).toBe('HelloWorld');
    });
  });

  describe('truncate', () => {
    test('truncates string to specified length', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
      expect(truncate('Hello World', 5)).toBe('He...');
    });

    test('returns original string if shorter than length', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    test('uses custom suffix', () => {
      expect(truncate('Hello World', 8, '***')).toBe('Hello***');
    });

    test('handles empty string', () => {
      expect(truncate('', 5)).toBe('');
    });
  });

  describe('stripHtml', () => {
    test('removes HTML tags', () => {
      expect(stripHtml('<p>Hello <strong>World</strong></p>')).toBe('Hello World');
      expect(stripHtml('<div>Content</div>')).toBe('Content');
    });

    test('handles string without HTML', () => {
      expect(stripHtml('Hello World')).toBe('Hello World');
    });

    test('handles empty string', () => {
      expect(stripHtml('')).toBe('');
    });

    test('handles self-closing tags', () => {
      expect(stripHtml('<br/>Hello<img src="test.jpg"/>')).toBe('Hello');
    });
  });

  describe('escapeHtml', () => {
    test('escapes HTML special characters', () => {
      expect(escapeHtml('<div>&"test"</div>')).toBe('&lt;div&gt;&amp;&quot;test&quot;&lt;/div&gt;');
    });

    test('handles string without special characters', () => {
      expect(escapeHtml('Hello World')).toBe('Hello World');
    });

    test('handles empty string', () => {
      expect(escapeHtml('')).toBe('');
    });

    test('escapes all special characters', () => {
      expect(escapeHtml('&<>"\'')).toBe('&amp;&lt;&gt;&quot;&#39;');
    });
  });

  describe('unescapeHtml', () => {
    test('unescapes HTML entities', () => {
      expect(unescapeHtml('&lt;div&gt;&amp;&quot;test&quot;&lt;/div&gt;')).toBe('<div>&"test"</div>');
    });

    test('handles string without entities', () => {
      expect(unescapeHtml('Hello World')).toBe('Hello World');
    });

    test('handles empty string', () => {
      expect(unescapeHtml('')).toBe('');
    });

    test('unescapes all entities', () => {
      expect(unescapeHtml('&amp;&lt;&gt;&quot;&#39;')).toBe('&<>"\'');
    });
  });

  describe('randomString', () => {
    test('generates string of specified length', () => {
      const result = randomString(10);
      expect(result).toHaveLength(10);
    });

    test('generates different strings', () => {
      const result1 = randomString(10);
      const result2 = randomString(10);
      expect(result1).not.toBe(result2);
    });

    test('handles length 0', () => {
      expect(randomString(0)).toBe('');
    });

    test('uses custom charset', () => {
      const result = randomString(5, 'ABC');
      expect(result).toMatch(/^[ABC]{5}$/);
    });
  });

  describe('reverse', () => {
    test('reverses string', () => {
      expect(reverse('hello')).toBe('olleh');
      expect(reverse('world')).toBe('dlrow');
    });

    test('handles empty string', () => {
      expect(reverse('')).toBe('');
    });

    test('handles single character', () => {
      expect(reverse('a')).toBe('a');
    });

    test('handles palindrome', () => {
      expect(reverse('racecar')).toBe('racecar');
    });
  });

  describe('countOccurrences', () => {
    test('counts occurrences of substring', () => {
      expect(countOccurrences('hello hello world', 'hello')).toBe(2);
      expect(countOccurrences('aaa', 'aa')).toBe(2);
    });

    test('returns 0 for non-existent substring', () => {
      expect(countOccurrences('hello world', 'xyz')).toBe(0);
    });

    test('handles empty string', () => {
      expect(countOccurrences('', 'test')).toBe(0);
    });

    test('handles empty substring', () => {
      expect(countOccurrences('hello', '')).toBe(0);
    });
  });

  describe('startsWithIgnoreCase', () => {
    test('checks if string starts with substring (case-insensitive)', () => {
      expect(startsWithIgnoreCase('Hello World', 'hello')).toBe(true);
      expect(startsWithIgnoreCase('HELLO WORLD', 'hello')).toBe(true);
      expect(startsWithIgnoreCase('Hello World', 'WORLD')).toBe(false);
    });

    test('handles empty string', () => {
      expect(startsWithIgnoreCase('', 'test')).toBe(false);
    });

    test('handles empty substring', () => {
      expect(startsWithIgnoreCase('hello', '')).toBe(true);
    });
  });

  describe('endsWithIgnoreCase', () => {
    test('checks if string ends with substring (case-insensitive)', () => {
      expect(endsWithIgnoreCase('Hello World', 'world')).toBe(true);
      expect(endsWithIgnoreCase('HELLO WORLD', 'world')).toBe(true);
      expect(endsWithIgnoreCase('Hello World', 'hello')).toBe(false);
    });

    test('handles empty string', () => {
      expect(endsWithIgnoreCase('', 'test')).toBe(false);
    });

    test('handles empty substring', () => {
      expect(endsWithIgnoreCase('hello', '')).toBe(true);
    });
  });

  describe('trim', () => {
    test('removes leading and trailing whitespace', () => {
      expect(trim('  hello world  ')).toBe('hello world');
      expect(trim('\t\nhello\n\t')).toBe('hello');
    });

    test('handles string without whitespace', () => {
      expect(trim('hello')).toBe('hello');
    });

    test('handles empty string', () => {
      expect(trim('')).toBe('');
    });
  });

  describe('trimStart', () => {
    test('removes leading whitespace', () => {
      expect(trimStart('  hello world')).toBe('hello world');
      expect(trimStart('\t\nhello')).toBe('hello');
    });

    test('handles string without leading whitespace', () => {
      expect(trimStart('hello  ')).toBe('hello  ');
    });
  });

  describe('trimEnd', () => {
    test('removes trailing whitespace', () => {
      expect(trimEnd('hello world  ')).toBe('hello world');
      expect(trimEnd('hello\n\t')).toBe('hello');
    });

    test('handles string without trailing whitespace', () => {
      expect(trimEnd('  hello')).toBe('  hello');
    });
  });

  describe('pad', () => {
    test('pads string to specified length', () => {
      expect(pad('hello', 10)).toBe('  hello   ');
      expect(pad('hello', 9)).toBe('  hello  ');
    });

    test('returns original string if length is shorter', () => {
      expect(pad('hello', 3)).toBe('hello');
    });

    test('uses custom padding character', () => {
      expect(pad('hello', 10, '*')).toBe('**hello***');
    });
  });

  describe('padStart', () => {
    test('pads string to start', () => {
      expect(padStart('hello', 10)).toBe('     hello');
      expect(padStart('hello', 7)).toBe('  hello');
    });

    test('returns original string if length is shorter', () => {
      expect(padStart('hello', 3)).toBe('hello');
    });
  });

  describe('padEnd', () => {
    test('pads string to end', () => {
      expect(padEnd('hello', 10)).toBe('hello     ');
      expect(padEnd('hello', 7)).toBe('hello  ');
    });

    test('returns original string if length is shorter', () => {
      expect(padEnd('hello', 3)).toBe('hello');
    });
  });

  describe('titleCase', () => {
    test('converts string to title case', () => {
      expect(titleCase('hello world')).toBe('Hello World');
      expect(titleCase('JOHN DOE')).toBe('John Doe');
    });

    test('handles single word', () => {
      expect(titleCase('hello')).toBe('Hello');
    });

    test('handles empty string', () => {
      expect(titleCase('')).toBe('');
    });
  });

  describe('isWhitespace', () => {
    test('checks if string contains only whitespace', () => {
      expect(isWhitespace('   ')).toBe(true);
      expect(isWhitespace('\t\n ')).toBe(true);
      expect(isWhitespace('hello')).toBe(false);
    });

    test('handles empty string', () => {
      expect(isWhitespace('')).toBe(true);
    });

    test('handles string with mixed content', () => {
      expect(isWhitespace('  hello  ')).toBe(false);
    });
  });
});
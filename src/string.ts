/**
 * String utility functions
 */

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalizes the first letter of each word in a string
 */
export function capitalizeFirstLetterOfEachWord(str: string): string {
  return str?.split(' ')?.map(capitalize)?.join(' ');
}

/**
 * Converts a string to camelCase
 */
export function camelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
}

/**
 * Converts a string to kebab-case
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Converts a string to snake_case
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Converts a string to PascalCase
 */
export function pascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (chr) => chr.toUpperCase());
}

/**
 * Truncates a string to a specified length
 */
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str;
  return str.substring(0, length - suffix.length) + suffix;
}

/**
 * Removes HTML tags from a string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Escapes HTML special characters
 */
export function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return str.replace(/[&<>"']/g, (match) => htmlEscapes[match]!);
}

/**
 * Unescapes HTML entities
 */
export function unescapeHtml(str: string): string {
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (match) => htmlUnescapes[match]!);
}

/**
 * Generates a random string of specified length
 */
export function randomString(length: number, charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * Reverses a string
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Counts the occurrences of a substring in a string
 */
export function countOccurrences(str: string, substring: string): number {
  if (substring === '') return 0;
  
  let count = 0;
  let position = str.indexOf(substring);
  
  while (position !== -1) {
    count++;
    position = str.indexOf(substring, position + 1);
  }
  
  return count;
}

/**
 * Checks if a string starts with a substring (case-insensitive)
 */
export function startsWithIgnoreCase(str: string, searchString: string, position?: number): boolean {
  return str.toLowerCase().startsWith(searchString.toLowerCase(), position);
}

/**
 * Checks if a string ends with a substring (case-insensitive)
 */
export function endsWithIgnoreCase(str: string, searchString: string, length?: number): boolean {
  return str.toLowerCase().endsWith(searchString.toLowerCase(), length);
}

/**
 * Removes leading and trailing whitespace
 */
export function trim(str: string): string {
  return str.trim();
}

/**
 * Removes leading whitespace
 */
export function trimStart(str: string): string {
  return str.trimStart();
}

/**
 * Removes trailing whitespace
 */
export function trimEnd(str: string): string {
  return str.trimEnd();
}

/**
 * Pads a string to a specified length
 */
export function pad(str: string, length: number, char: string = ' '): string {
  const padLength = length - str.length;
  if (padLength <= 0) return str;
  
  const padStart = Math.floor(padLength / 2);
  const padEnd = padLength - padStart;
  
  return char.repeat(padStart) + str + char.repeat(padEnd);
}

/**
 * Pads a string to the start
 */
export function padStart(str: string, length: number, char: string = ' '): string {
  if (str.length >= length) return str;
  return char.repeat(length - str.length) + str;
}

/**
 * Pads a string to the end
 */
export function padEnd(str: string, length: number, char: string = ' '): string {
  if (str.length >= length) return str;
  return str + char.repeat(length - str.length);
}

/**
 * Converts a string to title case
 */
export function titleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/**
 * Checks if a string contains only whitespace
 */
export function isWhitespace(str: string): boolean {
  return /^\s*$/.test(str);
}

// These functions are moved to validation.ts to avoid duplicates 
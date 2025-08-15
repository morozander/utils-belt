// Integration test to verify all modules can be imported and basic functionality works
import * as arrayUtils from '../array';
import * as objectUtils from '../object';
import * as stringUtils from '../string';
import * as numberUtils from '../number';
import * as functionUtils from '../function';
import * as dateUtils from '../date';
import * as validationUtils from '../validation';
import * as commonUtils from '../common';

describe('Utils Belt Integration', () => {
  test('should export all utility modules', () => {
    // Check that all expected modules are exported
    expect(arrayUtils).toHaveProperty('range');
    expect(arrayUtils).toHaveProperty('unique');
    expect(objectUtils).toHaveProperty('deepClone');
    expect(stringUtils).toHaveProperty('capitalize');
    expect(numberUtils).toHaveProperty('clamp');
    expect(functionUtils).toHaveProperty('debounce');
    expect(dateUtils).toHaveProperty('formatDate');
    expect(validationUtils).toHaveProperty('isDefined');
    expect(commonUtils).toHaveProperty('generateId');
  });

  test('should have working array utilities', () => {
    expect(arrayUtils.range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(arrayUtils.unique([1, 2, 2, 3])).toEqual([1, 2, 3]);
    expect(arrayUtils.chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  test('should have working object utilities', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = objectUtils.deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });

  test('should have working string utilities', () => {
    expect(stringUtils.capitalize('hello')).toBe('Hello');
    expect(stringUtils.camelCase('hello world')).toBe('helloWorld');
    expect(stringUtils.kebabCase('helloWorld')).toBe('hello-world');
  });

  test('should have working number utilities', () => {
    expect(numberUtils.clamp(5, 0, 10)).toBe(5);
    expect(numberUtils.formatCurrency(1234.56)).toContain('$1,234.56');
  });

  test('should have working function utilities', () => {
    let callCount = 0;
    const debouncedFn = functionUtils.debounce(() => { callCount++; }, 100);
    debouncedFn();
    expect(callCount).toBe(0);
  });

  test('should have working date utilities', () => {
    const date = new Date('2024-01-15');
    expect(dateUtils.formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15');
  });

  test('should have working validation utilities', () => {
    expect(validationUtils.isDefined(0)).toBe(true);
    expect(validationUtils.isValidEmail('user@example.com')).toBe(true);
  });

  test('should have working common utilities', () => {
    const id = commonUtils.generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });
}); 
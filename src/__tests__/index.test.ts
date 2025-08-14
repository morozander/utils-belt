// Integration test to verify all modules can be imported and basic functionality works
import * as tinyToolbox from '../index';

describe('Tiny Toolbox Integration', () => {
  test('should export all utility modules', () => {
    // Check that all expected modules are exported
    expect(tinyToolbox).toHaveProperty('range');
    expect(tinyToolbox).toHaveProperty('unique');
    expect(tinyToolbox).toHaveProperty('deepClone');
    expect(tinyToolbox).toHaveProperty('capitalize');
    expect(tinyToolbox).toHaveProperty('clamp');
    expect(tinyToolbox).toHaveProperty('debounce');
    expect(tinyToolbox).toHaveProperty('formatDate');
    expect(tinyToolbox).toHaveProperty('isDefined');
    expect(tinyToolbox).toHaveProperty('generateId');
  });

  test('should have working array utilities', () => {
    expect(tinyToolbox.range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(tinyToolbox.unique([1, 2, 2, 3])).toEqual([1, 2, 3]);
    expect(tinyToolbox.chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  test('should have working object utilities', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = tinyToolbox.deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });

  test('should have working string utilities', () => {
    expect(tinyToolbox.capitalize('hello')).toBe('Hello');
    expect(tinyToolbox.camelCase('hello world')).toBe('helloWorld');
    expect(tinyToolbox.kebabCase('helloWorld')).toBe('hello-world');
  });

  test('should have working number utilities', () => {
    expect(tinyToolbox.clamp(5, 0, 10)).toBe(5);
    expect(tinyToolbox.formatCurrency(1234.56)).toContain('$1,234.56');
  });

  test('should have working function utilities', () => {
    let callCount = 0;
    const debouncedFn = tinyToolbox.debounce(() => { callCount++; }, 100);
    debouncedFn();
    expect(callCount).toBe(0);
  });

  test('should have working date utilities', () => {
    const date = new Date('2024-01-15');
    expect(tinyToolbox.formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15');
  });

  test('should have working validation utilities', () => {
    expect(tinyToolbox.isDefined(0)).toBe(true);
    expect(tinyToolbox.isValidEmail('user@example.com')).toBe(true);
  });

  test('should have working common utilities', () => {
    const id = tinyToolbox.generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });
}); 
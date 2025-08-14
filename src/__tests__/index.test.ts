// Integration test to verify all modules can be imported and basic functionality works
import * as microToolbox from '../index';

describe('Micro Toolbox Integration', () => {
  test('should export all utility modules', () => {
    // Check that all expected modules are exported
    expect(microToolbox).toHaveProperty('range');
    expect(microToolbox).toHaveProperty('unique');
    expect(microToolbox).toHaveProperty('deepClone');
    expect(microToolbox).toHaveProperty('capitalize');
    expect(microToolbox).toHaveProperty('clamp');
    expect(microToolbox).toHaveProperty('debounce');
    expect(microToolbox).toHaveProperty('formatDate');
    expect(microToolbox).toHaveProperty('isDefined');
    expect(microToolbox).toHaveProperty('generateId');
  });

  test('should have working array utilities', () => {
    expect(microToolbox.range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(microToolbox.unique([1, 2, 2, 3])).toEqual([1, 2, 3]);
    expect(microToolbox.chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  test('should have working object utilities', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = microToolbox.deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });

  test('should have working string utilities', () => {
    expect(microToolbox.capitalize('hello')).toBe('Hello');
    expect(microToolbox.camelCase('hello world')).toBe('helloWorld');
    expect(microToolbox.kebabCase('helloWorld')).toBe('hello-world');
  });

  test('should have working number utilities', () => {
    expect(microToolbox.clamp(5, 0, 10)).toBe(5);
    expect(microToolbox.formatCurrency(1234.56)).toContain('$1,234.56');
  });

  test('should have working function utilities', () => {
    let callCount = 0;
    const debouncedFn = microToolbox.debounce(() => { callCount++; }, 100);
    debouncedFn();
    expect(callCount).toBe(0);
  });

  test('should have working date utilities', () => {
    const date = new Date('2024-01-15');
    expect(microToolbox.formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15');
  });

  test('should have working validation utilities', () => {
    expect(microToolbox.isDefined(0)).toBe(true);
    expect(microToolbox.isValidEmail('user@example.com')).toBe(true);
  });

  test('should have working common utilities', () => {
    const id = microToolbox.generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });
}); 
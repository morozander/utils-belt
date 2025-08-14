import {
  formatDate,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  addDays,
  addMonths,
  addYears,
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isToday,
  isYesterday,
  isTomorrow,
  isPast,
  isFuture,
  isWeekend,
  isWeekday,
  getAge,
  getQuarter,
  getWeekNumber,
  isLeapYear,
  getDaysInMonth,
  parseDate,
  getRelativeTime
} from '../date';

describe('Date Utilities', () => {
  const testDate = new Date(2024, 0, 15, 12, 0, 0, 0); // January 15, 2024, 12:00:00:000 local time
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  describe('formatDate', () => {
    test('formats date with default format', () => {
      const result = formatDate(testDate);
      expect(result).toMatch(/Jan 15, 2024/);
    });

    test('formats date with custom format', () => {
      const result = formatDate(testDate, 'yyyy-MM-dd');
      expect(result).toBe('2024-01-15');
    });

    test('formats date with custom format including time', () => {
      const result = formatDate(testDate, 'YYYY-MM-DD HH:mm:ss');
      expect(result).toBe('2024-01-15 12:00:00');
    });
  });

  describe('startOfDay', () => {
    test('returns start of day', () => {
      const result = startOfDay(testDate);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe('endOfDay', () => {
    test('returns end of day', () => {
      const result = endOfDay(testDate);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe('startOfWeek', () => {
    test('returns start of week', () => {
      const result = startOfWeek(testDate);
      expect(result.getDay()).toBe(0); // Sunday
    });
  });

  describe('endOfWeek', () => {
    test('returns end of week', () => {
      const result = endOfWeek(testDate);
      expect(result.getDay()).toBe(6); // Saturday
    });
  });

  describe('startOfMonth', () => {
    test('returns start of month', () => {
      const result = startOfMonth(testDate);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe('endOfMonth', () => {
    test('returns end of month', () => {
      const result = endOfMonth(testDate);
      expect(result.getDate()).toBe(31); // January has 31 days
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe('startOfYear', () => {
    test('returns start of year', () => {
      const result = startOfYear(testDate);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe('endOfYear', () => {
    test('returns end of year', () => {
      const result = endOfYear(testDate);
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe('addDays', () => {
    test('adds days to date', () => {
      const result = addDays(testDate, 5);
      expect(result.getDate()).toBe(20);
    });

    test('handles negative days', () => {
      const result = addDays(testDate, -5);
      expect(result.getDate()).toBe(10);
    });
  });

  describe('addMonths', () => {
    test('adds months to date', () => {
      const result = addMonths(testDate, 2);
      expect(result.getMonth()).toBe(2); // March
    });

    test('handles year boundary', () => {
      const result = addMonths(testDate, 12);
      expect(result.getFullYear()).toBe(2025);
    });
  });

  describe('addYears', () => {
    test('adds years to date', () => {
      const result = addYears(testDate, 5);
      expect(result.getFullYear()).toBe(2029);
    });
  });

  describe('subDays', () => {
    test('subtracts days from date', () => {
      const result = subDays(testDate, 5);
      expect(result.getDate()).toBe(10);
    });
  });

  describe('subMonths', () => {
    test('subtracts months from date', () => {
      const result = subMonths(testDate, 2);
      expect(result.getMonth()).toBe(10); // November (previous year)
      expect(result.getFullYear()).toBe(2023);
    });
  });

  describe('subYears', () => {
    test('subtracts years from date', () => {
      const result = subYears(testDate, 5);
      expect(result.getFullYear()).toBe(2019);
    });
  });

  describe('differenceInDays', () => {
    test('calculates difference in days', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-10');
      const result = differenceInDays(date2, date1);
      expect(result).toBe(9);
    });

    test('handles negative difference', () => {
      const date1 = new Date('2024-01-10');
      const date2 = new Date('2024-01-01');
      const result = differenceInDays(date2, date1);
      expect(result).toBe(-9);
    });
  });

  describe('differenceInMonths', () => {
    test('calculates difference in months', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-03-01');
      const result = differenceInMonths(date2, date1);
      expect(result).toBe(2);
    });
  });

  describe('differenceInYears', () => {
    test('calculates difference in years', () => {
      const date1 = new Date('2020-01-01');
      const date2 = new Date('2024-01-01');
      const result = differenceInYears(date2, date1);
      expect(result).toBe(4);
    });
  });

  describe('isToday', () => {
    test('checks if date is today', () => {
      expect(isToday(today)).toBe(true);
      expect(isToday(yesterday)).toBe(false);
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  describe('isYesterday', () => {
    test('checks if date is yesterday', () => {
      expect(isYesterday(yesterday)).toBe(true);
      expect(isYesterday(today)).toBe(false);
      expect(isYesterday(tomorrow)).toBe(false);
    });
  });

  describe('isTomorrow', () => {
    test('checks if date is tomorrow', () => {
      expect(isTomorrow(tomorrow)).toBe(true);
      expect(isTomorrow(today)).toBe(false);
      expect(isYesterday(tomorrow)).toBe(false);
    });
  });

  describe('isPast', () => {
    test('checks if date is in the past', () => {
      expect(isPast(yesterday)).toBe(true);
      expect(isPast(today)).toBe(false);
      expect(isPast(tomorrow)).toBe(false);
    });
  });

  describe('isFuture', () => {
    test('checks if date is in the future', () => {
      expect(isFuture(tomorrow)).toBe(true);
      expect(isFuture(today)).toBe(false);
      expect(isFuture(yesterday)).toBe(false);
    });
  });

  describe('isWeekend', () => {
    test('checks if date is weekend', () => {
      const saturday = new Date('2024-01-20'); // Saturday
      const sunday = new Date('2024-01-21'); // Sunday
      const monday = new Date('2024-01-22'); // Monday
      
      expect(isWeekend(saturday)).toBe(true);
      expect(isWeekend(sunday)).toBe(true);
      expect(isWeekend(monday)).toBe(false);
    });
  });

  describe('isWeekday', () => {
    test('checks if date is weekday', () => {
      const saturday = new Date('2024-01-20'); // Saturday
      const sunday = new Date('2024-01-21'); // Sunday
      const monday = new Date('2024-01-22'); // Monday
      
      expect(isWeekday(monday)).toBe(true);
      expect(isWeekday(saturday)).toBe(false);
      expect(isWeekday(sunday)).toBe(false);
    });
  });

  describe('getAge', () => {
    test('calculates age from birth date', () => {
      const birthDate = new Date('1990-01-01');
      const currentYear = new Date().getFullYear();
      const expectedAge = currentYear - 1990;
      
      const result = getAge(birthDate);
      expect(result).toBe(expectedAge);
    });
  });

  describe('getQuarter', () => {
    test('gets quarter of year', () => {
      expect(getQuarter(new Date('2024-01-01'))).toBe(1);
      expect(getQuarter(new Date('2024-04-01'))).toBe(2);
      expect(getQuarter(new Date('2024-07-01'))).toBe(3);
      expect(getQuarter(new Date('2024-10-01'))).toBe(4);
    });
  });

  describe('getWeekNumber', () => {
    test('gets week number of year', () => {
      const result = getWeekNumber(testDate);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(53);
    });
  });

  describe('isLeapYear', () => {
    test('checks if year is leap year', () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2023)).toBe(false);
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(1900)).toBe(false);
    });
  });

  describe('getDaysInMonth', () => {
    test('gets number of days in month', () => {
      expect(getDaysInMonth(2024, 1)).toBe(29); // February 2024 (leap year)
      expect(getDaysInMonth(2023, 1)).toBe(28); // February 2023
      expect(getDaysInMonth(2024, 0)).toBe(31); // January
      expect(getDaysInMonth(2024, 3)).toBe(30); // April
    });
  });

  describe('parseDate', () => {
    test('parses date string', () => {
      const result = parseDate('2024-01-15');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.getFullYear()).toBe(2024);
        expect(result.getMonth()).toBe(0);
        expect(result.getDate()).toBe(15);
      }
    });

    test('handles invalid date string', () => {
      const result = parseDate('invalid-date');
      expect(result).toBeNull();
    });
  });

  describe('getRelativeTime', () => {
    test('gets relative time string', () => {
      const now = new Date();
      const oneMinuteAgo = new Date(now.getTime() - 60000);
      const oneHourAgo = new Date(now.getTime() - 3600000);
      const oneDayAgo = new Date(now.getTime() - 86400000);
      
      expect(getRelativeTime(oneMinuteAgo)).toMatch(/minute/);
      expect(getRelativeTime(oneHourAgo)).toMatch(/hour/);
      expect(getRelativeTime(oneDayAgo)).toMatch(/day/);
    });

    test('handles future dates', () => {
      const now = new Date();
      const oneMinuteLater = new Date(now.getTime() + 60000);
      const oneHourLater = new Date(now.getTime() + 3600000);
      
      expect(getRelativeTime(oneMinuteLater)).toMatch(/minute/);
      expect(getRelativeTime(oneHourLater)).toMatch(/hour/);
    });
  });
}); 
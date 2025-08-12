/**
 * Date utility functions
 */

/**
 * Formats a date to a readable string
 */
export function formatDate(
  date: Date,
  format: string = 'YYYY-MM-DD'
): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * Gets the start of a day
 */
export function startOfDay(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

/**
 * Gets the end of a day
 */
export function endOfDay(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
}

/**
 * Gets the start of a week
 */
export function startOfWeek(date: Date, startDay: number = 0): Date {
  const newDate = new Date(date);
  const day = newDate.getDay();
  const diff = newDate.getDate() - day + (startDay === 0 ? 0 : startDay);
  newDate.setDate(diff);
  return startOfDay(newDate);
}

/**
 * Gets the end of a week
 */
export function endOfWeek(date: Date, startDay: number = 0): Date {
  const newDate = new Date(date);
  const day = newDate.getDay();
  const diff = newDate.getDate() - day + (startDay === 0 ? 6 : startDay + 6);
  newDate.setDate(diff);
  return endOfDay(newDate);
}

/**
 * Gets the start of a month
 */
export function startOfMonth(date: Date): Date {
  const newDate = new Date(date);
  newDate.setDate(1);
  return startOfDay(newDate);
}

/**
 * Gets the end of a month
 */
export function endOfMonth(date: Date): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + 1, 0);
  return endOfDay(newDate);
}

/**
 * Gets the start of a year
 */
export function startOfYear(date: Date): Date {
  const newDate = new Date(date);
  newDate.setMonth(0, 1);
  return startOfDay(newDate);
}

/**
 * Gets the end of a year
 */
export function endOfYear(date: Date): Date {
  const newDate = new Date(date);
  newDate.setMonth(11, 31);
  return endOfDay(newDate);
}

/**
 * Adds days to a date
 */
export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

/**
 * Adds months to a date
 */
export function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

/**
 * Adds years to a date
 */
export function addYears(date: Date, years: number): Date {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}

/**
 * Subtracts days from a date
 */
export function subDays(date: Date, days: number): Date {
  return addDays(date, -days);
}

/**
 * Subtracts months from a date
 */
export function subMonths(date: Date, months: number): Date {
  return addMonths(date, -months);
}

/**
 * Subtracts years from a date
 */
export function subYears(date: Date, years: number): Date {
  return addYears(date, -years);
}

/**
 * Gets the difference between two dates in days
 */
export function differenceInDays(date1: Date, date2: Date): number {
  const timeDiff = date1.getTime() - date2.getTime();
  return Math.floor(timeDiff / (1000 * 3600 * 24));
}

/**
 * Gets the difference between two dates in months
 */
export function differenceInMonths(date1: Date, date2: Date): number {
  const yearDiff = date1.getFullYear() - date2.getFullYear();
  const monthDiff = date1.getMonth() - date2.getMonth();
  return yearDiff * 12 + monthDiff;
}

/**
 * Gets the difference between two dates in years
 */
export function differenceInYears(date1: Date, date2: Date): number {
  return date1.getFullYear() - date2.getFullYear();
}

/**
 * Checks if a date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return formatDate(date) === formatDate(today);
}

/**
 * Checks if a date is yesterday
 */
export function isYesterday(date: Date): boolean {
  const yesterday = subDays(new Date(), 1);
  return formatDate(date) === formatDate(yesterday);
}

/**
 * Checks if a date is tomorrow
 */
export function isTomorrow(date: Date): boolean {
  const tomorrow = addDays(new Date(), 1);
  return formatDate(date) === formatDate(tomorrow);
}

/**
 * Checks if a date is in the past
 */
export function isPast(date: Date): boolean {
  return date < new Date();
}

/**
 * Checks if a date is in the future
 */
export function isFuture(date: Date): boolean {
  return date > new Date();
}

/**
 * Checks if a date is on a weekend
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Checks if a date is on a weekday
 */
export function isWeekday(date: Date): boolean {
  return !isWeekend(date);
}

/**
 * Gets the age from a birth date
 */
export function getAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Gets the quarter of a date
 */
export function getQuarter(date: Date): number {
  return Math.ceil((date.getMonth() + 1) / 3);
}

/**
 * Gets the week number of a date
 */
export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

/**
 * Checks if a year is a leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Gets the number of days in a month
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Parses a date string
 */
export function parseDate(dateString: string): Date | null {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Gets a relative time string (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
} 
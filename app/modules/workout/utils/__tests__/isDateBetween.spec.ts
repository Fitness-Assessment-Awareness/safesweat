import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { isDateBetween } from '../isDateBetween';

dayjs.extend(isBetweenPlugin);

describe('isDateBetween', () => {
    it('should return true if the date is between start and end', () => {
        const date = dayjs('2023-10-10');
        const start = dayjs('2023-10-01');
        const end = dayjs('2023-10-20');
        expect(isDateBetween(date, start, end)).toBe(true);
    });

    it('should return false if the date is before start', () => {
        const date = dayjs('2023-09-30');
        const start = dayjs('2023-10-01');
        const end = dayjs('2023-10-20');
        expect(isDateBetween(date, start, end)).toBe(false);
    });

    it('should return false if the date is after end', () => {
        const date = dayjs('2023-10-21');
        const start = dayjs('2023-10-01');
        const end = dayjs('2023-10-20');
        expect(isDateBetween(date, start, end)).toBe(false);
    });

    it('should return false if the date is exactly the start date', () => {
        const date = dayjs('2023-10-01');
        const start = dayjs('2023-10-01');
        const end = dayjs('2023-10-20');
        expect(isDateBetween(date, start, end)).toBe(false);
    });

    it('should return false if the date is exactly the end date', () => {
        const date = dayjs('2023-10-20');
        const start = dayjs('2023-10-01');
        const end = dayjs('2023-10-20');
        expect(isDateBetween(date, start, end)).toBe(false);
    });
});

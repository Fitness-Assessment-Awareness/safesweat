import dayjs from 'dayjs';

export function isDateBetween(date: dayjs.Dayjs, start: dayjs.Dayjs, end: dayjs.Dayjs) {
    return date.isBetween(start, end);
}

import dayjs from 'dayjs';
import plugin from 'dayjs/plugin/duration';
import { useCallback, useRef, useState } from 'react';
import { useInterval } from './useInterval';

interface Options {
    intervalMs?: number;
}

interface CountdownResult {
    seconds: number;
    startCountdown: (duration: number, unit?: plugin.DurationUnitType) => void;
    stopCountdown: () => void;
}

type UseCountdown = (options?: Options) => CountdownResult;

export const useCountdown: UseCountdown = (options?: Options) => {
    const { intervalMs = 1000 } = options || {};

    // Settings initial state as NaN to indicate that the countdown is not started yet
    const [count, setCount] = useState<number>(NaN);
    const startTimeRef = useRef<dayjs.Dayjs>(dayjs());
    const initialCountRef = useRef<number>(0);

    const remainingDuration: plugin.Duration = dayjs.duration(count, 'seconds');

    /**
     * Decrement counter based on time elapsed from the start time
     * 1. Get the current time
     * 2. Calculate the difference between the current time and the start time
     * 3. Convert the difference to seconds and round it
     * 4. Calculate the remaining count by subtracting the initial count with the difference, and make sure it's not
     * negative
     */
    const decrementCounter = useCallback(() => {
        const now = dayjs();
        const diff = now.diff(startTimeRef.current);
        const diffInSeconds = Math.round(dayjs.duration(diff).asSeconds());
        const remainingCount = Math.max(0, initialCountRef.current - diffInSeconds);
        setCount(remainingCount);
    }, []);

    // using 0 count and NaN check to re-trigger the interval again when the startCountdown is called
    useInterval(decrementCounter, !count ? null : intervalMs);

    const startCountdown = useCallback((duration: number, unit: plugin.DurationUnitType = 'seconds') => {
        /**
         * To reset the counter to NaN before starting the countdown
         * Since there might be a case where user start again the countdown when it's not yet finished
         */
        setCount(NaN);
        const initialCount: number = dayjs.duration(duration, unit).asSeconds();
        initialCountRef.current = initialCount;
        startTimeRef.current = dayjs();
        setCount(initialCount);
    }, []);

    const stopCountdown = useCallback(() => setCount(0), []);

    return {
        seconds: remainingDuration.asSeconds(),
        startCountdown,
        stopCountdown,
    };
};

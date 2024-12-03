import dayjs from 'dayjs';
import {
    cancelAllScheduledNotificationsAsync,
    requestPermissionsAsync,
    scheduleNotificationAsync,
} from 'expo-notifications';
import { ReactNode, useEffect } from 'react';
import { useWorkoutProfile } from './WorkoutProfileProvider';

interface ComponentProps {
    children: ReactNode;
}

export function WorkoutNotificationProvider({ children }: ComponentProps) {
    const { workoutProfile } = useWorkoutProfile();
    const { weeklyGoal } = workoutProfile;
    const startOfWeek = dayjs().startOf('week');
    const endOfWeek = dayjs().endOf('week');

    const workoutDoneInThisWeek = workoutProfile.workoutHistories.reduce((prev, curr) => {
        const workoutDate = dayjs(curr.timestamp);
        if (workoutDate.isBetween(startOfWeek, endOfWeek, 'day')) {
            return prev + 1;
        }
        return prev;
    }, 0);

    useEffect(() => {
        const setWorkoutNotification = async () => {
            await requestPermissionsAsync();
            if (!weeklyGoal || workoutDoneInThisWeek >= weeklyGoal) {
                return;
            }

            if (workoutDoneInThisWeek < weeklyGoal) {
                await cancelAllScheduledNotificationsAsync();

                await scheduleNotificationAsync({
                    content: {
                        title: 'Keep up the good work!',
                        body: `You have ${weeklyGoal - workoutDoneInThisWeek} more workout(s) to reach your weekly goal.`,
                    },
                    trigger: {
                        channelId: 'workout-notification',
                        hour: 12,
                        minute: 0,
                        repeats: true,
                    },
                });
            }
        };

        setWorkoutNotification();
    }, [weeklyGoal, workoutDoneInThisWeek]);

    return children;
}

import { Pencil } from '@tamagui/lucide-icons';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Card, Circle, XStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';
import { isDateBetween } from '../utils/isDateBetween';

export function WorkoutRoutineCard() {
    const { t } = useTranslation();
    const navigation = useWorkoutNavigation<'WorkoutLanding'>();
    const { workoutProfile } = useWorkoutProfile();

    const startOfWeek = dayjs().startOf('week');
    const startOfWeekDay = startOfWeek.date();
    const endOfWeek = dayjs().endOf('week');
    const daysInMonth = dayjs().daysInMonth();
    const daysInWeek = Array.from({ length: 7 }, (_, i) => {
        const day = ((i + startOfWeekDay - 1) % daysInMonth) + 1;
        const isWorkoutDone = workoutProfile.workoutHistories.some((workoutHistory) => {
            const workoutDate = dayjs(workoutHistory.timestamp);
            return workoutDate.isSame(startOfWeek.add(i, 'day'), 'date');
        });
        return { day, isWorkoutDone };
    });

    const onSetWeeklyTarget = () => {
        navigation.navigate('WorkoutRoutinePlanning');
    };

    const onVisitWorkoutHistory = () => {
        navigation.navigate('WorkoutHistory');
    };

    const workoutDoneInThisWeek = workoutProfile.workoutHistories.reduce((prev, curr) => {
        const workoutDate = dayjs(curr.timestamp);
        if (isDateBetween(workoutDate, startOfWeek, endOfWeek)) {
            return prev + 1;
        }
        return prev;
    }, 0);

    const getGoalColor = () => {
        if (!workoutProfile.weeklyGoal) {
            return 'black';
        }

        if (workoutDoneInThisWeek < workoutProfile.weeklyGoal) {
            return '$red10';
        }

        return '$green10';
    };

    return (
        <Card
            backgroundColor="#E7EBFB"
            p="$4"
            borderRadius="$8"
            rowGap="$3"
            onPress={onVisitWorkoutHistory}
        >
            <XStack justifyContent="space-between">
                <XStack
                    alignItems="center"
                    columnGap="$2"
                    onPress={onSetWeeklyTarget}
                    hitSlop={4}
                >
                    <Label>{t('workout.routine.weekly.target')}</Label>
                    <Pencil
                        color="black"
                        size="$1"
                    />
                </XStack>
                <Label color={getGoalColor()}>
                    {workoutDoneInThisWeek}/{workoutProfile.weeklyGoal ?? '?'}
                </Label>
            </XStack>
            <XStack
                justifyContent="space-evenly"
                columnGap="$4"
            >
                {daysInWeek.map(({ day, isWorkoutDone }) => (
                    <Circle
                        key={day}
                        size="$4"
                        backgroundColor={isWorkoutDone ? '$green7' : '#DCE0EC'}
                    >
                        <Heading size="small">{day}</Heading>
                    </Circle>
                ))}
            </XStack>
        </Card>
    );
}

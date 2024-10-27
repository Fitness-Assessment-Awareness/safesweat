import { Pencil } from '@tamagui/lucide-icons';
import dayjs from 'dayjs';
import { Card, Circle, XStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';

export function WorkoutRoutineCard() {
    const navigation = useWorkoutNavigation<'WorkoutLanding'>();
    const { workoutProfile } = useWorkoutProfile();

    const startOfWeek = dayjs().startOf('week');
    const startOfWeekDay = startOfWeek.date();
    const endOfWeek = dayjs().endOf('week');
    const daysInMonth = dayjs().daysInMonth();
    const daysInWeek: number[] = Array.from({ length: 7 }, (_, i) => ((i + startOfWeekDay - 1) % daysInMonth) + 1);

    const onSetWeeklyTarget = () => {
        navigation.navigate('WorkoutRoutinePlanning');
    };

    const onVisitWorkoutHistory = () => {
        navigation.navigate('WorkoutHistory');
    };

    const workoutDoneInThisWeek = workoutProfile.workoutHistories.reduce((prev, curr) => {
        const workoutDate = dayjs(curr.timestamp);
        if (workoutDate.isBetween(startOfWeek, endOfWeek, 'day')) {
            return prev + 1;
        }
        return prev;
    }, 0);

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
                    <Label>Weekly Target</Label>
                    <Pencil
                        color="black"
                        size="$1"
                    />
                </XStack>
                <Label color="$green10">
                    {workoutDoneInThisWeek}/{workoutProfile.weeklyGoal ?? '?'}
                </Label>
            </XStack>
            <XStack
                justifyContent="space-evenly"
                columnGap="$4"
            >
                {daysInWeek.map((day) => (
                    <Circle
                        key={day}
                        size="$4"
                        backgroundColor="#DCE0EC"
                    >
                        <Heading size="small">{day}</Heading>
                    </Circle>
                ))}
            </XStack>
        </Card>
    );
}

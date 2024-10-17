import { Pencil } from '@tamagui/lucide-icons';
import dayjs from 'dayjs';
import { Card, Circle, XStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';

export function WorkoutRoutineCard() {
    const startOfWeek = dayjs().startOf('week').date();
    const endOfWeek = dayjs().endOf('week').date();
    const daysInMonth = dayjs().daysInMonth();
    const daysInWeek: number[] = Array.from(
        { length: endOfWeek - startOfWeek + 1 },
        (_, i) => ((i + startOfWeek - 1) % daysInMonth) + 1,
    );

    const navigation = useWorkoutNavigation<'WorkoutLanding'>();
    const { workoutProfile } = useWorkoutProfile();

    const onSetWeeklyTarget = () => {
        navigation.navigate('WorkoutRoutinePlanning');
    };

    return (
        <Card
            backgroundColor="#E7EBFB"
            p="$4"
            borderRadius="$8"
            rowGap="$3"
            onPress={onSetWeeklyTarget}
        >
            <XStack justifyContent="space-between">
                <XStack
                    alignItems="center"
                    columnGap="$2"
                >
                    <Label>Weekly Target</Label>
                    <Pencil
                        color="black"
                        size="$1"
                    />
                </XStack>
                <Label color="$green10">2/{workoutProfile.weeklyGoal ?? '?'}</Label>
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

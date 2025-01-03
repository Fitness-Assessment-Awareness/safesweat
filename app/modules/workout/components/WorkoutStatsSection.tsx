import { Clock, Flame, Medal } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';

export function WorkoutStatsSection() {
    const { t } = useTranslation('workout');
    const { workoutProfile } = useWorkoutProfile();

    return (
        <XStack justifyContent="space-around">
            <YStack alignItems="center">
                <Medal
                    size={24}
                    mb="$1"
                />
                <Heading>{workoutProfile.workoutHistories.length}</Heading>
                <Label>{t('landing.stats.workouts')}</Label>
            </YStack>
            <YStack alignItems="center">
                <Flame
                    size={24}
                    mb="$1"
                />
                <Heading>
                    {workoutProfile.workoutHistories
                        .reduce((prev, curr) => prev + curr.caloriesBurned, 0)
                        .toPrecision(2)}
                </Heading>
                <Label>{t('landing.stats.calories')}</Label>
            </YStack>
            <YStack alignItems="center">
                <Clock
                    size={24}
                    mb="$1"
                />
                <Heading>
                    {(
                        workoutProfile.workoutHistories.reduce((prev, curr) => prev + curr.timeTaken, 0) / 60
                    ).toPrecision(2)}
                </Heading>
                <Label>{t('landing.stats.minutes')}</Label>
            </YStack>
        </XStack>
    );
}

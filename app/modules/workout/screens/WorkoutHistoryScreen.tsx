import dayjs from 'dayjs';
import { Fragment } from 'react';
import { Image, ScrollView, View, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { WorkoutHistory } from '../../onboarding/data/entities/WorkoutHistory';
import { WorkoutAssets } from '../assets';
import { WORKOUTS } from '../data/workouts';

export function WorkoutHistoryScreen() {
    const {
        workoutProfile: { workoutHistories },
    } = useWorkoutProfile();

    const renderContent = () => {
        if (workoutHistories.length === 0) {
            return (
                <View
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    p="$4"
                >
                    <Heading>No workout history</Heading>
                    <Paragraph textAlign="center">Start working out to see your workout history here!</Paragraph>
                </View>
            );
        }

        // Group workout histories by week using a Map to maintain order
        const groupedByWeek = workoutHistories.reduce((acc, workout) => {
            const weekStart = dayjs(workout.timestamp).startOf('week');
            const weekEnd = dayjs(workout.timestamp).endOf('week');
            const weekKey = `${weekStart.format('DD MMM YYYY')} - ${weekEnd.format('DD MMM YYYY')}`;

            if (!acc.has(weekKey)) {
                acc.set(weekKey, []);
            }
            acc.get(weekKey)?.push(workout);
            return acc;
        }, new Map<string, WorkoutHistory[]>());

        // Convert Map to array for rendering
        const groupedByWeekArray = Array.from(groupedByWeek.entries());
        return groupedByWeekArray.map(([weekKey, histories]) => (
            <Fragment key={weekKey}>
                <Heading p="$3">Weekly Summary</Heading>
                <View
                    flex={1}
                    backgroundColor="white"
                >
                    <View
                        p="$3"
                        borderBottomWidth={1}
                        borderColor="$gray5"
                        rowGap="$1"
                    >
                        <Label size="large">{weekKey}</Label>
                        <Paragraph>
                            {histories.length} workout{histories.length > 1 ? 's' : ''}
                        </Paragraph>
                    </View>
                    {histories.map((history, index) => (
                        <XStack
                            key={history.timestamp}
                            p="$3"
                            columnGap="$3"
                            borderBottomWidth={index === histories.length - 1 ? 0 : 1}
                            borderColor="$gray5"
                        >
                            <Image
                                source={WorkoutAssets.workoutBeginner}
                                width={64}
                                height={64}
                                borderRadius="$4"
                                objectFit="cover"
                            />
                            <YStack rowGap="$2">
                                <Paragraph>{dayjs(history.timestamp).format('DD MMM YYYY, hh:mm a')}</Paragraph>
                                <Label size="large">{WORKOUTS[history.workoutKey].title}</Label>
                            </YStack>
                        </XStack>
                    ))}
                </View>
            </Fragment>
        ));
    };

    return (
        <ScrollView
            bounces={false}
            contentContainerStyle={{
                flexGrow: 1,
            }}
        >
            {renderContent()}
        </ScrollView>
    );
}

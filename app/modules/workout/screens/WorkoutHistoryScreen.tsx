import dayjs from 'dayjs';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, View, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { useLanguageCode } from '../../../context/LanguageCodeProvider';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { LanguageCode } from '../../../lang/LanguageCode';
import { WorkoutHistory } from '../../onboarding/data/entities/WorkoutHistory';
import { useWorkouts } from '../data/workouts';

export function WorkoutHistoryScreen() {
    const { t } = useTranslation();
    const {
        workoutProfile: { workoutHistories },
    } = useWorkoutProfile();
    const { languageCode } = useLanguageCode();
    const WORKOUTS = useWorkouts();

    const renderContent = () => {
        if (workoutHistories.length === 0) {
            return (
                <View
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    p="$4"
                >
                    <Heading>{t('workout.history.empty')}</Heading>
                    <Paragraph textAlign="center">{t('workout.history.start.exercise.to.see.history')}</Paragraph>
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
                <Heading p="$3">{t('workout.history.weekly.summary')}</Heading>
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
                            {`${histories.length} ${t('workout.history.workout')}${histories.length > 1 ? 's' : ''}`}
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
                                source={
                                    history.type === 'local'
                                        ? WORKOUTS[history.workoutKey].thumbnail
                                        : { uri: history.imageUrl }
                                }
                                width={64}
                                height={64}
                                borderRadius="$4"
                                objectFit="cover"
                            />
                            <YStack rowGap="$2">
                                <Paragraph>{dayjs(history.timestamp).format('DD MMM YYYY, hh:mm a')}</Paragraph>
                                <Label size="large">
                                    {history.type === 'local'
                                        ? WORKOUTS[history.workoutKey].title
                                        : history[languageCode === LanguageCode.ENGLISH ? 'titleEn' : 'titleMs']}
                                </Label>
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

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, ScrollView, View, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Paragraph } from '../../../components/Paragraph';
import { StoragePublicRepository } from '../../../storage/domain/useCases/StoragePublicRepository';
import { Difficulty } from '../../onboarding/data/entities/Difficulty';
import { WorkoutLandingOnlineExerciseSection } from '../components/WorkoutLandingOnlineExerciseSection';
import { WorkoutLandingRecommendedSection } from '../components/WorkoutLandingRecommendedSection';
import { WorkoutLandingTabs } from '../components/WorkoutLandingTabs';
import { WorkoutPlanCard } from '../components/WorkoutPlanCard';
import { WorkoutRoutineCard } from '../components/WorkoutRoutineCard';
import { WorkoutStatsSection } from '../components/WorkoutStatsSection';
import { useWorkouts, WorkoutKey } from '../data/workouts';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';

export function WorkoutLandingScreen() {
    const { t } = useTranslation();
    const navigation = useWorkoutNavigation<'WorkoutLanding'>();
    const [shouldShowInitialModal, setShouldShowInitialModal] = useState(false);
    const WORKOUTS = useWorkouts();

    useEffect(() => {
        const showInitialModal = async () => {
            const hasShownInitialModal = await StoragePublicRepository.instance.get({
                namespace: 'onboarding',
                key: 'hasShownInitialModal',
            });

            if (hasShownInitialModal) {
                return;
            }

            setShouldShowInitialModal(true);
            await StoragePublicRepository.instance.set({
                namespace: 'onboarding',
                key: 'hasShownInitialModal',
                value: true,
            });
        };

        showInitialModal();
    }, []);

    return (
        <>
            <View>
                <ScrollView
                    contentContainerStyle={{
                        p: '$3',
                        rowGap: '$4',
                    }}
                >
                    <WorkoutStatsSection />
                    <WorkoutRoutineCard />
                    <WorkoutLandingRecommendedSection />
                    <WorkoutLandingOnlineExerciseSection />
                    <WorkoutLandingTabs tabs={[Difficulty.Beginner, Difficulty.Intermediate, Difficulty.Advanced]}>
                        <WorkoutLandingTabs.Content
                            selectedTab={Difficulty.Beginner}
                            rowGap="$4"
                        >
                            {Object.entries(WORKOUTS).map(([workoutKey, value]) => {
                                if (value.difficulty !== Difficulty.Beginner) {
                                    return null;
                                }

                                return (
                                    <WorkoutPlanCard
                                        key={workoutKey}
                                        title={value.title}
                                        description={`${value.estimatedDuration} MINS | ${value.exercises.length} EXERCISES`}
                                        imageSource={value.thumbnail}
                                        onPress={() => {
                                            navigation.navigate('WorkoutPlanDetails', {
                                                workoutKey: workoutKey as WorkoutKey,
                                            });
                                        }}
                                    />
                                );
                            })}
                        </WorkoutLandingTabs.Content>
                        <WorkoutLandingTabs.Content
                            selectedTab={Difficulty.Intermediate}
                            rowGap="$4"
                        >
                            {Object.entries(WORKOUTS).map(([workoutKey, value]) => {
                                if (value.difficulty !== Difficulty.Intermediate) {
                                    return null;
                                }

                                return (
                                    <WorkoutPlanCard
                                        key={workoutKey}
                                        title={value.title}
                                        description={`${value.estimatedDuration} ${t('workout.exercise.details.mins').toUpperCase()} | ${value.exercises.length} ${t('workout.plan.details.exercises').toUpperCase()}`}
                                        imageSource={value.thumbnail}
                                        onPress={() => {
                                            navigation.navigate('WorkoutPlanDetails', {
                                                workoutKey: workoutKey as WorkoutKey,
                                            });
                                        }}
                                    />
                                );
                            })}
                        </WorkoutLandingTabs.Content>
                        <WorkoutLandingTabs.Content
                            selectedTab={Difficulty.Advanced}
                            rowGap="$4"
                        >
                            {Object.entries(WORKOUTS).map(([workoutKey, value]) => {
                                if (value.difficulty !== Difficulty.Advanced) {
                                    return null;
                                }

                                return (
                                    <WorkoutPlanCard
                                        key={workoutKey}
                                        title={value.title}
                                        description={`${value.estimatedDuration} MINS | ${value.exercises.length} EXERCISES`}
                                        imageSource={value.thumbnail}
                                        onPress={() => {
                                            navigation.navigate('WorkoutPlanDetails', {
                                                workoutKey: workoutKey as WorkoutKey,
                                            });
                                        }}
                                    />
                                );
                            })}
                        </WorkoutLandingTabs.Content>
                    </WorkoutLandingTabs>
                </ScrollView>
            </View>
            <Dialog open={shouldShowInitialModal}>
                <Dialog.Portal>
                    <Dialog.Overlay key="overlay" />
                    <Dialog.Content
                        key="content"
                        m="$3"
                        rowGap="$4"
                    >
                        <YStack rowGap="$2">
                            <Heading>{t('landing.welcome_sheet.title', { ns: 'workout' })}</Heading>
                            <Paragraph>{t('landing.welcome_sheet.description', { ns: 'workout' })}</Paragraph>
                        </YStack>
                        <Button
                            themeInverse
                            onPress={() => {
                                setShouldShowInitialModal(false);
                            }}
                        >
                            {t('landing.welcome_sheet.cta', { ns: 'workout' })}
                        </Button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </>
    );
}

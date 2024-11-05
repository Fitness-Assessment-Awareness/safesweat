import React from 'react';
import { ScrollView, View } from 'tamagui';
import { WorkoutLandingRecommendedSection } from '../components/WorkoutLandingRecommendedSection';
import { WorkoutLandingTabs } from '../components/WorkoutLandingTabs';
import { WorkoutPlanCard } from '../components/WorkoutPlanCard';
import { WorkoutRoutineCard } from '../components/WorkoutRoutineCard';
import { WorkoutKey, WORKOUTS } from '../data/workouts';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';

export function WorkoutLandingScreen() {
    const navigation = useWorkoutNavigation<'WorkoutLanding'>();
    return (
        <View>
            <ScrollView
                contentContainerStyle={{
                    p: '$3',
                    rowGap: '$4',
                }}
            >
                <WorkoutRoutineCard />
                <WorkoutLandingRecommendedSection />
                <WorkoutLandingTabs tabs={['beginner', 'intermediate', 'advanced']}>
                    <WorkoutLandingTabs.Content
                        selectedTab="beginner"
                        rowGap="$4"
                    >
                        {Object.entries(WORKOUTS).map(([workoutKey, value]) => {
                            if (value.difficulty !== 'beginner') {
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
                        selectedTab="intermediate"
                        rowGap="$4"
                    >
                        {Object.entries(WORKOUTS).map(([workoutKey, value]) => {
                            if (value.difficulty !== 'intermediate') {
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
                        selectedTab="advanced"
                        rowGap="$4"
                    >
                        {Object.entries(WORKOUTS).map(([workoutKey, value]) => {
                            if (value.difficulty !== 'advanced') {
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
    );
}

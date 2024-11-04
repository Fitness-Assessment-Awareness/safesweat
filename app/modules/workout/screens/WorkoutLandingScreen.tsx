import React from 'react';
import { ScrollView, View } from 'tamagui';
import { Label } from '../../../components/Label';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { WorkoutLandingTabs } from '../components/WorkoutLandingTabs';
import { WorkoutPlanCard } from '../components/WorkoutPlanCard';
import { WorkoutRoutineCard } from '../components/WorkoutRoutineCard';
import { Workout } from '../data/entities/Workout';
import { WorkoutKey, WORKOUTS } from '../data/workouts';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';

export function WorkoutLandingScreen() {
    const navigation = useWorkoutNavigation<'WorkoutLanding'>();
    const { workoutProfile } = useWorkoutProfile();
    const filteredWorkouts = (Object.entries(WORKOUTS) as [WorkoutKey, Workout][]).filter(
        ([, workout]) =>
            workoutProfile.healthProblems.length === 0 ||
            (workoutProfile.healthProblems.length > 0 && workout.difficulty === 'beginner'),
    );

    return (
        <View>
            <ScrollView
                contentContainerStyle={{
                    p: '$3',
                    rowGap: '$4',
                }}
            >
                <WorkoutRoutineCard />
                <Label size="large">Recommended</Label>
                {filteredWorkouts.slice(0, 3).map(([workoutKey, value]) => (
                    <WorkoutPlanCard
                        key={workoutKey}
                        title={value.title}
                        description={`${value.estimatedDuration} MINS | ${value.exercises.length} EXERCISES`}
                        imageSource={value.thumbnail}
                        onPress={() => {
                            navigation.navigate('WorkoutPlanDetails', {
                                workoutKey,
                            });
                        }}
                    />
                ))}
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

import dayjs from 'dayjs';
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

    const workoutPoints = workoutProfile.workoutHistories.reduce((acc, history) => {
        const workout = WORKOUTS[history.workoutKey];
        if (dayjs(history.timestamp).diff(dayjs(), 'days') <= 30) {
            workout.difficulty === 'beginner'
                ? (acc += 1)
                : workout.difficulty === 'intermediate'
                  ? (acc += 2)
                  : (acc += 3);
        }
        return acc;
    }, 0);
    const workoutLevel = workoutPoints < 15 ? 'beginner' : workoutPoints < 30 ? 'intermediate' : 'advanced';
    const filteredWorkouts = (Object.entries(WORKOUTS) as [WorkoutKey, Workout][])
        .filter(
            ([, workout]) =>
                workoutProfile.healthProblems.length === 0 ||
                (workoutProfile.healthProblems.length > 0 && workout.difficulty === 'beginner'),
        )
        .sort(([, workoutA], [, workoutB]) => {
            if (workoutA.difficulty === workoutB.difficulty) return 0;
            if (workoutA.difficulty === workoutLevel) return -1;
            if (workoutB.difficulty === workoutLevel) return 1;
            if (workoutA.difficulty === 'beginner') return 1;
            if (workoutB.difficulty === 'beginner') return -1;
            if (workoutA.difficulty === 'intermediate') return 1;
            if (workoutB.difficulty === 'intermediate') return -1;
            return 0;
        });

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

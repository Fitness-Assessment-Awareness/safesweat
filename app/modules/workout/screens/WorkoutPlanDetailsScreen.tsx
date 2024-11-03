import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useRef, useState } from 'react';
import { Button, Image, ScrollView, Separator, View, XStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Paragraph } from '../../../components/Paragraph';
import { Sheet } from '../../../components/Sheet';
import { WorkoutExerciseDetailsSheetContent } from '../components/WorkoutExerciseDetailsSheet';
import { WorkoutExerciseOverview } from '../components/WorkoutExerciseOverview';
import { EXERCISES, ExerciseKey } from '../data/exercises';
import { WORKOUTS } from '../data/workouts';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';
import { WorkoutStackParamList } from '../navigation/WorkoutStackParamList';

export function WorkoutPlanDetailsScreen() {
    const { navigate } = useWorkoutNavigation<'WorkoutPlanDetails'>();
    const { params } = useRoute<RouteProp<WorkoutStackParamList, 'WorkoutPlanDetails'>>();
    const { workoutKey } = params;

    const sheetRef = useRef<BottomSheetModal>(null);

    const workoutPlan = WORKOUTS[workoutKey];
    const [selectedExercise, setSelectedExercise] = useState<ExerciseKey>('jumpingJacks');
    const selectedExerciseDetails = workoutPlan.exercises.find(
        (exercise) => exercise.exerciseKey === selectedExercise,
    )!;

    return (
        <View flex={1}>
            <StatusBar
                style="light"
                animated
            />
            <View>
                <Image
                    style={{ height: 250, width: '100%' }}
                    objectFit="cover"
                    source={workoutPlan.thumbnail}
                />
                <Heading
                    position="absolute"
                    l="$4"
                    b="$3"
                    color="white"
                    textShadowRadius={1}
                    textShadowColor="black"
                >
                    {workoutPlan.title}
                </Heading>
            </View>
            <XStack
                py="$3"
                px="$4"
                justifyContent="space-between"
                alignItems="center"
            >
                <Paragraph>
                    {workoutPlan.estimatedDuration} MINS | {workoutPlan.exercises.length} EXERCISES
                </Paragraph>
            </XStack>
            <Separator borderColor="#D0D3D8" />
            <ScrollView flex={1}>
                {workoutPlan.exercises.map((exercise, index) => {
                    const exerciseDetails = EXERCISES[exercise.exerciseKey];
                    return (
                        // Not having a stable key here is fine because the exercises are static
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={exercise.exerciseKey + index}>
                            {exercise.type === 'duration' ? (
                                <WorkoutExerciseOverview
                                    type={exercise.type}
                                    value={exercise.exerciseKey}
                                    title={exerciseDetails.title}
                                    duration={exercise.duration}
                                    lottieSource={exerciseDetails.lottieSource}
                                    onValueChange={(exerciseKey) => {
                                        setSelectedExercise(exerciseKey);
                                        sheetRef.current?.present();
                                    }}
                                />
                            ) : (
                                <WorkoutExerciseOverview
                                    type={exercise.type}
                                    value={exercise.exerciseKey}
                                    title={exerciseDetails.title}
                                    reps={exercise.reps}
                                    lottieSource={exerciseDetails.lottieSource}
                                    onValueChange={(exerciseKey) => {
                                        setSelectedExercise(exerciseKey);
                                        sheetRef.current?.present();
                                    }}
                                />
                            )}
                            <Separator borderColor="#D0D3D8" />
                        </Fragment>
                    );
                })}
            </ScrollView>
            <Button
                themeInverse
                m="$4"
                borderRadius="$8"
                onPress={() => {
                    navigate('WorkoutStartInitial', { workoutKey });
                }}
            >
                Start
            </Button>
            <Sheet
                ref={sheetRef}
                snapPoints={['85%']}
            >
                <WorkoutExerciseDetailsSheetContent
                    {...selectedExerciseDetails}
                    {...EXERCISES[selectedExercise]}
                />
            </Sheet>
        </View>
    );
}

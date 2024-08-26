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

const { absBeginner } = WORKOUTS;

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
                    source={absBeginner.thumbnail}
                />
                <Heading
                    position="absolute"
                    l="$4"
                    b="$3"
                    color="white"
                    textShadowRadius={1}
                    textShadowColor="black"
                >
                    {absBeginner.title}
                </Heading>
            </View>
            <XStack
                py="$2"
                px="$4"
                justifyContent="space-between"
                alignItems="center"
            >
                <Paragraph>
                    {absBeginner.estimatedDuration} MINS | {absBeginner.exercises.length} EXERCISES
                </Paragraph>
                <Button
                    borderRadius="$8"
                    themeInverse
                >
                    History
                </Button>
            </XStack>
            <Separator borderColor="#D0D3D8" />
            <ScrollView flex={1}>
                {absBeginner.exercises.map((exercise) => {
                    const exerciseDetails = EXERCISES[exercise.exerciseKey];
                    return (
                        <Fragment key={exercise.exerciseKey}>
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

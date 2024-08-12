import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState } from 'react';
import { Button, Image, ScrollView, Separator, View, XStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Paragraph } from '../../../components/Paragraph';
import { Screen } from '../../../components/Screen';
import { WorkoutExerciseDetailsSheet } from '../components/WorkoutExerciseDetailsSheet';
import { WorkoutExerciseOverview } from '../components/WorkoutExerciseOverview';
import { EXERCISES, ExerciseKey } from '../data/exercises';
import { WORKOUTS } from '../data/workouts';

const { absBeginner } = WORKOUTS;

export function WorkoutPlanDetailsScreen() {
    const [open, setOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState<ExerciseKey>('jumpingJacks');

    const selectedExerciseDetails = absBeginner.exercises.find((exercise) => exercise.exerciseKey === selectedWorkout)!;

    return (
        <Screen flex={1}>
            <StatusBar style="light" />
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
                                        setOpen(true);
                                        setSelectedWorkout(exerciseKey);
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
                                        setOpen(true);
                                        setSelectedWorkout(exerciseKey);
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
            >
                Start
            </Button>
            <WorkoutExerciseDetailsSheet
                open={open}
                onOpenChange={setOpen}
                {...selectedExerciseDetails}
                {...EXERCISES[selectedWorkout]}
            />
        </Screen>
    );
}

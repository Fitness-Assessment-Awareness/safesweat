import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Minus, Plus } from '@tamagui/lucide-icons';
import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useRef, useState } from 'react';
import { Button, Image, ScrollView, Separator, View, XStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { Sheet } from '../../../components/Sheet';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
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
    const { workoutProfile } = useWorkoutProfile();
    const { workoutPoints } = workoutProfile;
    const workoutPlan = WORKOUTS[workoutKey];

    const getInitialMultiplier = () => {
        if (workoutPoints < 15) {
            switch (workoutPlan.difficulty) {
                case 'beginner':
                    return 1;
                case 'intermediate':
                    return 0.75;
                case 'advanced':
                    return 0.5;
                default:
                    return 1;
            }
        }
        if (workoutPoints < 30) {
            switch (workoutPlan.difficulty) {
                case 'beginner':
                    return 1.25;
                case 'intermediate':
                    return 1;
                case 'advanced':
                    return 0.75;
                default:
                    return 1;
            }
        }
        switch (workoutPlan.difficulty) {
            case 'beginner':
                return 1.5;
            case 'intermediate':
                return 1.25;
            case 'advanced':
                return 1;
            default:
                return 1;
        }
    };

    const [multiplier, setMultiplier] = useState(getInitialMultiplier());

    const sheetRef = useRef<BottomSheetModal>(null);

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
                    {(workoutPlan.estimatedDuration * multiplier).toFixed(0)} MINS | {workoutPlan.exercises.length}{' '}
                    EXERCISES
                </Paragraph>
                <XStack
                    alignItems="center"
                    justifyContent="center"
                    columnGap="$2"
                >
                    <Button
                        circular
                        size="$2.5"
                        themeInverse
                        icon={
                            <Minus
                                size="$1"
                                strokeWidth={3}
                            />
                        }
                        onPress={() => {
                            if (multiplier - 0.25 < 0.5) return;
                            setMultiplier((prev) => prev - 0.25);
                        }}
                    />
                    <Label
                        textAlign="center"
                        width={40}
                    >
                        {multiplier.toFixed(2)}x
                    </Label>
                    <Button
                        circular
                        size="$2.5"
                        themeInverse
                        icon={
                            <Plus
                                size="$1"
                                strokeWidth={3}
                            />
                        }
                        onPress={() => {
                            if (multiplier + 0.25 > 2) return;
                            setMultiplier((prev) => prev + 0.25);
                        }}
                    />
                </XStack>
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
                                    duration={exercise.duration * multiplier}
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
                                    reps={exercise.reps * multiplier}
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
                    navigate('WorkoutStartInitial', { workoutKey, multiplier });
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

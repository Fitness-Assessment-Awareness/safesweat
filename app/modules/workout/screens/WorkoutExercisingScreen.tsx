import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Info } from '@tamagui/lucide-icons';
import dayjs from 'dayjs';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import { Pressable } from 'react-native';
import { Button, View } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Screen } from '../../../components/Screen';
import { Sheet } from '../../../components/Sheet';
import { useUser } from '../../../context/UserProvider';
import { useRootNavigation } from '../../../navigation/useAppNavigation';
import { useCountdown } from '../../../utils/useCountdown';
import { WorkoutExerciseDetailsSheetContent } from '../components/WorkoutExerciseDetailsSheet';
import { EXERCISES } from '../data/exercises';
import { WORKOUTS } from '../data/workouts';
import { WorkoutRootStackParamList } from '../navigation/WorkoutStackParamList';

export function WorkoutExercisingScreen() {
    const { setUser } = useUser();
    const sheetRef = useRef<BottomSheetModal>(null);
    const { replace } = useRootNavigation();
    const {
        params: { workoutKey, index },
    } = useRoute<RouteProp<WorkoutRootStackParamList, 'WorkoutExercising'>>();

    const workout = WORKOUTS[workoutKey];
    const workoutExercise = workout.exercises[index];
    const exercise = EXERCISES[workoutExercise.exerciseKey];

    const { seconds, startCountdown, stopCountdown } = useCountdown();

    const onFinishExercise = useCallback(() => {
        if (index === workout.exercises.length - 1) {
            replace('WorkoutSuccess', { workoutKey });
            setUser((user) => ({
                ...user,
                workoutHistories: [
                    ...user.workoutHistories,
                    {
                        workoutKey,
                        timestamp: dayjs().toISOString(),
                        rating: null,
                    },
                ],
            }));
            return;
        }
        replace('WorkoutResting', { workoutKey, index: index + 1 });
    }, [index, replace, setUser, workout.exercises.length, workoutKey]);

    useEffect(() => {
        if (workoutExercise.type === 'duration') {
            startCountdown(workoutExercise.duration);
        }
    }, [startCountdown, workoutExercise]);

    useEffect(() => {
        if (seconds === 0) {
            onFinishExercise();
        }
    }, [onFinishExercise, seconds]);

    return (
        <>
            <Screen flex={1}>
                <StatusBar
                    style="dark"
                    animated
                />
                <View
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                >
                    <LottieView
                        source={exercise.lottieSource}
                        autoPlay
                        loop
                        speed={1.5}
                        style={{ width: '100%', padding: 16, height: '90%' }}
                    />
                </View>
                <View flex={1}>
                    <View
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        pt="$4"
                        columnGap="$1.5"
                    >
                        <Heading>{exercise.title}</Heading>
                        <Pressable
                            onPress={() => {
                                sheetRef.current?.present();
                                if (workoutExercise.type === 'duration') {
                                    stopCountdown();
                                }
                            }}
                            hitSlop={4}
                        >
                            <Info strokeWidth={2.5} />
                        </Pressable>
                    </View>
                    <View
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Heading size="x-large">
                            {workoutExercise.type === 'duration'
                                ? dayjs.duration(seconds, 'seconds').format('mm:ss')
                                : `x${workoutExercise.reps}`}
                        </Heading>
                    </View>
                    <Button
                        themeInverse
                        m="$4"
                        borderRadius="$8"
                        onPress={onFinishExercise}
                    >
                        {workoutExercise.type === 'duration' ? 'Skip' : 'Done'}
                    </Button>
                </View>
            </Screen>
            <Sheet
                ref={sheetRef}
                snapPoints={['85%']}
                onDismiss={() => {
                    if (workoutExercise.type === 'duration') {
                        startCountdown(seconds);
                    }
                }}
            >
                <WorkoutExerciseDetailsSheetContent
                    {...exercise}
                    {...workoutExercise}
                />
            </Sheet>
        </>
    );
}

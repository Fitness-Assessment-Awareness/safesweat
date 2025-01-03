/* eslint-disable no-nested-ternary */
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Info, PhoneCall } from '@tamagui/lucide-icons';
import dayjs from 'dayjs';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { Button, View } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Screen } from '../../../components/Screen';
import { Sheet } from '../../../components/Sheet';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { useRootNavigation } from '../../../navigation/useAppNavigation';
import { useCountdown } from '../../../utils/useCountdown';
import { Gender } from '../../onboarding/data/entities/Gender';
import { WorkoutEmergencyCallSheetContent } from '../components/WorkoutEmergencyCallSheet';
import { WorkoutExerciseDetailsSheetContent } from '../components/WorkoutExerciseDetailsSheet';
import { useExercises } from '../data/exercises';
import { WorkoutRootStackParamList } from '../navigation/WorkoutStackParamList';

export function WorkoutOnlineExercisingScreen() {
    const { t } = useTranslation();
    const { workoutProfile, setWorkoutProfile } = useWorkoutProfile();
    const sheetRefExerciseDetails = useRef<BottomSheetModal>(null);
    const sheetRefEmergencyCall = useRef<BottomSheetModal>(null);
    const startTime = useRef<dayjs.Dayjs>(dayjs());
    const { replace } = useRootNavigation();
    const {
        params: { index, multiplier, timeTaken, caloriesBurned, ...workout },
    } = useRoute<RouteProp<WorkoutRootStackParamList, 'WorkoutOnlineExercising'>>();

    const EXERCISES = useExercises();
    const workoutExercise = workout.exercises[index];
    const exercise = EXERCISES[workoutExercise.exerciseKey];

    const { seconds, startCountdown, stopCountdown } = useCountdown();

    const onFinishExercise = useCallback(() => {
        const exerciseDuration = dayjs().diff(startTime.current, 'seconds');
        const bmr =
            (workoutProfile.gender === Gender.Female ? -161 : 5) +
            workoutProfile.weight * 10 +
            workoutProfile.height * 6.25 -
            21 * 5;

        const currentCaloriesBurned =
            (((bmr * (exercise.difficulty === 'low' ? 3 : exercise.difficulty === 'moderate' ? 5 : 7)) / 24) *
                exerciseDuration) /
            60 /
            60;
        if (index === workout.exercises.length - 1) {
            replace('WorkoutOnlineSuccess');
            setWorkoutProfile((prevWorkoutProfile) => ({
                ...prevWorkoutProfile,
                workoutHistories: [
                    {
                        type: 'online',
                        titleEn: workout.titleEn,
                        titleMs: workout.titleMs,
                        timestamp: dayjs().toISOString(),
                        rating: null,
                        multiplier,
                        imageUrl: workout.imageUrl,
                        difficulty: workout.difficulty,
                        timeTaken: timeTaken + exerciseDuration,
                        caloriesBurned: caloriesBurned + currentCaloriesBurned,
                    },
                    ...prevWorkoutProfile.workoutHistories,
                ],
            }));
            return;
        }
        replace('WorkoutOnlineResting', {
            ...workout,
            index: index + 1,
            multiplier,
            timeTaken: timeTaken + exerciseDuration,
            caloriesBurned: caloriesBurned + currentCaloriesBurned,
        });
    }, [
        caloriesBurned,
        exercise.difficulty,
        index,
        multiplier,
        replace,
        setWorkoutProfile,
        timeTaken,
        workout,
        workoutProfile,
    ]);

    useEffect(() => {
        if (workoutExercise.type === 'duration') {
            startCountdown(workoutExercise.duration * multiplier);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (seconds <= 0) {
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
                        <Heading
                            flexShrink={1}
                            textAlign="center"
                        >
                            {exercise.title}
                            <Pressable
                                onPress={() => {
                                    sheetRefExerciseDetails.current?.present();
                                    if (workoutExercise.type === 'duration') {
                                        stopCountdown();
                                    }
                                }}
                                hitSlop={4}
                            >
                                <Info strokeWidth={2.5} />
                            </Pressable>
                        </Heading>
                    </View>
                    <View
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Heading size="x-large">
                            {workoutExercise.type === 'duration'
                                ? dayjs.duration(seconds, 'seconds').format('mm:ss')
                                : `x${(workoutExercise.reps * multiplier).toFixed(0)}`}
                        </Heading>
                        <Button
                            icon={PhoneCall}
                            backgroundColor="$red11"
                            pressStyle={{ backgroundColor: '$red10' }}
                            color="white"
                            m="$4"
                            borderRadius="$8"
                            onPress={() => {
                                sheetRefEmergencyCall.current?.present();
                                if (workoutExercise.type === 'duration') {
                                    stopCountdown();
                                }
                            }}
                        >
                            {t('workout.emergency.call')}
                        </Button>
                    </View>
                    <Button
                        themeInverse
                        m="$4"
                        borderRadius="$8"
                        onPress={onFinishExercise}
                    >
                        {workoutExercise.type === 'duration' ? t('general.shared.skip') : t('general.shared.done')}
                    </Button>
                </View>
            </Screen>
            <Sheet
                ref={sheetRefExerciseDetails}
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
            <Sheet
                ref={sheetRefEmergencyCall}
                enableDynamicSizing
                onDismiss={() => {
                    if (workoutExercise.type === 'duration') {
                        startCountdown(seconds);
                    }
                }}
            >
                <Sheet.ScrollView>
                    <WorkoutEmergencyCallSheetContent />
                </Sheet.ScrollView>
            </Sheet>
        </>
    );
}

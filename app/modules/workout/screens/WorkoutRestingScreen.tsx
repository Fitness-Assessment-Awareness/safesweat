import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Info, PhoneCall } from '@tamagui/lucide-icons';
import dayjs from 'dayjs';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, getTokenValue, View } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Sheet } from '../../../components/Sheet';
import { useRootNavigation } from '../../../navigation/useAppNavigation';
import { useCountdown } from '../../../utils/useCountdown';
import { WorkoutEmergencyCallSheetContent } from '../components/WorkoutEmergencyCallSheet';
import { WorkoutExerciseDetailsSheetContent } from '../components/WorkoutExerciseDetailsSheet';
import { EXERCISES } from '../data/exercises';
import { WORKOUTS } from '../data/workouts';
import { WorkoutRootStackParamList } from '../navigation/WorkoutStackParamList';

const REST_TIME = 20;

export function WorkoutRestingScreen() {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const sheetRefExerciseDetails = useRef<BottomSheetModal>(null);
    const sheetRefEmergencyCall = useRef<BottomSheetModal>(null);
    const { replace } = useRootNavigation();

    const {
        params: { workoutKey, index, multiplier },
    } = useRoute<RouteProp<WorkoutRootStackParamList, 'WorkoutResting'>>();
    const workout = WORKOUTS[workoutKey];
    const workoutExercise = workout.exercises[index];
    const exercise = EXERCISES[workoutExercise.exerciseKey];

    const { seconds, startCountdown, stopCountdown } = useCountdown();

    const onFinishRest = useCallback(() => {
        replace('WorkoutExercising', { workoutKey, index, multiplier });
    }, [index, multiplier, replace, workoutKey]);

    useEffect(() => {
        startCountdown(REST_TIME);
    }, [startCountdown]);

    useEffect(() => {
        if (seconds <= 0) {
            onFinishRest();
        }
    }, [seconds, onFinishRest]);

    return (
        <>
            <View
                flex={1}
                backgroundColor="$blue11Light"
                pb={insets.bottom}
            >
                <StatusBar
                    style="dark"
                    animated
                />
                <View
                    pt={insets.top + getTokenValue('$8')}
                    flex={3}
                    backgroundColor="white"
                    borderRadius="$10"
                >
                    <LottieView
                        source={exercise.lottieSource}
                        autoPlay
                        loop
                        speed={1.5}
                        style={{ width: '100%', height: 300 }}
                    />
                </View>
                <View flex={4}>
                    <View p="$4">
                        <Heading
                            size="small"
                            color="white"
                        >
                            {t('general.shared.next')} {index + 1}/{workout.exercises.length}
                        </Heading>
                        <View
                            flexDirection="row"
                            justifyContent="space-between"
                        >
                            <View
                                flexDirection="row"
                                justifyContent="center"
                                alignItems="center"
                                columnGap="$1.5"
                                flex={1}
                            >
                                <Heading
                                    size="small"
                                    color="white"
                                    flex={1}
                                >
                                    {exercise.title}
                                    <Pressable
                                        onPress={() => {
                                            sheetRefExerciseDetails.current?.present();
                                            stopCountdown();
                                        }}
                                        hitSlop={4}
                                    >
                                        <Info
                                            color="white"
                                            strokeWidth={2.5}
                                        />
                                    </Pressable>
                                </Heading>
                            </View>
                            <Heading
                                size="small"
                                color="white"
                            >
                                {workoutExercise.type === 'duration'
                                    ? dayjs.duration(workoutExercise.duration * multiplier).format('mm:ss')
                                    : `x ${(workoutExercise.reps * multiplier).toFixed(0)}`}
                            </Heading>
                        </View>
                    </View>
                    <View
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        rowGap="$4"
                    >
                        <Heading color="white">{t('workout.resting.rest').toUpperCase()}</Heading>
                        <Heading
                            size="x-large"
                            color="white"
                        >
                            {dayjs.duration(seconds, 'seconds').format('mm:ss')}
                        </Heading>
                        <Button
                            icon={PhoneCall}
                            backgroundColor="$red11"
                            pressStyle={{ backgroundColor: '$red10' }}
                            color="white"
                            borderRadius="$8"
                            onPress={() => {
                                sheetRefEmergencyCall.current?.present();
                                stopCountdown();
                            }}
                        >
                            {t('workout.emergency.call')}
                        </Button>
                    </View>
                    <Button
                        m="$4"
                        borderRadius="$8"
                        onPress={onFinishRest}
                    >
                        {t('general.shared.skip')}
                    </Button>
                </View>
            </View>
            <Sheet
                ref={sheetRefExerciseDetails}
                snapPoints={['85%']}
                onDismiss={() => {
                    startCountdown(seconds);
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
                    startCountdown(seconds);
                }}
            >
                <Sheet.ScrollView>
                    <WorkoutEmergencyCallSheetContent />
                </Sheet.ScrollView>
            </Sheet>
        </>
    );
}

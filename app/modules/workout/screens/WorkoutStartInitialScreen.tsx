import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ChevronRight, Info } from '@tamagui/lucide-icons';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { getTokenValue, View } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Screen } from '../../../components/Screen';
import { Sheet } from '../../../components/Sheet';
import { useRootNavigation } from '../../../navigation/useAppNavigation';
import { WorkoutExerciseDetailsSheetContent } from '../components/WorkoutExerciseDetailsSheet';
import { useExercises } from '../data/exercises';
import { WORKOUTS } from '../data/workouts';
import { WorkoutRootStackParamList } from '../navigation/WorkoutStackParamList';

export function WorkoutStartInitialScreen() {
    const { t } = useTranslation();
    const { replace } = useRootNavigation();
    const { params } = useRoute<RouteProp<WorkoutRootStackParamList, 'WorkoutStartInitial'>>();
    const { workoutKey } = params;
    const sheetRef = useRef<BottomSheetModal>(null);
    const EXERCISES = useExercises();

    const [isCountingDown, setIsCountingDown] = useState(true);
    const workout = WORKOUTS[workoutKey];
    const firstWorkoutExercise = workout.exercises[0];

    const onNextExercise = () => {
        replace('WorkoutExercising', {
            workoutKey,
            multiplier: params.multiplier,
            index: 0,
        });
    };

    return (
        <>
            <Screen
                flex={1}
                pt="$8"
            >
                <StatusBar
                    style="dark"
                    animated
                />
                <LottieView
                    source={EXERCISES[firstWorkoutExercise.exerciseKey].lottieSource}
                    autoPlay
                    loop
                    speed={1.5}
                    style={{ width: '100%', flex: 2 }}
                />
                <View
                    flex={3}
                    justifyContent="center"
                    alignItems="center"
                    rowGap="$4"
                >
                    <Heading
                        color="$blue11Light"
                        size="large"
                    >
                        {t('workout.start.initial.ready.to.go').toUpperCase()}
                    </Heading>
                    <View
                        flexDirection="row"
                        alignItems="center"
                        columnGap="$1"
                    >
                        <Label size="large">{EXERCISES[firstWorkoutExercise.exerciseKey].title}</Label>
                        <Pressable
                            onPress={() => {
                                sheetRef.current?.present();
                                setIsCountingDown(false);
                            }}
                            hitSlop={4}
                        >
                            <Info size={20} />
                        </Pressable>
                    </View>
                    <View
                        position="relative"
                        pt="$4"
                    >
                        <CountdownCircleTimer
                            isPlaying={isCountingDown}
                            colors={getTokenValue('$blue11Light')}
                            duration={20}
                            size={100}
                            strokeWidth={8}
                            onComplete={onNextExercise}
                        >
                            {({ remainingTime }) => <Heading size="large">{remainingTime}</Heading>}
                        </CountdownCircleTimer>
                        <Pressable
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '30%',
                            }}
                            onPress={onNextExercise}
                        >
                            <ChevronRight size={36} />
                        </Pressable>
                    </View>
                </View>
            </Screen>
            <Sheet
                ref={sheetRef}
                snapPoints={['85%']}
                onDismiss={() => {
                    setIsCountingDown(true);
                }}
            >
                <WorkoutExerciseDetailsSheetContent
                    {...EXERCISES[firstWorkoutExercise.exerciseKey]}
                    {...firstWorkoutExercise}
                />
            </Sheet>
        </>
    );
}

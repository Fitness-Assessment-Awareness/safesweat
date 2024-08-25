import { RouteProp, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTokenValue, View } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Screen } from '../../../components/Screen';
import { EXERCISES } from '../data/exercises';
import { WORKOUTS } from '../data/workouts';
import { WorkoutRootStackParamList } from '../navigation/WorkoutStackParamList';

export function WorkoutStartInitialScreen() {
    const { params } = useRoute<RouteProp<WorkoutRootStackParamList, 'WorkoutStartInitial'>>();
    const { workoutKey } = params;
    const insets = useSafeAreaInsets();

    const workout = WORKOUTS[workoutKey];
    const firstWorkoutExercise = workout.exercises[0];

    return (
        <Screen
            flex={1}
            pt={insets.top + getTokenValue('$8')}
        >
            <LottieView
                source={EXERCISES[firstWorkoutExercise.exerciseKey].lottieSource}
                autoPlay
                loop
                speed={1.5}
                style={{ width: '100%', height: 300 }}
            />
            <View
                flex={1}
                justifyContent="center"
                alignItems="center"
                rowGap="$4"
            >
                <Heading
                    color="$blue11Light"
                    size="large"
                >
                    READY TO GO!
                </Heading>
                <Label size="large">JUMPING JACKS</Label>
            </View>
        </Screen>
    );
}

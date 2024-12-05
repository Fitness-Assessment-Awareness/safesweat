import { XStack } from 'tamagui';
import { Label } from '../../../components/Label';
import absBeginnerImage from '../assets/abs-beginner.png';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';
import { WorkoutPlanCard } from './WorkoutPlanCard';

export function WorkoutLandingOnlineExerciseSection() {
    const { navigate } = useWorkoutNavigation<'WorkoutLanding'>();

    return (
        <>
            <XStack justifyContent="space-between">
                <Label size="large">More Exercise</Label>
                <Label
                    size="large"
                    textDecorationLine="underline"
                    onPress={() => {
                        navigate('WorkoutOnlineExercise');
                    }}
                >
                    See more
                </Label>
            </XStack>
            <WorkoutPlanCard
                title="TEST"
                description="20 MINS | 10 EXERCISES"
                imageSource={absBeginnerImage}
            />
        </>
    );
}

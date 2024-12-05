import { ScrollView } from 'tamagui';
import absBeginnerImage from '../assets/abs-beginner.png';
import { WorkoutPlanCard } from '../components/WorkoutPlanCard';

export function WorkoutOnlineExerciseScreen() {
    return (
        <ScrollView
            contentContainerStyle={{
                p: '$3',
                rowGap: '$4',
            }}
        >
            <WorkoutPlanCard
                title="TEST"
                description="20 MINS | 10 EXERCISES"
                imageSource={absBeginnerImage}
            />
        </ScrollView>
    );
}

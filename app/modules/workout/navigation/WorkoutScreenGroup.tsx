import { WorkoutLandingScreen } from '../screens/WorkoutLandingScreen';
import { WorkoutStack } from './WorkoutStack';

export function WorkoutScreens() {
    return (
        <WorkoutStack.Navigator>
            <WorkoutStack.Screen
                name="WorkoutLanding"
                component={WorkoutLandingScreen}
            />
        </WorkoutStack.Navigator>
    );
}

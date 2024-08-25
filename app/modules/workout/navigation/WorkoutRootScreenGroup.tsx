import { RootStack } from '../../../navigation/AppNavigator';
import { WorkoutStartInitialScreen } from '../screens/WorkoutStartInitialScreen';

export function WorkoutRootScreens() {
    return (
        <RootStack.Screen
            name="WorkoutStartInitial"
            component={WorkoutStartInitialScreen}
            options={{ headerTransparent: true, headerTintColor: 'black', gestureEnabled: false }}
        />
    );
}

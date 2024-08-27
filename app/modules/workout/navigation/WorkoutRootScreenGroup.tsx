import { RootStack } from '../../../navigation/AppNavigator';
import { WorkoutRestingScreen } from '../screens/WorkoutRestingScreen';
import { WorkoutStartInitialScreen } from '../screens/WorkoutStartInitialScreen';

export function WorkoutRootScreens() {
    return ( <>
            <RootStack.Screen
                name="WorkoutStartInitial"
                component={WorkoutStartInitialScreen}
                options={{ headerTransparent: true, headerTintColor: 'black', gestureEnabled: false }}
            />
            <RootStack.Screen
                name="WorkoutResting"
                component={WorkoutRestingScreen}
                options={{ headerTransparent: true, headerTintColor: 'black', gestureEnabled: false }}
            />
        </>
    );
}

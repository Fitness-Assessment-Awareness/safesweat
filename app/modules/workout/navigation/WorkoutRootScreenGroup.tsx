import { RootStack } from '../../../navigation/AppNavigator';
import { WorkoutExercisingScreen } from '../screens/WorkoutExercisingScreen';
import { WorkoutOnlineExercisingScreen } from '../screens/WorkoutOnlineExercising';
import { WorkoutOnlineRestingScreen } from '../screens/WorkoutOnlineRestingScreen';
import { WorkoutOnlineStartInitialScreen } from '../screens/WorkoutOnlineStartInitialScreen';
import { WorkoutOnlinecSuccessScreen } from '../screens/WorkoutOnlineSuccessScreen';
import { WorkoutRestingScreen } from '../screens/WorkoutRestingScreen';
import { WorkoutStartInitialScreen } from '../screens/WorkoutStartInitialScreen';
import { WorkoutSuccessScreen } from '../screens/WorkoutSuccessScreen';

export function WorkoutRootScreens() {
    return (
        <>
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
            <RootStack.Screen
                name="WorkoutExercising"
                component={WorkoutExercisingScreen}
                options={{ headerTransparent: true, headerTintColor: 'black', gestureEnabled: false }}
            />
            <RootStack.Screen
                name="WorkoutSuccess"
                component={WorkoutSuccessScreen}
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name="WorkoutOnlineStartInitial"
                component={WorkoutOnlineStartInitialScreen}
                options={{ headerTransparent: true, headerTintColor: 'black', gestureEnabled: false }}
            />
            <RootStack.Screen
                name="WorkoutOnlineResting"
                component={WorkoutOnlineRestingScreen}
                options={{ headerTransparent: true, headerTintColor: 'black', gestureEnabled: false }}
            />
            <RootStack.Screen
                name="WorkoutOnlineExercising"
                component={WorkoutOnlineExercisingScreen}
                options={{ headerTransparent: true, headerTintColor: 'black', gestureEnabled: false }}
            />
            <RootStack.Screen
                name="WorkoutOnlineSuccess"
                component={WorkoutOnlinecSuccessScreen}
                options={{ headerShown: false }}
            />
        </>
    );
}

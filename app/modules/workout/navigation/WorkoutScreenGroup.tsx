/* eslint-disable react/no-unstable-nested-components */
import { HeaderTitle } from '../../../components/HeaderTitle';
import { WorkoutLandingScreen } from '../screens/WorkoutLandingScreen';
import { WorkoutStack } from './WorkoutStack';

export function WorkoutScreens() {
    return (
        <WorkoutStack.Navigator screenOptions={{ headerTitle: '' }}>
            <WorkoutStack.Screen
                name="WorkoutLanding"
                component={WorkoutLandingScreen}
                options={{
                    headerLeft: () => <HeaderTitle>TIME TO SWEAT!</HeaderTitle>,
                }}
            />
        </WorkoutStack.Navigator>
    );
}

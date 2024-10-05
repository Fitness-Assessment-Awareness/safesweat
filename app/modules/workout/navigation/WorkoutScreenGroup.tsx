/* eslint-disable react/no-unstable-nested-components */
import { HeaderBackButton } from '../../../components/HeaderBackButton';
import { HeaderTitle } from '../../../components/HeaderTitle';
import { WorkoutLandingScreen } from '../screens/WorkoutLandingScreen';
import { WorkoutPlanDetailsScreen } from '../screens/WorkoutPlanDetailsScreen';
import { WorkoutRoutinePlanningScreen } from '../screens/WorkoutRoutinePlanningScreen';
import { WorkoutStack } from './WorkoutStack';
import { useWorkoutNavigation } from './useWorkoutNavigation';

export function WorkoutScreens() {
    return (
        <WorkoutStack.Navigator
            screenOptions={{
                headerTitle: '',
                headerLeft: (props) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const navigation = useWorkoutNavigation();

                    return (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    );
                },
                headerTintColor: 'black',
            }}
        >
            <WorkoutStack.Screen
                name="WorkoutLanding"
                component={WorkoutLandingScreen}
                options={{
                    headerLeft: () => <HeaderTitle>TIME TO SWEAT!</HeaderTitle>,
                }}
            />
            <WorkoutStack.Screen
                name="WorkoutPlanDetails"
                component={WorkoutPlanDetailsScreen}
                options={{ headerTransparent: true, headerTintColor: 'white' }}
            />
            <WorkoutStack.Screen
                name="WorkoutRoutinePlanning"
                component={WorkoutRoutinePlanningScreen}
            />
        </WorkoutStack.Navigator>
    );
}

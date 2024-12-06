/* eslint-disable react/no-unstable-nested-components */
import { useTranslation } from 'react-i18next';
import { HeaderBackButton } from '../../../components/HeaderBackButton';
import { HeaderTitle } from '../../../components/HeaderTitle';
import { WorkoutHistoryScreen } from '../screens/WorkoutHistoryScreen';
import { WorkoutLandingScreen } from '../screens/WorkoutLandingScreen';
import { WorkoutOnlineExerciseScreen } from '../screens/WorkoutOnlineExerciseScreen';
import { WorkoutOnlinePlanDetailsScreen } from '../screens/WorkoutOnlinePlanDetailsScreen';
import { WorkoutPlanDetailsScreen } from '../screens/WorkoutPlanDetailsScreen';
import { WorkoutRoutinePlanningScreen } from '../screens/WorkoutRoutinePlanningScreen';
import { WorkoutStack } from './WorkoutStack';
import { useWorkoutNavigation } from './useWorkoutNavigation';

export function WorkoutScreens() {
    const { t } = useTranslation();
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
                    headerLeft: () => <HeaderTitle>{t('workout.header.time.to.sweat').toUpperCase()}</HeaderTitle>,
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
            <WorkoutStack.Screen
                name="WorkoutHistory"
                component={WorkoutHistoryScreen}
            />
            <WorkoutStack.Screen
                name="WorkoutOnlineExercise"
                component={WorkoutOnlineExerciseScreen}
            />
            <WorkoutStack.Screen
                name="WorkoutOnlinePlanDetails"
                component={WorkoutOnlinePlanDetailsScreen}
                options={{ headerTransparent: true, headerTintColor: 'white' }}
            />
        </WorkoutStack.Navigator>
    );
}

/* eslint-disable react/no-unstable-nested-components */
import { BookMarked, Dumbbell, Globe2, Settings } from '@tamagui/lucide-icons';
import { HeaderBackButton } from '../components/HeaderBackButton';
import { useWorkoutProfile } from '../context/WorkoutProfileProvider';
import { CatalogueScreens } from '../modules/catalogue/navigation/CatalogueScreenGroup';
import { ExploreScreens } from '../modules/explore/navigation/ExploreScreenGroup';
import { OnboardingScreenGroup } from '../modules/onboarding/navigation/OnboardingScreenGroup';
import { SettingsScreens } from '../modules/settings/navigation/SettingsScreenGroup';
import { WorkoutRootScreens } from '../modules/workout/navigation/WorkoutRootScreenGroup';
import { WorkoutScreens } from '../modules/workout/navigation/WorkoutScreenGroup';
import { RootStack, Tab } from './AppNavigator';
import { useRootNavigation } from './useAppNavigation';

function HomeTabScreens() {
    return (
        <Tab.Navigator
            initialRouteName="WorkoutStack"
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true,
            }}
        >
            <Tab.Screen
                name="WorkoutStack"
                component={WorkoutScreens}
                options={{
                    tabBarLabel: 'Workout',
                    tabBarIcon: ({ size, color }) => (
                        <Dumbbell
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="ExploreStack"
                component={ExploreScreens}
                options={{
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ size, color }) => (
                        <Globe2
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CatalogueStack"
                component={CatalogueScreens}
                options={{
                    tabBarLabel: 'Catalogue',
                    tabBarIcon: ({ size, color }) => (
                        <BookMarked
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="SettingsStack"
                component={SettingsScreens}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ size, color }) => (
                        <Settings
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export function Screens() {
    const { workoutProfile } = useWorkoutProfile();
    return (
        <RootStack.Navigator
            id="root"
            screenOptions={{
                orientation: 'portrait',
                headerTitle: '',
                headerLeft: (props) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const navigation = useRootNavigation();

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
            initialRouteName={workoutProfile ? 'HomeTab' : 'OnboardingLanding'}
        >
            {OnboardingScreenGroup}
            <RootStack.Screen
                name="HomeTab"
                component={HomeTabScreens}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            {WorkoutRootScreens()}
        </RootStack.Navigator>
    );
}

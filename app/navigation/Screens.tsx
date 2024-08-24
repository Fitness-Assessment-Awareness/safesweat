/* eslint-disable react/no-unstable-nested-components */
import { BookMarked, Dumbbell, Globe2, Settings } from '@tamagui/lucide-icons';
import { CatalogueScreens } from '../modules/catalogue/navigation/CatalogueScreenGroup';
import { ExploreScreens } from '../modules/explore/navigation/ExploreScreenGroup';
import { OnboardingScreenGroup } from '../modules/onboarding/navigation/OnboardingScreenGroup';
import { SettingsScreens } from '../modules/settings/navigation/SettingsScreenGroup';
import { WorkoutScreens } from '../modules/workout/navigation/WorkoutScreenGroup';
import { RootStack, Tab } from './AppNavigator';

function HomeTabScreens() {
    return (
        <Tab.Navigator
            initialRouteName="WorkoutStack"
            screenOptions={{
                headerShown: false,
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
    return (
        <RootStack.Navigator
            id="root"
            screenOptions={{
                orientation: 'portrait',
            }}
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
        </RootStack.Navigator>
    );
}

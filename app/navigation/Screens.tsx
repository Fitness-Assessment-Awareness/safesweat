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
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ size, color }) => {
                    switch (route.name) {
                        case 'WorkoutStack':
                            return (
                                <Dumbbell
                                    size={size}
                                    color={color}
                                />
                            );
                        case 'ExploreStack':
                            return (
                                <Globe2
                                    size={size}
                                    color={color}
                                />
                            );
                        case 'CatalogueStack':
                            return (
                                <BookMarked
                                    size={size}
                                    color={color}
                                />
                            );
                        case 'SettingsStack':
                            return (
                                <Settings
                                    size={size}
                                    color={color}
                                />
                            );
                        default:
                            return null;
                    }
                },
            })}
        >
            <Tab.Screen
                name="WorkoutStack"
                component={WorkoutScreens}
            />
            <Tab.Screen
                name="ExploreStack"
                component={ExploreScreens}
            />
            <Tab.Screen
                name="CatalogueStack"
                component={CatalogueScreens}
            />
            <Tab.Screen
                name="SettingsStack"
                component={SettingsScreens}
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
                headerShown: false,
            }}
        >
            {OnboardingScreenGroup}
            <RootStack.Screen
                name="HomeTab"
                component={HomeTabScreens}
            />
        </RootStack.Navigator>
    );
}

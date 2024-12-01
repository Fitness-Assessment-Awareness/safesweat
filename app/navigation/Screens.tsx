/* eslint-disable react/no-unstable-nested-components */
import { BookMarked, Dumbbell, Globe2, Settings } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { HeaderBackButton } from '../components/HeaderBackButton';
import { useWorkoutProfile } from '../context/WorkoutProfileProvider';
import { CatalogueScreens } from '../modules/catalogue/navigation/CatalogueScreenGroup';
import { ExploreScreens } from '../modules/explore/navigation/ExploreScreenGroup';
import { Difficulty } from '../modules/onboarding/data/entities/Difficulty';
import { Gender } from '../modules/onboarding/data/entities/Gender';
import { OnboardingScreenGroup } from '../modules/onboarding/navigation/OnboardingScreenGroup';
import { SettingsScreens } from '../modules/settings/navigation/SettingsScreenGroup';
import { WorkoutRootScreens } from '../modules/workout/navigation/WorkoutRootScreenGroup';
import { WorkoutScreens } from '../modules/workout/navigation/WorkoutScreenGroup';
import { RootStack, Tab } from './AppNavigator';
import { useRootNavigation } from './useAppNavigation';

function HomeTabScreens() {
    const { t } = useTranslation();

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
                    tabBarLabel: t('navigation.label.workout'),
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
                    tabBarLabel: t('navigation.label.explore'),
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
                    tabBarLabel: t('catalogue.header.catalogue'),
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
                    tabBarLabel: t('settings.header.settings'),
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
    const { t } = useTranslation();
    const { workoutProfile } = useWorkoutProfile();

    const isOnboardingCompleted =
        workoutProfile &&
        workoutProfile.difficulty !== Difficulty.NONE &&
        workoutProfile.gender !== Gender.NONE &&
        !Number.isNaN(workoutProfile.weight) &&
        !Number.isNaN(workoutProfile.height) &&
        workoutProfile.focusAreas.length > 0;

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
            initialRouteName={isOnboardingCompleted ? 'HomeTab' : 'OnboardingLanding'}
        >
            {OnboardingScreenGroup(t('onboarding.header.get.started').toUpperCase())}
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

/* eslint-disable react/no-unstable-nested-components */
import { BookMarked, Dumbbell, Globe2, Settings } from '@tamagui/lucide-icons';
import { useEffect, useState } from 'react';
import { Spinner, View } from 'tamagui';
import { HeaderBackButton } from '../components/HeaderBackButton';
import { Paragraph } from '../components/Paragraph';
import { useWorkoutProfile } from '../context/WorkoutProfileProvider';
import { CatalogueScreens } from '../modules/catalogue/navigation/CatalogueScreenGroup';
import { ExploreScreens } from '../modules/explore/navigation/ExploreScreenGroup';
import { Difficulty } from '../modules/onboarding/data/entities/Difficulty';
import { Gender } from '../modules/onboarding/data/entities/Gender';
import { OnboardingRootStackParamList } from '../modules/onboarding/navigation/OnboardingRootStackParamList';
import { OnboardingScreenGroup } from '../modules/onboarding/navigation/OnboardingScreenGroup';
import { SettingsScreens } from '../modules/settings/navigation/SettingsScreenGroup';
import { WorkoutRootScreens } from '../modules/workout/navigation/WorkoutRootScreenGroup';
import { WorkoutScreens } from '../modules/workout/navigation/WorkoutScreenGroup';
import { WorkoutRootStackParamList } from '../modules/workout/navigation/WorkoutStackParamList';
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
    const [initialRouteName, setInitialRouteName] = useState<
        'HomeTab' | keyof OnboardingRootStackParamList | keyof WorkoutRootStackParamList | undefined
    >(undefined);
    useEffect(() => {
        const isOnboardingCompleted = () =>
            workoutProfile &&
            workoutProfile.difficulty !== Difficulty.NONE &&
            workoutProfile.gender !== Gender.NONE &&
            !Number.isNaN(workoutProfile.weight) &&
            !Number.isNaN(workoutProfile.height) &&
            workoutProfile.focusAreas.length > 0 &&
            workoutProfile.healthProblems.length > 0;

        const timer = setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            isOnboardingCompleted() ? setInitialRouteName('HomeTab') : setInitialRouteName('OnboardingLanding');
        }, 500);

        return () => clearTimeout(timer);
    }, [workoutProfile]);

    if (!initialRouteName) {
        return (
            <View
                flex={1}
                justifyContent="center"
                alignItems="center"
            >
                <Spinner size="large" />
                <Paragraph m={8}>Setting up your profile...</Paragraph>
            </View>
        );
    }

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
            initialRouteName={initialRouteName}
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

/* eslint-disable react/no-unstable-nested-components */
import { HeaderBackButton } from '../../../components/HeaderBackButton';
import { HeaderTitle } from '../../../components/HeaderTitle';
import { SettingsBookmarkPostsScreen } from '../screens/SettingsBookmarkPostsScreen';
import { SettingsEducationPostDetailsScreen } from '../screens/SettingsEducationPostDetailsScreen';
import { SettingsEmergencyContactScreen } from '../screens/SettingsEmergencyContactScreen';
import { SettingsLandingScreen } from '../screens/SettingsLandingScreen';
import { SettingsWorkoutProfileScreen } from '../screens/SettingsWorkoutProfileScreen';
import { SettingsStack } from './SettingsStack';
import { useSettingsNavigation } from './useSettingsNavigation';

export function SettingsScreens() {
    return (
        <SettingsStack.Navigator
            screenOptions={{
                headerTitle: '',
                headerLeft: (props) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const navigation = useSettingsNavigation();

                    return (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    );
                },
            }}
        >
            <SettingsStack.Screen
                name="SettingsLanding"
                component={SettingsLandingScreen}
                options={{
                    headerTitle: '',
                    headerLeft: () => <HeaderTitle>SETTINGS</HeaderTitle>,
                }}
            />
            <SettingsStack.Screen
                name="SettingsWorkoutProfile"
                component={SettingsWorkoutProfileScreen}
                options={{
                    headerTitle: () => <HeaderTitle mx="$2">WORKOUT PROFILE</HeaderTitle>,
                    headerBackVisible: false,
                }}
            />
            <SettingsStack.Screen
                name="SettingsBookmarkPosts"
                component={SettingsBookmarkPostsScreen}
                options={{
                    headerTitle: () => <HeaderTitle mx="$2">Bookmark</HeaderTitle>,
                    headerBackVisible: false,
                }}
            />
            <SettingsStack.Screen
                name="SettingsEducationPostDetails"
                component={SettingsEducationPostDetailsScreen}
                options={{ headerTransparent: true, headerTintColor: 'white' }}
            />
            <SettingsStack.Screen
                name="SettingsEmergencyContact"
                component={SettingsEmergencyContactScreen}
                options={{
                    headerTitle: () => <HeaderTitle mx="$2">Emergency Contacts</HeaderTitle>,
                    headerBackVisible: false,
                }}
            />
        </SettingsStack.Navigator>
    );
}

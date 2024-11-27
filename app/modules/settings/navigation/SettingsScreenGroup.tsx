/* eslint-disable react/no-unstable-nested-components */
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
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
                    headerLeft: () => <HeaderTitle>{t('settings.header.settings').toUpperCase()}</HeaderTitle>,
                }}
            />
            <SettingsStack.Screen
                name="SettingsWorkoutProfile"
                component={SettingsWorkoutProfileScreen}
                options={{
                    headerTitle: () => (
                        <HeaderTitle mx="$2">{t('settings.landing.workout.profile').toUpperCase()}</HeaderTitle>
                    ),
                    headerBackVisible: false,
                }}
            />
            <SettingsStack.Screen
                name="SettingsBookmarkPosts"
                component={SettingsBookmarkPostsScreen}
                options={{
                    headerTitle: () => (
                        <HeaderTitle mx="$2">{t('settings.landing.bookmarked.posts').toUpperCase()}</HeaderTitle>
                    ),
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
                    headerTitle: () => (
                        <HeaderTitle mx="$2">{t('settings.landing.emergency.contact').toUpperCase()}</HeaderTitle>
                    ),
                    headerBackVisible: false,
                }}
            />
        </SettingsStack.Navigator>
    );
}

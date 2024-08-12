/* eslint-disable react/no-unstable-nested-components */
import { HeaderTitle } from '../../../components/HeaderTitle';
import { SettingsLandingScreen } from '../screens/SettingsLandingScreen';
import { SettingsStack } from './SettingsStack';

export function SettingsScreens() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="SettingsLanding"
                component={SettingsLandingScreen}
                options={{
                    headerTitle: '',
                    headerLeft: () => <HeaderTitle>SETTINGS</HeaderTitle>,
                }}
            />
        </SettingsStack.Navigator>
    );
}

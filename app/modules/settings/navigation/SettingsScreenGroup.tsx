import { SettingsLandingScreen } from '../screens/SettingsLandingScreen';
import { SettingsStack } from './SettingsStack';

export function SettingsScreens() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="SettingsLanding"
                component={SettingsLandingScreen}
            />
        </SettingsStack.Navigator>
    );
}

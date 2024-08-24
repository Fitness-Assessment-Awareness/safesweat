import { HeaderTitle } from '../../../components/HeaderTitle';
import { RootStack } from '../../../navigation/AppNavigator';
import { OnboardingLandingScreen } from '../screens/OnboardingLandingScreen';

export const OnboardingScreenGroup = (
    <RootStack.Group>
        <RootStack.Screen
            name="OnboardingLanding"
            component={OnboardingLandingScreen}
            options={{
                headerTitle: '',
                headerLeft: () => <HeaderTitle>Get Started</HeaderTitle>,
            }}
        />
    </RootStack.Group>
);

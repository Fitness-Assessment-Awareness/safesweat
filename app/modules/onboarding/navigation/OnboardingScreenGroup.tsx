import { RootStack } from '../../../navigation/AppNavigator';
import { OnboardingGenderSelectionScreen } from '../screens/OnboardingGenderSelectionScreen';

export const OnboardingScreenGroup = (
    <RootStack.Group>
        <RootStack.Screen
            name="OnboardingGenderSelection"
            component={OnboardingGenderSelectionScreen}
        />
    </RootStack.Group>
);

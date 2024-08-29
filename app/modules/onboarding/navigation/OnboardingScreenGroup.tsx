import { HeaderTitle } from '../../../components/HeaderTitle';
import { RootStack } from '../../../navigation/AppNavigator';
import { OnboardingBodyInfoSelectScreen } from '../screens/OnboardingBodyInfoSelectScreen';
import { OnboardingDifficultySelectScreen } from '../screens/OnboardingDifficultySelectScreen';
import { OnboardingFocusAreaSelectScreen } from '../screens/OnboardingFocusAreaSelectScreen';
import { OnboardingGenderSelectScreen } from '../screens/OnboardingGenderSelectScreen';
import { OnboardingHealthProbSelectScreen } from '../screens/OnboardingHealthProbSelectScreen';

export const OnboardingScreenGroup = (
    <RootStack.Group>
        <RootStack.Screen
            name="OnboardingGenderSelect"
            component={OnboardingGenderSelectScreen}
            options={{
                headerTitle: '',
                headerLeft: () => <HeaderTitle>Get Started</HeaderTitle>,
            }}
        />
        <RootStack.Screen
            name="OnboardingFocusAreaSelect"
            component={OnboardingFocusAreaSelectScreen}
        />
        <RootStack.Screen
            name="OnboardingDifficultySelect"
            component={OnboardingDifficultySelectScreen}
        />
        <RootStack.Screen
            name="OnboardingHealthProbSelect"
            component={OnboardingHealthProbSelectScreen}
        />
        <RootStack.Screen
            name="OnboardingBodyInfoSelect"
            component={OnboardingBodyInfoSelectScreen}
        />
    </RootStack.Group>
);

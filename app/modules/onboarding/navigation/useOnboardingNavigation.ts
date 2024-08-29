import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationStackParamList } from '../../../navigation/AppNavigator';
import { OnboardingRootStackParamList } from './OnboardingRootStackParamList';

export function useOnboardingNavigation<T extends keyof OnboardingRootStackParamList>() {
    const navigation =
        useNavigation<
            CompositeNavigationProp<
                StackNavigationProp<OnboardingRootStackParamList, T>,
                StackNavigationProp<NavigationStackParamList>
            >
        >();
    return navigation;
}

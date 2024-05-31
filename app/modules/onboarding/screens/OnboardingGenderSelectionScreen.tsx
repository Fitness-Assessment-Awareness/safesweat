import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, YStack } from 'tamagui';
import { useRootNavigation } from '../../../navigation/useAppNavigation';

export function OnboardingGenderSelectionScreen() {
    const { navigate } = useRootNavigation();
    return (
        <SafeAreaView>
            <YStack>
                <Text>Onboarding Gender Selection Screen</Text>
                <Button
                    margin="$4"
                    borderRadius="$12"
                    onPress={() => {
                        navigate('HomeTab', { screen: 'WorkoutStack', params: { screen: 'WorkoutLanding' } });
                    }}
                >
                    Go to Home
                </Button>
            </YStack>
        </SafeAreaView>
    );
}

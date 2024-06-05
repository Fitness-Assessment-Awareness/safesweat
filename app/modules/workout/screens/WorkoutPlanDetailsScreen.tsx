import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, ScrollView } from 'tamagui';
import { Screen } from '../../../components/Screen';
import { WorkoutAssets } from '../assets';

export function WorkoutPlanDetailsScreen() {
    const insets = useSafeAreaInsets();
    return (
        <Screen
            flex={1}
            pt={Platform.OS === 'android' && insets.top}
        >
            {Platform.OS === 'ios' ? <StatusBar barStyle="light-content" /> : null}
            <ScrollView flex={1}>
                <Image
                    style={{ height: 250, width: '100%' }}
                    objectFit="contain"
                    source={WorkoutAssets.workoutBeginner}
                />
            </ScrollView>
        </Screen>
    );
}

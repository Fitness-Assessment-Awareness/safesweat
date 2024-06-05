import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, View } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Screen } from '../../../components/Screen';
import { WorkoutAssets } from '../assets';

export function WorkoutPlanDetailsScreen() {
    return (
        <Screen flex={1}>
            <StatusBar style="light" />
            <ScrollView flex={1}>
                <View>
                    <Image
                        style={{ height: 250, width: '100%' }}
                        objectFit="contain"
                        source={WorkoutAssets.workoutBeginner}
                    />
                    <Heading
                        l="$4"
                        b="$8"
                        color="white"
                        textShadowRadius={1}
                        textShadowColor="black"
                    >
                        ABS BEGINNER
                    </Heading>
                </View>
            </ScrollView>
        </Screen>
    );
}

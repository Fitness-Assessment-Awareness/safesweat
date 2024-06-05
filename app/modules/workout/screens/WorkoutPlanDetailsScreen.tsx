import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, Separator, View, XStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Paragraph } from '../../../components/Paragraph';
import { Screen } from '../../../components/Screen';
import { WorkoutAssets } from '../assets';

export function WorkoutPlanDetailsScreen() {
    return (
        <Screen flex={1}>
            <StatusBar style="light" />
            <ScrollView flex={1}>
                <View backgroundColor="red">
                    <Image
                        style={{ height: 250, width: '100%' }}
                        objectFit="contain"
                        source={WorkoutAssets.workoutBeginner}
                    />
                    <Heading
                        position="absolute"
                        l="$4"
                        b="$3"
                        color="white"
                        textShadowRadius={1}
                        textShadowColor="black"
                    >
                        ABS BEGINNER
                    </Heading>
                </View>
                <XStack
                    py="$2"
                    px="$4"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Paragraph>20 MINS | 16 EXERCISES</Paragraph>
                    <Button borderRadius="$8">History</Button>
                </XStack>
                <Separator borderColor="#D0D3D8" />
            </ScrollView>
        </Screen>
    );
}

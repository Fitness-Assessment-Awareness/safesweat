import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Button, Image, ScrollView, Separator, View, XStack, YStack } from 'tamagui';
import { LottieAssets } from '../../../assets/lottie';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
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
                <XStack p="$2">
                    <LottieView
                        source={LottieAssets.jumpingJack}
                        style={{ width: 100, height: '100%' }}
                        autoPlay
                        loop
                        speed={1.5}
                    />
                    <YStack
                        flex={1}
                        p="$4"
                    >
                        <Label size="large">JUMPING JACKS</Label>
                        <Paragraph size="large">0:20</Paragraph>
                    </YStack>
                </XStack>
                <Separator borderColor="#D0D3D8" />
                <XStack p="$2">
                    <LottieView
                        source={LottieAssets.pushUp}
                        autoPlay
                        loop
                        speed={1.5}
                        style={{ width: 100 }}
                    />
                    <YStack
                        flex={1}
                        p="$4"
                    >
                        <Label size="large">PUSH UP</Label>
                        <Paragraph size="large">0:20</Paragraph>
                    </YStack>
                </XStack>
                <Separator borderColor="#D0D3D8" />
            </ScrollView>
        </Screen>
    );
}

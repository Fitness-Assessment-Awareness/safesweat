import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { Button, Image, ScrollView, Separator, View, XStack, YStack } from 'tamagui';
import { LottieAssets } from '../../../assets/lottie';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { Screen } from '../../../components/Screen';
import { WorkoutAssets } from '../assets';
import { WorkoutExerciseDetailsSheet } from '../components/WorkoutExerciseDetailsSheet';

export function WorkoutPlanDetailsScreen() {
    const [open, setOpen] = useState(false);

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
                    <Button
                        borderRadius="$8"
                        themeInverse
                    >
                        History
                    </Button>
                </XStack>
                <Separator borderColor="#D0D3D8" />
                <XStack
                    p="$2"
                    onPress={() => {
                        setOpen(true);
                    }}
                >
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
                        <Paragraph size="large">x5</Paragraph>
                    </YStack>
                </XStack>
                <Separator borderColor="#D0D3D8" />
            </ScrollView>
            <WorkoutExerciseDetailsSheet
                open={open}
                onOpenChange={setOpen}
                lottieSource={LottieAssets.jumpingJack}
                title="JUMPING JACKS"
                duration={20}
                instructions={
                    'Start with your feet together and your arms by your sides, then jump up with your feet apart and your hands overhead.\n\nReturn to the start position then do the next rep. This exercise provides a full-body workout and works all your large muscle groups.'
                }
                focusAreas={['Shoulders', 'Quadriceps', 'Chest', 'Adductors', 'Glutes', 'Calves']}
                commonMistakes={[
                    {
                        title: 'Landing too hard',
                        description:
                            'When you jump in the air and come down, you are putting too much impact or pressure on your feet, ankles, knees or other joints, this can lead to discomfort or injury. Try to land on the balls of your feet rather than your heels. It absorbs more shock.',
                    },
                    {
                        title: 'Not keeping the knees bent',
                        description: 'Failing to keep the knees bent can cause the exercise to be less effective.',
                    },
                    {
                        title: 'Not engaging the core',
                        description:
                            'It requires the core muscles to be engaged throughout the exercise. If the core is not engaged, it can lead to poor form and an ineffective workout.',
                    },
                ]}
                breathingTips={[
                    'Inhale as you jump your feet apart.',
                    'Exhale as you jump your feet back together.',
                    'Take deep breaths to fully oxygenate your body.',
                ]}
            />
        </Screen>
    );
}

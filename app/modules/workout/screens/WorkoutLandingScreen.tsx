import { Pencil } from '@tamagui/lucide-icons';
import React from 'react';
import { Card, Circle, ScrollView, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { Screen } from '../../../components/Screen';
import { WorkoutAssets } from '../assets';
import { WorkoutLandingTabs } from '../components/WorkoutLandingTabs';
import { WorkoutPlanCard } from '../components/WorkoutPlanCard';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';

export function WorkoutLandingScreen() {
    const daysInWeek: number[] = [6, 7, 8, 9, 10, 11, 12];

    const navigation = useWorkoutNavigation<'WorkoutLanding'>();

    return (
        <Screen>
            <ScrollView
                contentContainerStyle={{
                    px: '$3',
                    py: '$8',
                    rowGap: '$4',
                }}
            >
                <XStack justifyContent="space-evenly">
                    <YStack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Heading>2</Heading>
                        <Paragraph>Workout</Paragraph>
                    </YStack>
                    <YStack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Heading>0</Heading>
                        <Paragraph>KCAL</Paragraph>
                    </YStack>
                    <YStack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Heading>0</Heading>
                        <Paragraph>MINUTE</Paragraph>
                    </YStack>
                </XStack>
                <Card
                    backgroundColor="#E7EBFB"
                    p="$4"
                    borderRadius="$8"
                    rowGap="$3"
                >
                    <XStack justifyContent="space-between">
                        <XStack
                            alignItems="center"
                            columnGap="$2"
                        >
                            <Label>Weekly Target</Label>
                            <Pencil
                                color="black"
                                size="$1"
                            />
                        </XStack>
                        <Label color="$green10">2/3</Label>
                    </XStack>
                    <XStack
                        justifyContent="space-evenly"
                        columnGap="$4"
                    >
                        {daysInWeek.map((day) => (
                            <Circle
                                key={day}
                                size="$4"
                                backgroundColor="#DCE0EC"
                            >
                                <Heading size="small">{day}</Heading>
                            </Circle>
                        ))}
                    </XStack>
                </Card>
                <WorkoutLandingTabs tabs={['beginner', 'intermediate', 'advanced']}>
                    <WorkoutLandingTabs.Content
                        selectedTab="beginner"
                        rowGap="$4"
                    >
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                            onPress={() => {
                                navigation.navigate('WorkoutPlanDetails', { workoutKey: 'absBeginner' });
                            }}
                        />
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                    </WorkoutLandingTabs.Content>
                    <WorkoutLandingTabs.Content
                        selectedTab="intermediate"
                        rowGap="$4"
                    >
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                    </WorkoutLandingTabs.Content>
                    <WorkoutLandingTabs.Content
                        selectedTab="advanced"
                        rowGap="$4"
                    >
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                    </WorkoutLandingTabs.Content>
                </WorkoutLandingTabs>
            </ScrollView>
        </Screen>
    );
}

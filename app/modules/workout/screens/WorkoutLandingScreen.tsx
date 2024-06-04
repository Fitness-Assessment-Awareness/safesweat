import { Pencil } from '@tamagui/lucide-icons';
import React from 'react';
import { Card, Circle, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { Screen } from '../../../components/Screen';

export function WorkoutLandingScreen() {
    const daysInWeek: number[] = [6, 7, 8, 9, 10, 11, 12];
    return (
        <Screen
            px="$3"
            py="$8"
            rowGap="$4"
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
                            size="$4"
                            backgroundColor="#DCE0EC"
                        >
                            <Heading size="small">{day}</Heading>
                        </Circle>
                    ))}
                </XStack>
            </Card>
        </Screen>
    );
}

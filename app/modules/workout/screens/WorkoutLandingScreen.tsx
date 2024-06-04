import { Pencil } from '@tamagui/lucide-icons';
import React from 'react';
import { Card, Circle, Image, Tabs, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { Screen } from '../../../components/Screen';
import { WorkoutAssets } from '../assets';

type TabsValue = 'beginner' | 'intermediate' | 'advanced';

export function WorkoutLandingScreen() {
    const [selectedTab, setSelectedTab] = React.useState<TabsValue>('beginner');
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
                            key={day}
                            size="$4"
                            backgroundColor="#DCE0EC"
                        >
                            <Heading size="small">{day}</Heading>
                        </Circle>
                    ))}
                </XStack>
            </Card>
            <Tabs
                value={selectedTab}
                onValueChange={(value) => setSelectedTab(value as TabsValue)}
                flexDirection="column"
                orientation="vertical"
                alignItems="flex-start"
            >
                <Tabs.List
                    flexDirection="row"
                    columnGap="$4"
                >
                    <Tabs.Tab
                        value="beginner"
                        unstyled
                    >
                        <Label
                            size="large"
                            textDecorationLine={selectedTab === 'beginner' ? 'underline' : 'none'}
                        >
                            Beginner
                        </Label>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="intermediate"
                        unstyled
                    >
                        <Label
                            size="large"
                            textDecorationLine={selectedTab === 'intermediate' ? 'underline' : 'none'}
                        >
                            Intermediate
                        </Label>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="advanced"
                        unstyled
                    >
                        <Label
                            size="large"
                            textDecorationLine={selectedTab === 'advanced' ? 'underline' : 'none'}
                        >
                            Advanced
                        </Label>
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Content value="beginner">
                    <Card
                        elevate
                        overflow="hidden"
                    >
                        <Card.Footer>
                            <Label
                                size="large"
                                color="white"
                            >
                                Workout Beginner
                            </Label>
                        </Card.Footer>
                        <Card.Background>
                            <Image
                                objectFit="cover"
                                alignSelf="center"
                                style={{ width: '100%', height: '100%' }}
                                source={WorkoutAssets.workoutBeginner}
                            />
                        </Card.Background>
                    </Card>
                </Tabs.Content>
                <Tabs.Content value="intermediate">
                    <Label>Intermediate</Label>
                </Tabs.Content>
                <Tabs.Content value="advanced">
                    <Label>Advanced</Label>
                </Tabs.Content>
            </Tabs>
        </Screen>
    );
}

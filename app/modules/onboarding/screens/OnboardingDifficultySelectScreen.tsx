import { Fragment, useState } from 'react';
import { Pressable } from 'react-native';
import { Button, Progress, ScrollView, View, YStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useOnboardingNavigation } from '../navigation/useOnboardingNavigation';

export enum Difficulty {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced',
}

const DIFFICULTY_DETAILS = [
    {
        label: Difficulty.Beginner,
        description: '1-3 push-ups',
    },
    {
        label: Difficulty.Intermediate,
        description: '4-6 push-ups',
    },
    {
        label: Difficulty.Advanced,
        description: '7-9 push-ups',
    },
] as const;

export function OnboardingDifficultySelectScreen() {
    const navigation = useOnboardingNavigation<'OnboardingDifficultySelect'>();
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

    return (
        <View flex={1}>
            <Progress
                m="$4"
                size="$1"
                value={60}
                alignSelf="center"
                width="30%"
            >
                <Progress.Indicator
                    backgroundColor="darkblue"
                    animation="bouncy"
                />
            </Progress>
            <ScrollView flex={1}>
                <YStack
                    alignItems="center"
                    p="$4"
                >
                    <Heading alignSelf="center">How many push-ups can you do at one time?</Heading>
                    <YStack
                        pt="$8"
                        gap="$5"
                        width="90%"
                    >
                        {DIFFICULTY_DETAILS.map((detail) => (
                            <Fragment key={detail.label}>
                                <Pressable
                                    onPress={() => {
                                        setDifficulty(detail.label as Difficulty);
                                    }}
                                >
                                    <Chip
                                        height="$6"
                                        borderRadius="$4"
                                        backgroundColor={difficulty === detail.label ? '$gray6' : 'white'}
                                        borderStyle="solid"
                                        borderColor="$gray5"
                                        borderWidth={1}
                                        alignItems="flex-start"
                                    >
                                        <Label
                                            fontWeight="bold"
                                            size="large"
                                        >
                                            {`${detail.label}\n${detail.description}`}
                                        </Label>
                                    </Chip>
                                </Pressable>
                            </Fragment>
                        ))}
                    </YStack>
                </YStack>
            </ScrollView>
            <Button
                backgroundColor="darkblue"
                pressStyle={{ backgroundColor: '$blue11' }}
                disabledStyle={{ backgroundColor: '$blue7' }}
                color="white"
                m="$4"
                borderRadius="$8"
                onPress={() => {
                    navigation.navigate('OnboardingHealthProbSelect');
                }}
                disabled={difficulty === null}
            >
                Next
            </Button>
        </View>
    );
}

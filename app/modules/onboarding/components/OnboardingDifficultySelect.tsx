import { Fragment } from 'react';
import { Pressable } from 'react-native';
import { YStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';

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

interface ComponentProps {
    difficulty: Difficulty | null;
    setDifficulty: (d: Difficulty) => void;
}

export function OnboardingDifficultySelect({ difficulty, setDifficulty }: ComponentProps) {
    return (
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
    );
}

import { Fragment } from 'react';
import { Pressable } from 'react-native';
import { YStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';

export enum FocusArea {
    FullBody = 'Full Body',
    Arm = 'Arm',
    Abs = 'Abs',
    Butt = 'Butt',
    Leg = 'Leg',
}

interface ComponentProps {
    focusAreas: FocusArea[];
    setFocusAreas: (f: FocusArea[]) => void;
}

export function OnboardingFocusAreaSelect({ focusAreas, setFocusAreas }: ComponentProps) {
    return (
        <YStack
            alignItems="center"
            p="$4"
        >
            <Heading alignSelf="center">Choose your focus area</Heading>
            <YStack
                pt="$8"
                gap="$5"
                width="90%"
            >
                {Object.values(FocusArea).map((focusArea) => (
                    <Fragment key={focusArea}>
                        <Pressable
                            onPress={() => {
                                if (focusAreas.includes(focusArea)) {
                                    setFocusAreas(focusAreas.filter((f) => f !== focusArea));
                                } else {
                                    setFocusAreas([...focusAreas, focusArea]);
                                }
                            }}
                        >
                            <Chip
                                height="$6"
                                borderRadius="$4"
                                backgroundColor={focusAreas.includes(focusArea as FocusArea) ? '$gray6' : 'white'}
                                borderStyle="solid"
                                borderColor="$gray5"
                                borderWidth={1}
                            >
                                <Label
                                    fontWeight="bold"
                                    size="large"
                                >
                                    {focusArea}
                                </Label>
                            </Chip>
                        </Pressable>
                    </Fragment>
                ))}
            </YStack>
        </YStack>
    );
}

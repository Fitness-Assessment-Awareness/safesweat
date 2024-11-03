import { XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Paragraph } from '../../../components/Paragraph';

export function WorkoutPersonalInfoCard() {
    return (
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
    );
}

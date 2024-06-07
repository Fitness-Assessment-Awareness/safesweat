import LottieView, { AnimationObject } from 'lottie-react-native';
import React from 'react';
import { XStack, YStack } from 'tamagui';
import { Label } from '../../../components/Label';
import { ExerciseKey } from '../../workout/data/exercises';

interface ComponentProps {
    value: ExerciseKey;
    title: string;
    lottieSource: AnimationObject;
    onValueChange: (value: ExerciseKey) => void;
}

export function CatalogueExerciseOverview({ value, title, lottieSource, onValueChange }: ComponentProps) {
    return (
        <XStack
            p="$2"
            onPress={() => {
                onValueChange(value);
            }}
        >
            <LottieView
                source={lottieSource}
                style={{ width: 100, height: 80 }}
                autoPlay
                loop
                speed={1.5}
            />
            <YStack
                flex={1}
                p="$4"
                justifyContent="center"
            >
                <Label size="large">{title}</Label>
            </YStack>
        </XStack>
    );
}

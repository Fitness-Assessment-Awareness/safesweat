import dayjs from 'dayjs';
import LottieView, { AnimationObject } from 'lottie-react-native';
import React from 'react';
import { XStack, YStack } from 'tamagui';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { ExerciseKey } from '../data/exercises';

interface BaseComponentProps {
    value: ExerciseKey;
    title: string;
    lottieSource: AnimationObject;
    onValueChange: (value: ExerciseKey) => void;
}

interface DurationComponentProps extends BaseComponentProps {
    type: 'duration';
    duration: number;
}

interface RepsComponentProps extends BaseComponentProps {
    type: 'reps';
    reps: number;
}

type ComponentProps = DurationComponentProps | RepsComponentProps;

export function WorkoutExerciseOverview({ value, title, lottieSource, onValueChange, ...props }: ComponentProps) {
    return (
        <XStack
            p="$2"
            onPress={() => {
                onValueChange(value);
            }}
        >
            <LottieView
                source={lottieSource}
                style={{ width: 100, height: '100%' }}
                autoPlay
                loop
                speed={1.5}
            />
            <YStack
                flex={1}
                p="$4"
            >
                <Label size="large">{title}</Label>
                {/* TODO: Use dayjs to parse duration */}
                <Paragraph size="large">
                    {props.type === 'duration'
                        ? dayjs.duration(props.duration, 'seconds').format('mm:ss')
                        : `x${props.reps.toFixed(0)}`}
                </Paragraph>
            </YStack>
        </XStack>
    );
}

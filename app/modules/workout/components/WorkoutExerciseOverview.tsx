import LottieView, { AnimationObject } from 'lottie-react-native';
import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import { XStack, YStack } from 'tamagui';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { ExerciseKey } from '../data/exercises';

interface WorkoutExerciseOverviewContext {
    onValueChange: (value: ExerciseKey) => void;
}

interface WorkoutExerciseOverviewGroupProps extends WorkoutExerciseOverviewContext {
    children: ReactNode;
}

const Context = createContext<WorkoutExerciseOverviewContext>({ onValueChange: () => {} });

function WorkoutExerciseOverviewGroup({ onValueChange, children }: WorkoutExerciseOverviewGroupProps) {
    const value = useMemo(
        () => ({
            onValueChange,
        }),
        [onValueChange],
    );

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

interface BaseComponentProps {
    value: ExerciseKey;
    title: string;
    lottieSource: AnimationObject;
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

export function WorkoutExerciseOverview({ value, title, lottieSource, ...props }: ComponentProps) {
    const { onValueChange } = useContext(Context);

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
                    {props.type === 'duration' ? `0:${props.duration}` : `x${props.reps}`}
                </Paragraph>
            </YStack>
        </XStack>
    );
}

WorkoutExerciseOverview.Group = WorkoutExerciseOverviewGroup;

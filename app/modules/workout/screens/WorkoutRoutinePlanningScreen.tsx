import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Select, View, XStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Paragraph } from '../../../components/Paragraph';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';

export function WorkoutRoutinePlanningScreen() {
    const { t } = useTranslation();
    const { workoutProfile, updateWorkoutProfile } = useWorkoutProfile();
    const [selectedDay, setSelectedDay] = useState<number | null>(workoutProfile.weeklyGoal);
    const { pop } = useWorkoutNavigation();

    const daysInWeek: number[] = [1, 2, 3, 4, 5, 6, 7];

    return (
        <View flex={1}>
            <View
                alignItems="center"
                padding="$4"
                rowGap="$6"
                flex={1}
            >
                <Heading>{t('workout.routine.planning.set.weekly.goal')}</Heading>
                <View
                    alignItems="center"
                    rowGap="$3"
                >
                    <Paragraph size="large">🎯 {t('workout.routine.planning.weekly.training.days')}</Paragraph>
                    <XStack
                        flexWrap="wrap"
                        justifyContent="center"
                        rowGap="$3"
                        columnGap="$3.5"
                    >
                        {daysInWeek.map((day) => (
                            <DayButton
                                key={day}
                                day={day}
                                isSelected={selectedDay === day}
                                setIsSelected={() => {
                                    setSelectedDay(day === selectedDay ? null : day);
                                }}
                            />
                        ))}
                    </XStack>
                </View>
                <Select />
            </View>
            <Button
                themeInverse
                m="$4"
                borderRadius="$8"
                onPress={() => {
                    updateWorkoutProfile({
                        weeklyGoal: selectedDay,
                    });
                    pop();
                }}
            >
                {t('general.shared.save')}
            </Button>
        </View>
    );
}

interface DayButtonProps {
    day: number;
    isSelected: boolean;
    setIsSelected: (day: number) => void;
}

function DayButton({ day, isSelected, setIsSelected }: DayButtonProps) {
    return (
        <View
            justifyContent="center"
            alignItems="center"
            width="$8"
            height="$6"
            borderCurve="continuous"
            borderRadius="$6"
            borderWidth="$1"
            borderColor={isSelected ? '$blue11' : '$gray6'}
            backgroundColor={isSelected ? '$blue11' : 'transparent'}
            onPress={() => setIsSelected(day)}
        >
            <Heading color={isSelected ? 'white' : undefined}>{day}</Heading>
        </View>
    );
}

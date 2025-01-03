import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { Button, Image, View, XStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { Screen } from '../../../components/Screen';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { useRootNavigation } from '../../../navigation/useAppNavigation';
import { WorkoutAssets } from '../assets';

export function WorkoutOnlinecSuccessScreen() {
    const { t } = useTranslation();
    const [rating, setRating] = useState<number>(2);
    const { workoutProfile, setWorkoutProfile } = useWorkoutProfile();
    const { reset } = useRootNavigation();

    const assets = [WorkoutAssets.tooHard, WorkoutAssets.justRight, WorkoutAssets.tooEasy];
    const label = [
        t('success.rating.too_hard', { ns: 'workout' }),
        t('success.rating.just_right', { ns: 'workout' }),
        t('success.rating.too_easy', { ns: 'workout' }),
    ];

    return (
        <Screen flex={1}>
            <StatusBar
                style="dark"
                animated
            />
            <View
                flex={1}
                justifyContent="center"
                alignItems="center"
                rowGap="$4"
            >
                <Heading
                    size="x-large"
                    textAlign="center"
                >
                    {t('workout.success.workout.completed').toUpperCase()}
                </Heading>
                <XStack columnGap="$4">
                    {assets.map((asset, index) => (
                        <Pressable onPress={() => setRating(index + 1)}>
                            <Image
                                source={asset}
                                width={80}
                                height={80}
                                position="absolute"
                                tintColor="gray"
                            />
                            <Image
                                source={asset}
                                width={80}
                                height={80}
                                opacity={rating === index + 1 ? 1 : 0.4}
                            />
                            <Paragraph
                                size="small"
                                alignSelf="center"
                            >
                                {label[index]}
                            </Paragraph>
                        </Pressable>
                    ))}
                </XStack>
                <Label size="large">{t('success.rate', { ns: 'workout' })}</Label>
            </View>
            <Button
                themeInverse
                m="$4"
                borderRadius="$8"
                onPress={() => {
                    const prevWorkoutHistories = workoutProfile.workoutHistories;
                    const [lastWorkoutHistory, ...otherWorkoutHistories] = prevWorkoutHistories;
                    setWorkoutProfile({
                        ...workoutProfile,
                        workoutHistories: [
                            {
                                ...lastWorkoutHistory,
                                rating,
                            },
                            ...otherWorkoutHistories,
                        ],
                    });
                    reset({
                        index: 0,
                        routes: [
                            {
                                name: 'HomeTab',
                                params: { screen: 'WorkoutStack', params: { screen: 'WorkoutLanding' } },
                            },
                        ],
                    });
                }}
            >
                {t('general.shared.finish')}
            </Button>
        </Screen>
    );
}

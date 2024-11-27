import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { Button, Image, Progress, ScrollView, View, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { OnboardingAssets } from '../assets';
import { Gender } from '../data/entities/Gender';
import { useOnboardingNavigation } from '../navigation/useOnboardingNavigation';

export function OnboardingGenderSelectScreen() {
    const { t } = useTranslation();
    const { workoutProfile, setWorkoutProfile } = useWorkoutProfile();
    const navigation = useOnboardingNavigation<'OnboardingGenderSelect'>();

    return (
        <View flex={1}>
            <Progress
                m="$4"
                size="$1"
                value={20}
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
                    <Heading alignSelf="center">{t('onboarding.gender.choose.gender')}</Heading>
                    <Label
                        p="$2"
                        fontWeight="normal"
                    >
                        {t('onboarding.shared.know.you.better')}
                    </Label>
                    <XStack
                        alignItems="center"
                        justifyContent="center"
                        p="$4"
                        mt="$6"
                        gap="$4"
                    >
                        <Pressable
                            onPress={() => {
                                setWorkoutProfile({ ...workoutProfile, gender: Gender.Male });
                            }}
                        >
                            <Image
                                style={
                                    workoutProfile.gender !== Gender.Male && {
                                        opacity: 0.5,
                                        height: '70%',
                                    }
                                }
                                objectFit="contain"
                                source={OnboardingAssets.male}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                setWorkoutProfile({ ...workoutProfile, gender: Gender.Female });
                            }}
                        >
                            <Image
                                style={
                                    workoutProfile.gender !== Gender.Female && {
                                        opacity: 0.5,
                                        height: '70%',
                                    }
                                }
                                objectFit="contain"
                                source={OnboardingAssets.female}
                            />
                        </Pressable>
                    </XStack>
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
                    navigation.navigate('OnboardingFocusAreaSelect');
                }}
            >
                {t('general.shared.next')}
            </Button>
        </View>
    );
}

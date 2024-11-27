import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { Button, Progress, ScrollView, View, YStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { Difficulty } from '../data/entities/Difficulty';
import { useOnboardingNavigation } from '../navigation/useOnboardingNavigation';

export function OnboardingDifficultySelectScreen() {
    const { t } = useTranslation();
    const DIFFICULTY_DETAILS = [
        {
            key: Difficulty.Beginner,
            label: t('general.shared.beginner'),
            description: `1-3 ${t('onboarding.difficulty.push.ups').toLowerCase()}`,
        },
        {
            key: Difficulty.Intermediate,
            label: t('general.shared.intermediate'),
            description: `4-6 ${t('onboarding.difficulty.push.ups').toLowerCase()}`,
        },
        {
            key: Difficulty.Advanced,
            label: t('general.shared.advanced'),
            description: `7-9 ${t('onboarding.difficulty.push.ups').toLowerCase()}`,
        },
    ] as const;
    const { workoutProfile, setWorkoutProfile } = useWorkoutProfile();
    const navigation = useOnboardingNavigation<'OnboardingDifficultySelect'>();

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
                    <Heading alignSelf="center">{t('onboarding.difficulty.how.many.push.ups.can.do')}</Heading>
                    <YStack
                        pt="$8"
                        gap="$5"
                        width="90%"
                    >
                        {DIFFICULTY_DETAILS.map((detail) => (
                            <Fragment key={detail.label}>
                                <Pressable
                                    onPress={() => {
                                        setWorkoutProfile({ ...workoutProfile, difficulty: detail.key });
                                    }}
                                >
                                    <Chip
                                        height="$6"
                                        borderRadius="$4"
                                        backgroundColor={workoutProfile.difficulty === detail.key ? '$gray6' : 'white'}
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
                disabled={workoutProfile.difficulty === Difficulty.NONE}
            >
                {t('general.shared.next')}
            </Button>
        </View>
    );
}

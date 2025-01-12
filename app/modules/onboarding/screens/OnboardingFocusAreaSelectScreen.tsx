import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, getTokenValue, Progress, ScrollView, View, YStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { FocusArea } from '../data/entities/FocusArea';
import { useOnboardingNavigation } from '../navigation/useOnboardingNavigation';

export function OnboardingFocusAreaSelectScreen() {
    const { t } = useTranslation();
    const { workoutProfile, setWorkoutProfile } = useWorkoutProfile();
    const navigation = useOnboardingNavigation<'OnboardingFocusAreaSelect'>();
    const { bottom } = useSafeAreaInsets();

    const getFocusAreaLabel = (focusArea: FocusArea) => {
        switch (focusArea) {
            case FocusArea.FullBody:
                return t('general.shared.fullbody');
            case FocusArea.Arm:
                return t('general.shared.arm');
            case FocusArea.Abs:
                return t('general.shared.abs');
            case FocusArea.Butt:
                return t('general.shared.butt');
            case FocusArea.Leg:
                return t('general.shared.leg');
            default:
                return '';
        }
    };

    return (
        <View flex={1}>
            <Progress
                m="$4"
                size="$1"
                value={40}
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
                    <Heading alignSelf="center">{t('onboarding.focus.area.choose.area')}</Heading>
                    <YStack
                        pt="$8"
                        gap="$5"
                        width="90%"
                    >
                        {Object.values(FocusArea).map((focusArea) => (
                            <Fragment key={focusArea}>
                                <Pressable
                                    onPress={() => {
                                        if (workoutProfile.focusAreas.includes(focusArea)) {
                                            setWorkoutProfile({
                                                ...workoutProfile,
                                                focusAreas: workoutProfile.focusAreas.filter((f) => f !== focusArea),
                                            });
                                        } else {
                                            setWorkoutProfile({
                                                ...workoutProfile,
                                                focusAreas: [...workoutProfile.focusAreas, focusArea],
                                            });
                                        }
                                    }}
                                >
                                    <Chip
                                        height="$6"
                                        borderRadius="$4"
                                        backgroundColor={
                                            workoutProfile.focusAreas.includes(focusArea as FocusArea)
                                                ? '$gray6'
                                                : 'white'
                                        }
                                        borderStyle="solid"
                                        borderColor="$gray5"
                                        borderWidth={1}
                                    >
                                        <Label
                                            fontWeight="bold"
                                            size="large"
                                        >
                                            {getFocusAreaLabel(focusArea)}
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
                mb={Math.max(bottom, getTokenValue('$4'))}
                borderRadius="$8"
                onPress={() => {
                    navigation.navigate('OnboardingDifficultySelect');
                }}
                disabled={workoutProfile.focusAreas.length === 0}
            >
                {t('general.shared.next')}
            </Button>
        </View>
    );
}

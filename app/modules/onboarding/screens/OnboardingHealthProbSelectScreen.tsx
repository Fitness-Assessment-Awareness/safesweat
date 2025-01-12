import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Progress, ScrollView, View, YStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { HealthProblem } from '../data/entities/HealthProblem';
import { useOnboardingNavigation } from '../navigation/useOnboardingNavigation';

export function OnboardingHealthProbSelectScreen() {
    const { t } = useTranslation();
    const { workoutProfile, setWorkoutProfile } = useWorkoutProfile();
    const navigation = useOnboardingNavigation<'OnboardingHealthProbSelect'>();
    const { bottom } = useSafeAreaInsets();

    const getHealthProblemLabel = (healthProblem: HealthProblem) => {
        switch (healthProblem) {
            case HealthProblem.HeartCondition:
                return t('general.shared.heart.conditions');
            case HealthProblem.ChestPainWithPhysicalActivity:
                return t('general.shared.heart.chest.pain.with.physical.activity');
            case HealthProblem.ChestPainWithoutPhysicalActivity:
                return t('general.shared.heart.chest.pain.without.physical.activity');
            case HealthProblem.Dizziness:
                return t('general.shared.heart.dizziness');
            case HealthProblem.BoneOrJointProblem:
                return t('general.shared.heart.bone.or.joint.problem');
            case HealthProblem.UnderBloodPressureDrugs:
                return t('general.shared.heart.under.blood.pressure.drug');
            default:
                return '';
        }
    };

    return (
        <View flex={1}>
            <Progress
                m="$4"
                size="$1"
                value={80}
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
                    <Heading alignSelf="center">{t('onboarding.health.problem.recent.health.consequences')}</Heading>
                    <YStack
                        pt="$8"
                        gap="$5"
                        width="90%"
                    >
                        {Object.values(HealthProblem).map((problem) => (
                            <Fragment key={problem}>
                                <Pressable
                                    onPress={() => {
                                        if (workoutProfile.healthProblems.includes(problem)) {
                                            setWorkoutProfile({
                                                ...workoutProfile,
                                                healthProblems: workoutProfile.healthProblems.filter(
                                                    (h) => h !== problem,
                                                ),
                                            });
                                        } else {
                                            setWorkoutProfile({
                                                ...workoutProfile,
                                                healthProblems: [...workoutProfile.healthProblems, problem],
                                            });
                                        }
                                    }}
                                >
                                    <Chip
                                        height="$6"
                                        borderRadius="$4"
                                        backgroundColor={
                                            workoutProfile.healthProblems.includes(problem) ? '$gray6' : 'white'
                                        }
                                        borderStyle="solid"
                                        borderColor="$gray5"
                                        borderWidth={1}
                                        alignItems="flex-start"
                                    >
                                        <Label
                                            fontWeight="bold"
                                            size="large"
                                        >
                                            {getHealthProblemLabel(problem)}
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
                mb={bottom}
                borderRadius="$8"
                onPress={() => {
                    navigation.navigate('OnboardingBodyInfoSelect');
                }}
            >
                {t('general.shared.next')}
            </Button>
        </View>
    );
}

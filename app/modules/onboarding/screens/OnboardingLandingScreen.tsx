import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Progress, ScrollView, YStack } from 'tamagui';
import { HeaderBackButton } from '../../../components/HeaderBackButton';
import { useRootNavigation } from '../../../navigation/useAppNavigation';
import { OnboardingBodyInfoSelect } from '../components/OnboardingBodyInfoSelect';
import { Difficulty, OnboardingDifficultySelect } from '../components/OnboardingDifficultySelect';
import { FocusArea, OnboardingFocusAreaSelect } from '../components/OnboardingFocusAreaSelect';
import { Gender, OnboardingGenderSelect } from '../components/OnboardingGenderSelect';
import { HealthProblem, OnboardingHealthProbSelect } from '../components/OnboardingHealthProbSelect';

const ONBOARDING_PROGRESS_STEPS = {
    GENDER_SELECT: 20,
    FOCUS_AREA_SELECT: 40,
    DIFFICULTY_SELECT: 60,
    HEALTH_PROBLEM_SELECT: 80,
    BODY_INFO_SELECT: 100,
};

export function OnboardingLandingScreen() {
    const [gender, setGender] = useState<Gender>(Gender.Male);
    const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [healthProblems, setHealthProblems] = useState<HealthProblem[]>([]);
    const [height, setHeight] = useState(160);
    const [weight, setWeight] = useState(50);
    const [progress, setProgress] = useState(20);
    const { navigate } = useRootNavigation();

    const onPressNext = () => {
        if (progress === ONBOARDING_PROGRESS_STEPS.GENDER_SELECT) {
            setProgress(ONBOARDING_PROGRESS_STEPS.FOCUS_AREA_SELECT);
        } else if (progress === ONBOARDING_PROGRESS_STEPS.FOCUS_AREA_SELECT) {
            setProgress(ONBOARDING_PROGRESS_STEPS.DIFFICULTY_SELECT);
        } else if (progress === ONBOARDING_PROGRESS_STEPS.DIFFICULTY_SELECT) {
            setProgress(ONBOARDING_PROGRESS_STEPS.HEALTH_PROBLEM_SELECT);
        } else if (progress === ONBOARDING_PROGRESS_STEPS.HEALTH_PROBLEM_SELECT) {
            setProgress(ONBOARDING_PROGRESS_STEPS.BODY_INFO_SELECT);
        } else if (progress === ONBOARDING_PROGRESS_STEPS.BODY_INFO_SELECT) {
            navigate('HomeTab', { screen: 'WorkoutStack', params: { screen: 'WorkoutLanding' } });
        }
    };

    const onPressBack = () => {
        if (progress === ONBOARDING_PROGRESS_STEPS.FOCUS_AREA_SELECT) {
            setProgress(ONBOARDING_PROGRESS_STEPS.GENDER_SELECT);
        } else if (progress === ONBOARDING_PROGRESS_STEPS.DIFFICULTY_SELECT) {
            setProgress(ONBOARDING_PROGRESS_STEPS.FOCUS_AREA_SELECT);
        } else if (progress === ONBOARDING_PROGRESS_STEPS.HEALTH_PROBLEM_SELECT) {
            setProgress(ONBOARDING_PROGRESS_STEPS.DIFFICULTY_SELECT);
        } else if (progress === ONBOARDING_PROGRESS_STEPS.BODY_INFO_SELECT) {
            setProgress(ONBOARDING_PROGRESS_STEPS.HEALTH_PROBLEM_SELECT);
        }
    };

    const isDisabled = (): boolean => {
        if (progress === ONBOARDING_PROGRESS_STEPS.GENDER_SELECT) {
            return gender === null;
        }
        if (progress === ONBOARDING_PROGRESS_STEPS.FOCUS_AREA_SELECT) {
            return focusAreas.length === 0;
        }
        if (progress === ONBOARDING_PROGRESS_STEPS.DIFFICULTY_SELECT) {
            return difficulty === null;
        }
        if (progress === ONBOARDING_PROGRESS_STEPS.HEALTH_PROBLEM_SELECT) {
            return healthProblems.length === 0;
        }
        return false;
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <YStack
                    px="$4"
                    justifyContent="space-between"
                >
                    <YStack>
                        <HeaderBackButton
                            canGoBack={progress > ONBOARDING_PROGRESS_STEPS.GENDER_SELECT}
                            onPress={onPressBack}
                        />
                        <Progress
                            size="$1"
                            value={progress}
                            alignSelf="center"
                            width="30%"
                        >
                            <Progress.Indicator
                                backgroundColor="darkblue"
                                animation="bouncy"
                            />
                        </Progress>
                        {progress === ONBOARDING_PROGRESS_STEPS.GENDER_SELECT && (
                            <OnboardingGenderSelect
                                gender={gender}
                                setGender={setGender}
                            />
                        )}
                        {progress === ONBOARDING_PROGRESS_STEPS.FOCUS_AREA_SELECT && (
                            <OnboardingFocusAreaSelect
                                focusAreas={focusAreas}
                                setFocusAreas={setFocusAreas}
                            />
                        )}
                        {progress === ONBOARDING_PROGRESS_STEPS.DIFFICULTY_SELECT && (
                            <OnboardingDifficultySelect
                                difficulty={difficulty}
                                setDifficulty={setDifficulty}
                            />
                        )}
                        {progress === ONBOARDING_PROGRESS_STEPS.HEALTH_PROBLEM_SELECT && (
                            <OnboardingHealthProbSelect
                                healthProblems={healthProblems}
                                setHealthProblems={setHealthProblems}
                            />
                        )}
                        {progress === ONBOARDING_PROGRESS_STEPS.BODY_INFO_SELECT && (
                            <OnboardingBodyInfoSelect
                                height={height}
                                weight={weight}
                                setHeight={setHeight}
                                setWeight={setWeight}
                            />
                        )}
                    </YStack>
                    <Button
                        backgroundColor="darkblue"
                        pressStyle={{ backgroundColor: '$blue11' }}
                        disabledStyle={{ backgroundColor: '$blue7' }}
                        color="white"
                        m="$4"
                        borderRadius="$8"
                        onPress={onPressNext}
                        disabled={isDisabled()}
                    >
                        {progress === ONBOARDING_PROGRESS_STEPS.BODY_INFO_SELECT ? 'Get my plan' : 'Next'}
                    </Button>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    );
}

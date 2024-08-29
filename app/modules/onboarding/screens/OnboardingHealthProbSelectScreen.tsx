import { Fragment, useState } from 'react';
import { Pressable } from 'react-native';
import { Button, Progress, ScrollView, View, YStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useOnboardingNavigation } from '../navigation/useOnboardingNavigation';

export enum HealthProblem {
    HeartCondition = 'Heart Condition',
    ChestPainWithPhysicalActivity = 'Chest Pain with Physical Activity',
    ChestPainWithoutPhysicalActivity = 'Chest Pain without Physical Activity',
    Dizziness = 'Dizziness',
    BoneOrJointProblem = 'Bone/Joint Problem',
    UnderBloodPressureDrugs = 'Under Blood Pressure Drugs',
    None = 'None',
}

export function OnboardingHealthProbSelectScreen() {
    const navigation = useOnboardingNavigation<'OnboardingHealthProbSelect'>();
    const [healthProblems, setHealthProblems] = useState<HealthProblem[]>([]);

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
                    <Heading alignSelf="center">Do you have any recent health consequences?</Heading>
                    <YStack
                        pt="$8"
                        gap="$5"
                        width="90%"
                    >
                        {Object.values(HealthProblem).map((problem) => (
                            <Fragment key={problem}>
                                <Pressable
                                    onPress={() => {
                                        if (healthProblems.includes(problem)) {
                                            setHealthProblems(healthProblems.filter((h) => h !== problem));
                                        } else {
                                            setHealthProblems([...healthProblems, problem]);
                                        }
                                    }}
                                >
                                    <Chip
                                        height="$6"
                                        borderRadius="$4"
                                        backgroundColor={healthProblems.includes(problem) ? '$gray6' : 'white'}
                                        borderStyle="solid"
                                        borderColor="$gray5"
                                        borderWidth={1}
                                        alignItems="flex-start"
                                    >
                                        <Label
                                            fontWeight="bold"
                                            size="large"
                                        >
                                            {problem}
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
                    navigation.navigate('OnboardingBodyInfoSelect');
                }}
                disabled={healthProblems.length === 0}
            >
                Next
            </Button>
        </View>
    );
}

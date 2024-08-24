import { Fragment } from 'react';
import { Pressable } from 'react-native';
import { YStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';

export enum HealthProblem {
    HeartCondition = 'Heart Condition',
    ChestPainWithPhysicalActivity = 'Chest Pain with Physical Activity',
    ChestPainWithoutPhysicalActivity = 'Chest Pain without Physical Activity',
    Dizziness = 'Dizziness',
    BoneOrJointProblem = 'Bone/Joint Problem',
    UnderBloodPressureDrugs = 'Under Blood Pressure Drugs',
    None = 'None',
}

interface ComponentProps {
    healthProblems: HealthProblem[];
    setHealthProblems: (h: HealthProblem[]) => void;
}

export function OnboardingHealthProbSelect({ healthProblems, setHealthProblems }: ComponentProps) {
    return (
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
    );
}

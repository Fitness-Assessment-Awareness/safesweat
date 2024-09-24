import { Fragment } from 'react';
import { Pressable } from 'react-native';
import { Button, Progress, ScrollView, View, YStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useUser } from '../../../context/UserProvider';
import { FocusArea } from '../data/FocusArea';
import { useOnboardingNavigation } from '../navigation/useOnboardingNavigation';

export function OnboardingFocusAreaSelectScreen() {
    const { user, setUser } = useUser();
    const navigation = useOnboardingNavigation<'OnboardingFocusAreaSelect'>();

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
                    <Heading alignSelf="center">Choose your focus area</Heading>
                    <YStack
                        pt="$8"
                        gap="$5"
                        width="90%"
                    >
                        {Object.values(FocusArea).map((focusArea) => (
                            <Fragment key={focusArea}>
                                <Pressable
                                    onPress={() => {
                                        if (user.focusAreas.includes(focusArea)) {
                                            setUser({
                                                ...user,
                                                focusAreas: user.focusAreas.filter((f) => f !== focusArea),
                                            });
                                        } else {
                                            setUser({
                                                ...user,
                                                focusAreas: [...user.focusAreas, focusArea],
                                            });
                                        }
                                    }}
                                >
                                    <Chip
                                        height="$6"
                                        borderRadius="$4"
                                        backgroundColor={
                                            user.focusAreas.includes(focusArea as FocusArea) ? '$gray6' : 'white'
                                        }
                                        borderStyle="solid"
                                        borderColor="$gray5"
                                        borderWidth={1}
                                    >
                                        <Label
                                            fontWeight="bold"
                                            size="large"
                                        >
                                            {focusArea}
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
                    navigation.navigate('OnboardingDifficultySelect');
                }}
                disabled={user.focusAreas.length === 0}
            >
                Next
            </Button>
        </View>
    );
}

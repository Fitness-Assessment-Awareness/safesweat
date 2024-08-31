import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import { Button, Image, Progress, ScrollView, View, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { UserContext } from '../../../context/UserContext';
import { OnboardingAssets } from '../assets';
import { Gender } from '../data/Gender';
import { useOnboardingNavigation } from '../navigation/useOnboardingNavigation';

export function OnboardingGenderSelectScreen() {
    const { user, setUser } = useContext(UserContext)!;
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
                    <Heading alignSelf="center">Choose your gender</Heading>
                    <Label
                        p="$2"
                        fontWeight="normal"
                    >
                        Let us know you better
                    </Label>
                    <XStack
                        width="70%"
                        alignItems="center"
                        justifyContent="center"
                        p="$4"
                    >
                        <Pressable
                            onPress={() => {
                                setUser({ ...user, gender: Gender.Male });
                            }}
                        >
                            <Image
                                style={
                                    user.gender !== Gender.Male && {
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
                                setUser({ ...user, gender: Gender.Female });
                            }}
                        >
                            <Image
                                style={
                                    user.gender !== Gender.Female && {
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
                Next
            </Button>
        </View>
    );
}

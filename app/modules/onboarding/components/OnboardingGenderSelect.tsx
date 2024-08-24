import React from 'react';
import { Pressable } from 'react-native';
import { Image, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { OnboardingAssets } from '../assets';

export enum Gender {
    Male,
    Female,
}

interface ComponentProps {
    gender: Gender;
    setGender: (g: Gender) => void;
}

export function OnboardingGenderSelect({ gender, setGender }: ComponentProps) {
    return (
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
                alignItems="center"
                justifyContent="center"
                p="$4"
            >
                <Pressable
                    onPress={() => {
                        setGender(Gender.Male);
                    }}
                >
                    <Image
                        style={
                            gender !== Gender.Male && {
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
                        setGender(Gender.Female);
                    }}
                >
                    <Image
                        style={
                            gender !== Gender.Female && {
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
    );
}

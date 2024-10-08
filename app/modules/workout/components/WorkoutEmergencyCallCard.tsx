import React from 'react';
import { Linking } from 'react-native';
import SlideButton from 'rn-slide-button-updated';
import { YStack } from 'tamagui';
import { Label } from '../../../components/Label';

interface ComponentProps {
    fullName: string;
    phoneNumber: string;
}

export function WorkoutEmergencyCallCard({ fullName, phoneNumber }: ComponentProps) {
    return (
        <YStack
            p="$4"
            borderRadius="$9"
            backgroundColor="$red11"
        >
            <Label
                size="large"
                color="white"
                textShadowRadius={1}
                textShadowColor="black"
            >
                {fullName}
            </Label>
            <SlideButton
                containerStyle={{
                    backgroundColor: 'black',
                }}
                underlayStyle={{
                    backgroundColor: 'white',
                }}
                titleStyle={{
                    color: 'white',
                }}
                autoReset
                title="Swipe to Call"
                onReachedToEnd={() => {
                    Linking.openURL(`tel:${phoneNumber}`);
                }}
            />
        </YStack>
    );
}

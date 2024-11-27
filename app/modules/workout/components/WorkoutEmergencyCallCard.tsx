import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import SlideButton from 'rn-slide-button-updated';
import { YStack } from 'tamagui';
import { Label } from '../../../components/Label';

interface ComponentProps {
    fullName: string;
    phoneNumber: string;
}

export function WorkoutEmergencyCallCard({ fullName, phoneNumber }: ComponentProps) {
    const { t } = useTranslation();

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
                title={t('workout.emergency.call.swipe.to.call')}
                onReachedToEnd={() => {
                    Linking.openURL(`tel:${phoneNumber}`);
                }}
            />
        </YStack>
    );
}

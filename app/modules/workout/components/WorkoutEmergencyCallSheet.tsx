import React from 'react';
import { useTranslation } from 'react-i18next';
import { YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { useEmergencyContacts } from '../../../context/EmergencyContactProvider';
import { WorkoutEmergencyCallCard } from './WorkoutEmergencyCallCard';

export function WorkoutEmergencyCallSheetContent() {
    const { t } = useTranslation();
    const { emergencyContacts } = useEmergencyContacts();

    return (
        <>
            <Heading m="$4">{t('workout.emergency.call')}</Heading>
            <YStack
                gap="$4"
                my="$3"
                mx="$4"
            >
                {emergencyContacts.map((emergencyContact) => (
                    <WorkoutEmergencyCallCard
                        key={emergencyContact.phoneId}
                        fullName={emergencyContact.fullName}
                        phoneNumber={emergencyContact.phoneNumber}
                    />
                ))}
            </YStack>
        </>
    );
}

import React from 'react';
import { YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { useEmergencyContacts } from '../../../context/EmergencyContactProvider';
import { WorkoutEmergencyCallCard } from './WorkoutEmergencyCallCard';

export function WorkoutEmergencyCallSheetContent() {
    const { emergencyContacts } = useEmergencyContacts();

    return (
        <>
            <Heading m="$4">Emergency Call</Heading>
            <YStack
                gap="$4"
                my="$3"
                mx="$4"
            >
                {emergencyContacts.map((emergencyContact) => (
                    <WorkoutEmergencyCallCard
                        key={emergencyContact.id}
                        fullName={emergencyContact.fullName}
                        phoneNumber={emergencyContact.phoneNumber}
                    />
                ))}
            </YStack>
        </>
    );
}

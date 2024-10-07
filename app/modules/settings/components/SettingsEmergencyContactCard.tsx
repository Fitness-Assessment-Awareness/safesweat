import { Edit3, Trash2 } from '@tamagui/lucide-icons';
import React from 'react';
import { Pressable } from 'react-native';
import { Card, CardProps, Image, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { SettingsAssets } from '../assets';

interface ComponentProps extends CardProps {
    fullName: string;
    phoneNumber: string;
    handleEdit: () => void;
    handleDelete: () => void;
}

export function SettingsEmergencyContactCard({
    fullName,
    phoneNumber,
    handleEdit,
    handleDelete,
    ...cardProps
}: ComponentProps) {
    return (
        <Card
            borderRadius="$9"
            overflow="hidden"
            p="$4"
            pt="$13"
            {...cardProps}
        >
            <Card.Footer flexDirection="column">
                <XStack
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                >
                    <YStack>
                        <Label
                            size="large"
                            color="white"
                            textShadowRadius={1}
                            textShadowColor="black"
                        >
                            {fullName}
                        </Label>
                        <Heading
                            color="white"
                            textShadowRadius={1}
                            textShadowColor="black"
                        >
                            {phoneNumber}
                        </Heading>
                    </YStack>
                    <XStack gap="$5">
                        <Pressable
                            onPress={handleEdit}
                            hitSlop={8}
                        >
                            <Edit3 color="white" />
                        </Pressable>
                        <Pressable
                            onPress={handleDelete}
                            hitSlop={8}
                        >
                            <Trash2 color="red" />
                        </Pressable>
                    </XStack>
                </XStack>
            </Card.Footer>
            <Card.Background opacity={0.8}>
                <Image
                    objectFit="cover"
                    style={{ width: '100%', height: '100%' }}
                    source={SettingsAssets.darkbluebg}
                />
            </Card.Background>
        </Card>
    );
}

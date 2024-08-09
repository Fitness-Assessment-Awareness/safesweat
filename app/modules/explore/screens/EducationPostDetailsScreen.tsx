import { RouteProp } from '@react-navigation/native';
import { Heart, Share2 } from '@tamagui/lucide-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, View, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Paragraph } from '../../../components/Paragraph';
import { Screen } from '../../../components/Screen';

export interface PostDetails {
    thumbnailUrl: string;
    title: string;
    content: string;
    likeCount: number;
    category: string;
    createdBy: string;
    lastUpdatedBy?: string;
}

interface ComponentProps {
    route: RouteProp<{ EducationPostDetails: PostDetails }, 'EducationPostDetails'>;
}

export function EducationPostDetailsScreen({ route }: ComponentProps) {
    const { thumbnailUrl, title, content, likeCount, category, createdBy, lastUpdatedBy } = route.params;

    return (
        <Screen flex={1}>
            <StatusBar style="light" />
            <View backgroundColor="red">
                <Image
                    style={{ height: 250, width: '100%' }}
                    objectFit="contain"
                    source={{ uri: thumbnailUrl }}
                />
            </View>
            <ScrollView flex={1}>
                <YStack
                    gap="$3"
                    p={20}
                >
                    <XStack
                        mb="$4"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <XStack
                            alignItems="center"
                            gap="$2"
                        >
                            <Heart />
                            <Heading size="small">{likeCount}</Heading>
                        </XStack>
                        <Share2 />
                    </XStack>
                    <YStack gap="$3">
                        <Heading>Title</Heading>
                        <Paragraph size="large">{title}</Paragraph>
                        <Heading>Description</Heading>
                        <Paragraph size="large">{content}</Paragraph>
                        <Heading>Category</Heading>
                        <Paragraph size="large">{category}</Paragraph>
                        <Heading>Author</Heading>
                        <Paragraph size="large">{createdBy}</Paragraph>
                        <Heading>Last Updated By</Heading>
                        <Paragraph size="large">{lastUpdatedBy}</Paragraph>
                    </YStack>
                </YStack>
            </ScrollView>
        </Screen>
    );
}

import { RouteProp } from '@react-navigation/native';
import { Heart, Share2 } from '@tamagui/lucide-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { Image, ScrollView, View, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Paragraph } from '../../../components/Paragraph';
import { Screen } from '../../../components/Screen';
import { useUser } from '../../../context/UserProvider';
import { EducationPost } from '../data/entities/EducationPost';
import { EducationPostLike } from '../data/entities/EducationPostLike';
import { dislikeEducationPost, fetchEducationPostById, likeEducationPost } from '../data/services/EducationPostService';
import { ExploreEducationPostDetailsParams } from '../navigation/ExploreStackParamList';

interface ComponentProps {
    route: RouteProp<{ ExploreEducationPostDetails: ExploreEducationPostDetailsParams }, 'ExploreEducationPostDetails'>;
}

export function ExploreEducationPostDetailsScreen({ route }: ComponentProps) {
    const { postDetails } = route.params;
    const { postId, imageUrl } = postDetails;

    const userSession = useUser();
    const [educationPost, setEducationPost] = useState<EducationPost | null>(null);
    const [postLikes, setPostLikes] = useState<EducationPostLike[]>([]);

    useEffect(() => {
        if (userSession) {
            fetchEducationPostById(postId).then((p) => {
                setEducationPost(p);
            });
        }
    }, [userSession, postId]);

    useEffect(() => {
        if (educationPost) {
            setPostLikes(educationPost.educationPostLikeDtos);
        }
    }, [educationPost]);

    const handleLikePost = () => {
        if (!userSession) {
            return;
        }
        const like = postLikes.find((l) => l.userId === userSession.user.id);
        if (like) {
            dislikeEducationPost({
                userId: userSession.user.id,
                postId,
            });
            setPostLikes(postLikes.filter((l) => l.userId !== userSession.user.id));
        } else {
            likeEducationPost({
                userId: userSession.user.id,
                postId,
            });
            setPostLikes([...postLikes, { userId: userSession.user.id, postId }]);
        }
    };

    const isLiked = userSession && postLikes.some((l) => l.userId === userSession.user.id);

    return (
        <TapGestureHandler
            numberOfTaps={2}
            onActivated={handleLikePost}
        >
            <Screen flex={1}>
                <StatusBar style="light" />
                <View>
                    <Image
                        style={{ height: 250, width: '100%' }}
                        objectFit="cover"
                        source={{ uri: imageUrl }}
                    />
                </View>
                <ScrollView flex={1}>
                    <YStack
                        gap="$3"
                        p={20}
                    >
                        <TapGestureHandler
                            numberOfTaps={1}
                            onActivated={() => {}}
                        >
                            <View
                                flexDirection="row"
                                mb="$4"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <XStack
                                    alignItems="center"
                                    gap="$2"
                                >
                                    <Pressable
                                        onPress={handleLikePost}
                                        hitSlop={8}
                                    >
                                        <Heart
                                            fill={isLiked ? 'red' : 'none'}
                                            strokeWidth={isLiked ? '$0' : '$0.25'}
                                        />
                                    </Pressable>
                                    <Heading size="small">{postLikes.length}</Heading>
                                </XStack>
                                <Share2 />
                            </View>
                        </TapGestureHandler>
                        <YStack gap="$3">
                            <Heading>Title</Heading>
                            <Paragraph size="large">{educationPost?.titleEn}</Paragraph>
                            <Heading>Description</Heading>
                            <Paragraph size="large">{educationPost?.contentEn}</Paragraph>
                            <Heading>Category</Heading>
                            <Paragraph size="large">{educationPost?.categoryDto.name}</Paragraph>
                            <Heading>Author</Heading>
                            <Paragraph size="large">{educationPost?.createdBy}</Paragraph>
                            {educationPost?.lastUpdatedBy && (
                                <>
                                    <Heading>Last Updated By</Heading>
                                    <Paragraph size="large">{educationPost.lastUpdatedBy}</Paragraph>
                                </>
                            )}
                        </YStack>
                    </YStack>
                </ScrollView>
            </Screen>
        </TapGestureHandler>
    );
}

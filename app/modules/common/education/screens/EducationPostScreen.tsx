import { Bookmark, Heart } from '@tamagui/lucide-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Image, ScrollView, View, XStack, YStack } from 'tamagui';
import { Heading } from '../../../../components/Heading';
import { Paragraph } from '../../../../components/Paragraph';
import { Screen } from '../../../../components/Screen';
import { useLanguageCode } from '../../../../context/LanguageCodeProvider';
import { useSession } from '../../../../context/SessionProvider';
import { LanguageCode } from '../../../../lang/LanguageCode';
import { EducationPost } from '../data/entities/EducationPost';
import { EducationPostBookmark } from '../data/entities/EducationPostBookmark';
import { EducationPostLike } from '../data/entities/EducationPostLike';
import {
    bookmarkEducationPost,
    dislikeEducationPost,
    fetchEducationPostById,
    likeEducationPost,
    removeBookmarkEducationPost,
} from '../data/services/EducationPostService';

interface ComponentProps {
    postId: string;
    imageUrl: string;
}

export function EducationPostScreen({ postId, imageUrl }: ComponentProps) {
    const { t } = useTranslation();
    const { languageCode } = useLanguageCode();
    const userSession = useSession();
    const [educationPost, setEducationPost] = useState<EducationPost | null>(null);
    const [postLikes, setPostLikes] = useState<EducationPostLike[]>([]);
    const [postBookmarks, setPostBookmarks] = useState<EducationPostBookmark[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (userSession) {
            fetchEducationPostById(postId)
                .then((p) => {
                    setEducationPost(p);
                })
                .catch(() => {
                    setError(t('education.post.unable.find'));
                });
        }
    }, [userSession, postId, t]);

    useEffect(() => {
        if (educationPost) {
            setPostLikes(educationPost.educationPostLikeDtos);
            setPostBookmarks(educationPost.educationPostBookmarkDtos);
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

    const handleBookmarkPost = () => {
        if (!userSession) {
            return;
        }
        const bookmark = postBookmarks.find((b) => b.userId === userSession.user.id);
        if (bookmark) {
            removeBookmarkEducationPost({
                userId: userSession.user.id,
                postId,
            });
            setPostBookmarks(postBookmarks.filter((b) => b.userId !== userSession.user.id));
        } else {
            bookmarkEducationPost({
                userId: userSession.user.id,
                postId,
            });
            setPostBookmarks([...postBookmarks, { userId: userSession.user.id, postId }]);
            Toast.show({
                type: 'success',
                text1: t('education.post.bookmark.added'),
                visibilityTime: 1500,
            });
        }
    };

    const isLiked = userSession && postLikes.some((l) => l.userId === userSession.user.id);

    const isBookmark = userSession && postBookmarks.some((b) => b.userId === userSession.user.id);

    if (error) {
        return (
            <Screen
                flex={1}
                backgroundColor="$gray6"
            >
                <StatusBar style="light" />
                <Paragraph
                    m="$10"
                    alignSelf="center"
                >
                    {error}
                </Paragraph>
            </Screen>
        );
    }

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
                                <Pressable
                                    onPress={handleBookmarkPost}
                                    hitSlop={8}
                                >
                                    <Bookmark
                                        fill={isBookmark ? 'black' : 'none'}
                                        strokeWidth={isBookmark ? '$0' : '$0.25'}
                                    />
                                </Pressable>
                            </View>
                        </TapGestureHandler>
                        <YStack gap="$5">
                            <YStack gap="$3">
                                <Heading
                                    size="small"
                                    fontStyle="italic"
                                >
                                    {t('education.post.title')}
                                </Heading>
                                <Paragraph size="large">
                                    {languageCode === LanguageCode.ENGLISH
                                        ? educationPost?.titleEn
                                        : educationPost?.titleMs}
                                </Paragraph>
                            </YStack>
                            <YStack gap="$3">
                                <Heading
                                    size="small"
                                    fontStyle="italic"
                                >
                                    {t('education.post.description')}
                                </Heading>
                                <Paragraph size="large">
                                    {languageCode === LanguageCode.ENGLISH
                                        ? educationPost?.contentEn
                                        : educationPost?.contentMs}
                                </Paragraph>
                            </YStack>
                            <YStack gap="$3">
                                <Heading
                                    size="small"
                                    fontStyle="italic"
                                >
                                    {t('education.post.category')}
                                </Heading>
                                <Paragraph size="large">
                                    {languageCode === LanguageCode.ENGLISH
                                        ? educationPost?.categoryDto.name
                                        : educationPost?.categoryDto.nameMs}
                                </Paragraph>
                            </YStack>
                            <YStack gap="$3">
                                <Heading
                                    size="small"
                                    fontStyle="italic"
                                >
                                    {t('education.post.author')}
                                </Heading>
                                <Paragraph size="large">{educationPost?.createdBy}</Paragraph>
                            </YStack>
                            {educationPost?.lastUpdatedBy && (
                                <YStack gap="$3">
                                    <Heading
                                        size="small"
                                        fontStyle="italic"
                                    >
                                        {t('education.post.last.updated.by')}
                                    </Heading>
                                    <Paragraph size="large">{educationPost.lastUpdatedBy}</Paragraph>
                                </YStack>
                            )}
                        </YStack>
                    </YStack>
                </ScrollView>
            </Screen>
        </TapGestureHandler>
    );
}

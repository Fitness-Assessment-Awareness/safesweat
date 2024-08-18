import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNetInfo } from '@react-native-community/netinfo';
import { ArrowDown, ArrowUp, Settings2, WifiOff } from '@tamagui/lucide-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Paragraph, ScrollView, Separator, Text, View, XStack, YStack } from 'tamagui';
import { Screen } from '../../../components/Screen';
import { SearchBar } from '../../../components/SearchBar';
import { Sheet } from '../../../components/Sheet';
import { fetchEducationCategories, fetchEducationPosts } from '../../../services/EducationPostService';
import { EducationPostCard } from '../components/EducationPostCard';
import { ExploreSortFilterSheetContent } from '../components/ExploreSortFilterSheet';
import { EducationCategory } from '../data/entities/EducationCategory';
import { EducationPost } from '../data/entities/EducationPost';
import { SortOption } from '../data/SortOption';
import { useExploreNavigation } from '../navigation/useExploreNavigation';

const sortOptions: SortOption[] = [
    {
        name: 'Title',
        icon: <ArrowUp />,
        orderBy: 'asc',
        sort: (a, b) => a.titleEn.localeCompare(b.titleEn),
    },
    {
        name: 'Like',
        icon: <ArrowDown />,
        orderBy: 'desc',
        sort: (a, b) => b.likeCount - a.likeCount,
    },
] as const;

export function ExploreLandingScreen() {
    const sheetRef = useRef<BottomSheetModal>(null);
    const [educationPosts, setEducationPosts] = useState<EducationPost[]>([]);
    const [searchText, setSearchText] = useState('');
    const [categories, setCategories] = useState<EducationCategory[]>([]);
    const [selectedOption, setSelectedOption] = useState<SortOption | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<EducationCategory | null>(null);
    const { isConnected } = useNetInfo();
    const navigation = useExploreNavigation<'ExploreLanding'>();
    const filteredEducationPosts = educationPosts
        .filter((post) => post.titleEn.toLowerCase().includes(searchText.toLowerCase()))
        .filter((post) => (selectedCategory ? post.categoryDto.name === selectedCategory.name : true))
        .sort((a, b) => (selectedOption ? selectedOption.sort(a, b) : 0));

    useEffect(() => {
        if (isConnected) {
            fetchEducationPosts().then((p) => {
                setEducationPosts(p);
            });
            fetchEducationCategories().then((c) => {
                setCategories(c);
            });
        }
    }, [isConnected]);

    return (
        <Screen flex={1}>
            <ScrollView flex={1}>
                <View
                    py="$2"
                    px="$3"
                >
                    <XStack
                        gap="$2"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <SearchBar
                            w="90%"
                            searchText={searchText}
                            onChangeText={setSearchText}
                            inputPlaceholder="Post Title"
                        />
                        <Settings2
                            onPress={() => {
                                sheetRef.current?.present();
                            }}
                        />
                    </XStack>
                </View>
                <Separator borderColor="#D0D3D8" />
                {isConnected && (
                    <YStack
                        gap="$4"
                        p="$3"
                    >
                        {filteredEducationPosts.length > 0 ? (
                            filteredEducationPosts.map((post) => (
                                <EducationPostCard
                                    key={post.postId}
                                    title={post.titleEn}
                                    imageSource={{
                                        uri: post.imageUrl,
                                    }}
                                    backgroundColor="$colorTransparent"
                                    onPress={() => {
                                        navigation.navigate('EducationPostDetails', {
                                            title: post.titleEn,
                                            thumbnailUrl: post.imageUrl,
                                            content: post.contentEn,
                                            likeCount: post.likeCount,
                                            category: post.categoryDto.name,
                                            createdBy: post.createdBy,
                                            lastUpdatedBy: post.lastUpdatedBy,
                                        });
                                    }}
                                />
                            ))
                        ) : (
                            <Paragraph
                                m="$8"
                                alignSelf="center"
                            >
                                No post found...
                            </Paragraph>
                        )}
                    </YStack>
                )}
                {isConnected === false && (
                    <XStack gap="$2">
                        <WifiOff color="red" />
                        <Text>You&apos;re currrently offline</Text>
                    </XStack>
                )}
            </ScrollView>
            <Sheet
                ref={sheetRef}
                enableDynamicSizing
            >
                <Sheet.ScrollView>
                    <ExploreSortFilterSheetContent
                        selectedCategory={selectedCategory}
                        selectedOption={selectedOption}
                        setSelectedCategory={setSelectedCategory}
                        setSelectedOption={setSelectedOption}
                        sortOptions={sortOptions}
                        categories={categories}
                    />
                </Sheet.ScrollView>
            </Sheet>
        </Screen>
    );
}

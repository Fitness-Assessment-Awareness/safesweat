import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNetInfo } from '@react-native-community/netinfo';
import { ArrowDown, ArrowUp, Settings2 } from '@tamagui/lucide-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable } from 'react-native';
import { Paragraph, ScrollView, Separator, View, XStack, YStack } from 'tamagui';
import { SearchBar } from '../../../components/SearchBar';
import { Sheet } from '../../../components/Sheet';
import { useSession } from '../../../context/SessionProvider';
import { ExploreEducationPostCard } from '../components/ExploreEducationPostCard';
import { ExploreSortFilterSheetContent } from '../components/ExploreSortFilterSheet';
import { EducationCategory } from '../data/entities/EducationCategory';
import { EducationPostSummary } from '../data/entities/EducationPost';
import { fetchEducationCategories, fetchEducationPosts } from '../data/services/EducationPostService';
import { SortOption } from '../data/SortOption';
import { useExploreNavigation } from '../navigation/useExploreNavigation';

const sortOptions: SortOption[] = [
    {
        name: 'Title',
        icon: <ArrowUp />,
        orderBy: 'asc',
        sort: (a: EducationPostSummary, b: EducationPostSummary) => a.titleEn.localeCompare(b.titleEn),
    },
    {
        name: 'Like',
        icon: <ArrowDown />,
        orderBy: 'desc',
        sort: (a: EducationPostSummary, b: EducationPostSummary) => b.likeCount - a.likeCount,
    },
] as const;

export function ExploreLandingScreen() {
    const navigation = useExploreNavigation<'ExploreLanding'>();
    const sheetRef = useRef<BottomSheetModal>(null);
    const userSession = useSession();
    const [educationSummaryPosts, setEducationSummaryPosts] = useState<EducationPostSummary[]>([]);
    const [searchText, setSearchText] = useState('');
    const [categories, setCategories] = useState<EducationCategory[]>([]);
    const [selectedOption, setSelectedOption] = useState<SortOption | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<EducationCategory | null>(null);
    const { isConnected } = useNetInfo();

    const filteredEducationSummaryPosts = educationSummaryPosts
        .filter((post) => post.titleEn.toLowerCase().includes(searchText.toLowerCase()))
        .filter((post) => (selectedCategory ? post.categoryId === selectedCategory.categoryId : true))
        .sort((a, b) => (selectedOption ? selectedOption.sort(a, b) : 0));

    useEffect(() => {
        if (isConnected && userSession) {
            fetchEducationPosts().then((p) => {
                setEducationSummaryPosts(p);
            });
            fetchEducationCategories().then((c) => {
                setCategories(c);
            });
        }
    }, [isConnected, userSession]);

    return (
        <View flex={1}>
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
                        <Pressable
                            onPress={() => {
                                sheetRef.current?.present();
                            }}
                        >
                            <Settings2 />
                        </Pressable>
                    </XStack>
                </View>
                <Separator borderColor="#D0D3D8" />
                {isConnected && userSession && (
                    <YStack
                        gap="$4"
                        p="$3"
                    >
                        {filteredEducationSummaryPosts.length > 0 ? (
                            filteredEducationSummaryPosts.map((post) => (
                                <ExploreEducationPostCard
                                    key={post.postId}
                                    title={post.titleEn}
                                    imageSource={{ uri: post.imageUrl }}
                                    onPress={() => {
                                        navigation.navigate('ExploreEducationPostDetails', {
                                            postDetails: {
                                                postId: post.postId,
                                                imageUrl: post.imageUrl,
                                            },
                                        });
                                    }}
                                    backgroundColor="$colorTransparent"
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
                    <Paragraph
                        m="$8"
                        alignSelf="center"
                    >
                        You&apos;re currrently offline
                    </Paragraph>
                )}
                {!userSession && (
                    <Paragraph
                        m="$8"
                        alignSelf="center"
                    >
                        Only logged in user can view the posts...
                    </Paragraph>
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
        </View>
    );
}

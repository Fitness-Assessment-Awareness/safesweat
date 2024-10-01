import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNetInfo } from '@react-native-community/netinfo';
import { ArrowDown, ArrowUp, Settings2 } from '@tamagui/lucide-icons';
import { useEffect, useRef, useState } from 'react';
import { Pressable } from 'react-native';
import { Paragraph, ScrollView, Separator, View, XStack, YStack } from 'tamagui';
import { SearchBar } from '../../../../components/SearchBar';
import { Sheet } from '../../../../components/Sheet';
import { useUser } from '../../../../context/UserProvider';
import { EducationPostCard } from '../components/EducationPostCard';
import { SortFilterSheetContent } from '../components/SortFilterSheet';
import { EducationCategory } from '../data/entities/EducationCategory';
import { EducationPostSummary } from '../data/entities/EducationPost';
import { fetchEducationCategories } from '../data/services/EducationPostService';
import { SortOption } from '../data/SortOption';

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

interface ComponentProps {
    educationPostsSummary: EducationPostSummary[];
    handleFeedOnPress: (post: EducationPostSummary) => void;
}

export function EducationFeedScreen({ educationPostsSummary, handleFeedOnPress }: ComponentProps) {
    const sheetRef = useRef<BottomSheetModal>(null);
    const { isConnected } = useNetInfo();
    const userSession = useUser();
    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState<SortOption | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<EducationCategory | null>(null);
    const [categories, setCategories] = useState<EducationCategory[]>([]);

    useEffect(() => {
        if (isConnected && userSession) {
            fetchEducationCategories().then((c) => {
                setCategories(c);
            });
        }
    }, [isConnected, userSession]);

    const filteredEducationSummaryPosts = educationPostsSummary
        .filter((post) => post.titleEn.toLowerCase().includes(searchText.toLowerCase()))
        .filter((post) => (selectedCategory ? post.categoryId === selectedCategory.categoryId : true))
        .sort((a, b) => (selectedOption ? selectedOption.sort(a, b) : 0));

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
                                <EducationPostCard
                                    key={post.postId}
                                    title={post.titleEn}
                                    imageSource={{ uri: post.imageUrl }}
                                    onPress={() => handleFeedOnPress(post)}
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
                    <SortFilterSheetContent
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

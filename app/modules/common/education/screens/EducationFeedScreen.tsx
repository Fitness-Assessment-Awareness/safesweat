import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNetInfo } from '@react-native-community/netinfo';
import { ArrowDown, ArrowUp, Settings2 } from '@tamagui/lucide-icons';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { Paragraph, ScrollView, Separator, View, XStack, YStack } from 'tamagui';
import { Label } from '../../../../components/Label';
import { SearchBar } from '../../../../components/SearchBar';
import { Sheet } from '../../../../components/Sheet';
import { useLanguageCode } from '../../../../context/LanguageCodeProvider';
import { useSession } from '../../../../context/SessionProvider';
import { LanguageCode } from '../../../../lang/LanguageCode';
import { EducationFeedRecommendedSection } from '../components/EducationFeedRecommendedSection';
import { EducationPostCard } from '../components/EducationPostCard';
import { SortFilterSheetContent } from '../components/SortFilterSheet';
import { EducationCategory } from '../data/entities/EducationCategory';
import { EducationPostSummary } from '../data/entities/EducationPost';
import { fetchEducationCategories } from '../data/services/EducationPostService';
import { SortOption } from '../data/SortOption';

interface ComponentProps {
    educationPostsSummary: EducationPostSummary[];
    recommendedEducationPosts?: EducationPostSummary[];
    handleFeedOnPress: (post: EducationPostSummary) => void;
    refreshing: boolean;
    setRefreshing: Dispatch<SetStateAction<boolean>>;
}

export function EducationFeedScreen({
    educationPostsSummary,
    recommendedEducationPosts,
    handleFeedOnPress,
    refreshing,
    setRefreshing,
}: ComponentProps) {
    const { t } = useTranslation();
    const { languageCode } = useLanguageCode();
    const sortOptions: SortOption[] = [
        {
            key: 'Feed Title',
            name: t('education.post.title'),
            icon: <ArrowUp />,
            orderBy: 'asc',
            sort: (a: EducationPostSummary, b: EducationPostSummary) => a.titleEn.localeCompare(b.titleEn),
        },
        {
            key: 'Feed Like',
            name: t('education.feed.like'),
            icon: <ArrowDown />,
            orderBy: 'desc',
            sort: (a: EducationPostSummary, b: EducationPostSummary) => b.likeCount - a.likeCount,
        },
    ] as const;
    const sheetRef = useRef<BottomSheetModal>(null);
    const { isConnected } = useNetInfo();
    const userSession = useSession();
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
        .filter((post) =>
            languageCode === LanguageCode.ENGLISH
                ? post.titleEn.toLowerCase().includes(searchText.toLowerCase())
                : post.titleMs.toLowerCase().includes(searchText.toLowerCase()),
        )
        .filter((post) => (selectedCategory ? post.categoryId === selectedCategory.categoryId : true))
        .sort((a, b) => (selectedOption ? selectedOption.sort(a, b) : 0));

    const filteredRecommendedEducationPosts = recommendedEducationPosts
        ?.filter((post) =>
            languageCode === LanguageCode.ENGLISH
                ? post.titleEn.toLowerCase().includes(searchText.toLowerCase())
                : post.titleMs.toLowerCase().includes(searchText.toLowerCase()),
        )
        .filter((post) => (selectedCategory ? post.categoryId === selectedCategory.categoryId : true))
        .sort((a, b) => (selectedOption ? selectedOption.sort(a, b) : 0));

    return (
        <View flex={1}>
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
                        inputPlaceholder={t('education.feed.post.title')}
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
            <ScrollView
                flex={1}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                        }}
                    />
                }
            >
                {isConnected && userSession && (
                    <YStack
                        gap="$4"
                        p="$3"
                    >
                        {filteredRecommendedEducationPosts && (
                            <EducationFeedRecommendedSection
                                educationPostsSummary={filteredRecommendedEducationPosts}
                                handleFeedOnPress={handleFeedOnPress}
                            />
                        )}
                        {filteredEducationSummaryPosts.length > 0 ? (
                            <>
                                <Label
                                    mt={
                                        filteredRecommendedEducationPosts &&
                                        filteredRecommendedEducationPosts.length > 0 &&
                                        '$4'
                                    }
                                    size="large"
                                >
                                    {t('education.feed.browse.post')}
                                </Label>
                                {filteredEducationSummaryPosts.map((post) => (
                                    <EducationPostCard
                                        key={post.postId}
                                        title={languageCode === LanguageCode.ENGLISH ? post.titleEn : post.titleMs}
                                        imageSource={{ uri: post.imageUrl }}
                                        onPress={() => handleFeedOnPress(post)}
                                        backgroundColor="$colorTransparent"
                                    />
                                ))}
                            </>
                        ) : (
                            <Paragraph
                                m="$8"
                                alignSelf="center"
                            >
                                {t('education.feed.no.post.found')}
                            </Paragraph>
                        )}
                    </YStack>
                )}
                {isConnected === false && (
                    <Paragraph
                        m="$8"
                        alignSelf="center"
                    >
                        {t('education.feed.currently.offline')}
                    </Paragraph>
                )}
                {!userSession && (
                    <Paragraph
                        m="$8"
                        alignSelf="center"
                    >
                        {t('education.feed.only.login.view.post')}
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

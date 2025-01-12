import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, XStack } from 'tamagui';
import { Chip } from '../../../../components/Chip';
import { Heading } from '../../../../components/Heading';
import { useLanguageCode } from '../../../../context/LanguageCodeProvider';
import { LanguageCode } from '../../../../lang/LanguageCode';
import { EducationCategory } from '../data/entities/EducationCategory';
import { SortOption } from '../data/SortOption';

interface ComponentProps {
    sortOptions: SortOption[];
    categories: EducationCategory[];
    selectedOption: SortOption | null;
    selectedCategory: EducationCategory | null;
    setSelectedOption: (option: SortOption | null) => void;
    setSelectedCategory: (category: EducationCategory | null) => void;
}

export function SortFilterSheetContent({
    sortOptions,
    categories,
    selectedOption,
    selectedCategory,
    setSelectedOption,
    setSelectedCategory,
}: ComponentProps) {
    const { t } = useTranslation();
    const { languageCode } = useLanguageCode();
    const { bottom } = useSafeAreaInsets();
    return (
        <>
            <Heading
                p="$4"
                pb={0}
            >
                {t('education.search.sort')}
            </Heading>
            <XStack
                p="$4"
                flexWrap="wrap"
                gap="$3"
                pb={bottom}
            >
                {sortOptions.map((option) => (
                    <Chip
                        backgroundColor={selectedOption && selectedOption.key === option.key ? '$blue8' : '$gray4'}
                        key={option.name}
                        onPress={() => {
                            setSelectedOption(selectedOption?.key === option.key ? null : option);
                        }}
                    >
                        <XStack alignItems="center">
                            {option.icon}
                            <Text>{option.name}</Text>
                        </XStack>
                    </Chip>
                ))}
            </XStack>
            {categories.length > 0 && (
                <>
                    <Heading
                        p="$4"
                        pb={0}
                    >
                        {t('education.search.filter')}
                    </Heading>
                    <XStack
                        p="$4"
                        gap="$3"
                        pb={bottom}
                    >
                        {categories.map((category) => (
                            <Chip
                                backgroundColor={selectedCategory === category ? '$blue8' : '$gray4'}
                                key={category.categoryId}
                                onPress={() => setSelectedCategory(selectedCategory === category ? null : category)}
                            >
                                {languageCode === LanguageCode.ENGLISH ? category.name : category.nameMs}
                            </Chip>
                        ))}
                    </XStack>
                </>
            )}
        </>
    );
}

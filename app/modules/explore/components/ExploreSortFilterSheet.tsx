import React from 'react';
import { Text, XStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
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

export function ExploreSortFilterSheetContent({
    sortOptions,
    categories,
    selectedOption,
    selectedCategory,
    setSelectedOption,
    setSelectedCategory,
}: ComponentProps) {
    return (
        <>
            <Heading
                p="$4"
                pb={0}
            >
                Sort
            </Heading>
            <XStack
                p="$4"
                flexWrap="wrap"
                gap="$3"
            >
                {sortOptions.map((option) => (
                    <Chip
                        backgroundColor={selectedOption === option ? '$blue8' : '$gray4'}
                        key={option.name}
                        onPress={() => setSelectedOption(selectedOption === option ? null : option)}
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
                        Filter
                    </Heading>
                    <XStack
                        p="$4"
                        gap="$3"
                    >
                        {categories.map((category) => (
                            <Chip
                                backgroundColor={selectedCategory === category ? '$blue8' : '$gray4'}
                                key={category.categoryId}
                                onPress={() => setSelectedCategory(selectedCategory === category ? null : category)}
                            >
                                {category.name}
                            </Chip>
                        ))}
                    </XStack>
                </>
            )}
        </>
    );
}

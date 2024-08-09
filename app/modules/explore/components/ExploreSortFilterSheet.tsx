import React from 'react';
import { SheetProps, Text, XStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { Sheet } from '../../../components/Sheet';
import { EducationCategory } from '../data/entities/EducationCategory';
import { SortOption } from '../data/SortOption';

interface ComponentProps extends SheetProps {
    sortOptions: SortOption[];
    categories: EducationCategory[];
    selectedOption: SortOption | null;
    selectedCategory: EducationCategory | null;
    setSelectedOption: (option: SortOption | null) => void;
    setSelectedCategory: (category: EducationCategory | null) => void;
}

export function ExploreSortFilterSheet({
    sortOptions,
    categories,
    selectedOption,
    selectedCategory,
    setSelectedOption,
    setSelectedCategory,
    ...otherProps
}: ComponentProps) {
    return (
        <Sheet
            snapPoints={[35]}
            {...otherProps}
        >
            <Sheet.ScrollView>
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
                <Heading
                    p="$4"
                    pb={0}
                >
                    Filter
                </Heading>
                <XStack
                    p="$4"
                    flexWrap="wrap"
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
            </Sheet.ScrollView>
        </Sheet>
    );
}

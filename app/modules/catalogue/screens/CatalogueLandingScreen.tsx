import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Settings2 } from '@tamagui/lucide-icons';
import React, { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTokenValue, Paragraph, Separator, View, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { SearchBar } from '../../../components/SearchBar';
import { SelectableChip } from '../../../components/SelectableChip';
import { Sheet } from '../../../components/Sheet';
import { Exercise, EXERCISE_FOCUS_AREAS } from '../../workout/data/entities/Exercise';
import { ExerciseKey, EXERCISES } from '../../workout/data/exercises';
import { CatalogueExerciseDetailsSheetContent } from '../components/CatalogueExerciseDetailsSheet';
import { CatalogueExerciseOverview } from '../components/CatalogueExerciseOverview';

interface ScreenContentProps {
    onExercisePress: (workout: ExerciseKey) => void;
}

function ScreenContent({ onExercisePress }: ScreenContentProps) {
    const { t } = useTranslation();
    const exercises = Object.entries(EXERCISES) as [ExerciseKey, Exercise][];
    const [searchText, setSearchText] = useState('');
    const [difficulty, setDifficulty] = useState<'low' | 'moderate' | 'vigorous' | null>(null);
    const [focusAreas, setFocusAreas] = useState<Exercise['focusAreas']>([]);
    const sheetRef = useRef<BottomSheetModal>(null);
    const insets = useSafeAreaInsets();

    const filteredExercises = exercises.filter(
        ([, details]) =>
            details.title.toLowerCase().includes(searchText.toLowerCase()) &&
            (difficulty ? details.difficulty === difficulty : true) &&
            (focusAreas.length > 0 ? focusAreas.every((area) => details.focusAreas.includes(area)) : true),
    );

    const onFilterPress = () => {
        sheetRef.current?.present();
    };

    return (
        <>
            <XStack
                py="$2"
                px="$3"
                ai="center"
                columnGap="$2"
            >
                <SearchBar
                    searchText={searchText}
                    onChangeText={setSearchText}
                    flex={1}
                />
                <Pressable
                    onPress={onFilterPress}
                    hitSlop={8}
                >
                    <Settings2 size="$1.5" />
                </Pressable>
            </XStack>

            <Separator borderColor="#D0D3D8" />
            {filteredExercises.length > 0 ? (
                <FlatList
                    data={filteredExercises}
                    renderItem={({ item }) => {
                        const [key, value] = item;
                        return (
                            <Fragment key={key}>
                                <CatalogueExerciseOverview
                                    value={key}
                                    title={value.title}
                                    lottieSource={value.lottieSource}
                                    onValueChange={(exerciseKey) => {
                                        onExercisePress(exerciseKey);
                                    }}
                                />
                                <Separator borderColor="#D0D3D8" />
                            </Fragment>
                        );
                    }}
                />
            ) : (
                <Paragraph
                    m="$8"
                    alignSelf="center"
                >
                    {t('catalogue.landing.no.exercise.found')}
                </Paragraph>
            )}
            <Sheet
                ref={sheetRef}
                enableDynamicSizing
            >
                <Sheet.View
                    p="$3"
                    pb={getTokenValue('$3') + insets.bottom}
                    rowGap="$3"
                >
                    <YStack rowGap="$2">
                        <Heading>Difficulty</Heading>
                        <XStack gap="$2">
                            <SelectableChip
                                isSelected={difficulty === 'low'}
                                onChange={() => {
                                    setDifficulty(difficulty === 'low' ? null : 'low');
                                }}
                            >
                                Low
                            </SelectableChip>
                            <SelectableChip
                                isSelected={difficulty === 'moderate'}
                                onChange={() => {
                                    setDifficulty(difficulty === 'moderate' ? null : 'moderate');
                                }}
                            >
                                Moderate
                            </SelectableChip>
                            <SelectableChip
                                isSelected={difficulty === 'vigorous'}
                                onChange={() => {
                                    setDifficulty(difficulty === 'vigorous' ? null : 'vigorous');
                                }}
                            >
                                Vigorous
                            </SelectableChip>
                        </XStack>
                    </YStack>
                    <YStack rowGap="$2">
                        <Heading>Focus Areas</Heading>
                        <XStack
                            gap="$2"
                            flexWrap="wrap"
                        >
                            {EXERCISE_FOCUS_AREAS.map((focusArea) => (
                                <SelectableChip
                                    key={focusArea}
                                    isSelected={focusAreas.includes(focusArea)}
                                    onChange={() => {
                                        setFocusAreas((prev) =>
                                            prev.includes(focusArea)
                                                ? prev.filter((area) => area !== focusArea)
                                                : [...prev, focusArea],
                                        );
                                    }}
                                >
                                    {focusArea}
                                </SelectableChip>
                            ))}
                        </XStack>
                    </YStack>
                </Sheet.View>
            </Sheet>
        </>
    );
}

export function CatalogueLandingScreen() {
    const [selectedWorkout, setSelectedWorkout] = useState<ExerciseKey>('jumpingJacks');
    const sheetRef = useRef<BottomSheetModal>(null);

    const onExercisePress = (workout: ExerciseKey) => {
        setSelectedWorkout(workout);
        sheetRef.current?.present();
    };

    return (
        <View flex={1}>
            <ScreenContent onExercisePress={onExercisePress} />
            <Sheet
                ref={sheetRef}
                snapPoints={['85%']}
            >
                <CatalogueExerciseDetailsSheetContent {...EXERCISES[selectedWorkout]} />
            </Sheet>
        </View>
    );
}

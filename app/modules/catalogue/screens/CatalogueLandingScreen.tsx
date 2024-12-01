import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { Paragraph, Separator, View } from 'tamagui';
import { SearchBar } from '../../../components/SearchBar';
import { Sheet } from '../../../components/Sheet';
import { Exercise } from '../../workout/data/entities/Exercise';
import { EXERCISES, ExerciseKey } from '../../workout/data/exercises';
import { CatalogueExerciseDetailsSheetContent } from '../components/CatalogueExerciseDetailsSheet';
import { CatalogueExerciseOverview } from '../components/CatalogueExerciseOverview';

interface ScreenContentProps {
    onExercisePress: (workout: ExerciseKey) => void;
}

function ScreenContent({ onExercisePress }: ScreenContentProps) {
    const { t } = useTranslation();
    const exercises = Object.entries(EXERCISES) as [ExerciseKey, Exercise][];
    const [searchText, setSearchText] = useState('');

    const filteredExercises = exercises.filter(([, details]) =>
        details.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    return (
        <>
            <View
                py="$2"
                px="$3"
            >
                <SearchBar
                    searchText={searchText}
                    onChangeText={setSearchText}
                />
            </View>

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

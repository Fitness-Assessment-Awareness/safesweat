import React, { Fragment, useState } from 'react';
import { Paragraph, ScrollView, Separator, View } from 'tamagui';
import { Screen } from '../../../components/Screen';
import { SearchBar } from '../../../components/SearchBar';
import { Exercise } from '../../workout/data/entities/Exercise';
import { EXERCISES, ExerciseKey } from '../../workout/data/exercises';
import { CatalogueExerciseDetailsSheet } from '../components/CatalogueExerciseDetailsSheet';
import { CatalogueExerciseOverview } from '../components/CatalogueExerciseOverview';

interface ScreenContentProps {
    setOpen: (open: boolean) => void;
    setSelectedWorkout: (workout: ExerciseKey) => void;
}

function ScreenContent({ setOpen, setSelectedWorkout }: ScreenContentProps) {
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
                filteredExercises.map(([key, value]) => (
                    <Fragment key={key}>
                        <CatalogueExerciseOverview
                            value={key}
                            title={value.title}
                            lottieSource={value.lottieSource}
                            onValueChange={(exerciseKey) => {
                                setOpen(true);
                                setSelectedWorkout(exerciseKey);
                            }}
                        />
                        <Separator borderColor="#D0D3D8" />
                    </Fragment>
                ))
            ) : (
                <Paragraph
                    m="$8"
                    alignSelf="center"
                >
                    No exercise found...
                </Paragraph>
            )}
        </>
    );
}

export function CatalogueLandingScreen() {
    const [open, setOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState<ExerciseKey>('jumpingJacks');

    return (
        <Screen flex={1}>
            <ScrollView flex={1}>
                <ScreenContent
                    setSelectedWorkout={setSelectedWorkout}
                    setOpen={setOpen}
                />
            </ScrollView>
            <CatalogueExerciseDetailsSheet
                open={open}
                onOpenChange={setOpen}
                {...EXERCISES[selectedWorkout]}
            />
        </Screen>
    );
}

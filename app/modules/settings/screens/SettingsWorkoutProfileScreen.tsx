import { Focus, Footprints, HeartPulse, SquareUserRound } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import { Button, Input, Label, ScrollView, Text, View, YStack } from 'tamagui';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { Difficulty } from '../../onboarding/data/entities/Difficulty';
import { FocusArea } from '../../onboarding/data/entities/FocusArea';
import { Gender } from '../../onboarding/data/entities/Gender';
import { HealthProblem } from '../../onboarding/data/entities/HealthProblem';

export function SettingsWorkoutProfileScreen() {
    const { workoutProfile, setWorkoutProfile } = useWorkoutProfile();
    const [gender, setGender] = useState(workoutProfile.gender);
    const [focusAreas, setFocusAreas] = useState(workoutProfile.focusAreas);
    const [difficulty, setDifficulty] = useState(workoutProfile.difficulty);
    const [healthProblems, setHealthProblems] = useState(workoutProfile.healthProblems);
    const [height, setHeight] = useState(workoutProfile.height);
    const [weight, setWeight] = useState(workoutProfile.weight);
    const [edit, setEdit] = useState(false);

    const isFocusAreaValid = focusAreas.length > 0;

    const isHealthProblemValid = healthProblems.length > 0;

    const isHeightValid = height > 0 && height <= 300;

    const isWeightValid = weight > 0 && weight <= 700;

    return (
        <View flex={1}>
            <ScrollView
                flex={1}
                contentContainerStyle={{
                    paddingBottom: '$8',
                }}
            >
                <YStack
                    my="$2"
                    mx="$6"
                    gap="$2"
                >
                    <Label>Gender</Label>
                    <Dropdown
                        disable={!edit}
                        style={{
                            minHeight: 60,
                            borderColor: 'gray',
                            borderWidth: 0.5,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                        }}
                        selectedTextStyle={{
                            color: edit ? 'black' : 'gray',
                        }}
                        placeholderStyle={{
                            color: edit ? 'black' : 'gray',
                        }}
                        search
                        placeholder="Select item..."
                        data={Object.values(Gender)
                            .filter((g) => g !== Gender.NONE)
                            .map((g) => ({
                                label: g,
                                value: g,
                            }))}
                        value={gender}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder="Search..."
                        onChange={(item) => {
                            setGender(item.value || Gender.NONE);
                        }}
                        renderLeftIcon={() => (
                            <SquareUserRound
                                mx={10}
                                color={edit ? 'black' : 'gray'}
                            />
                        )}
                        renderRightIcon={edit ? undefined : () => null}
                    />

                    <Label>Workout Focus Areas</Label>
                    <MultiSelect
                        disable={!edit}
                        inside
                        style={{
                            minHeight: 60,
                            borderColor: !isFocusAreaValid ? 'red' : 'gray',
                            borderWidth: 0.5,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                        }}
                        selectedStyle={{
                            borderRadius: 14,
                        }}
                        selectedTextStyle={{
                            color: edit ? 'black' : 'gray',
                        }}
                        placeholderStyle={{
                            color: edit ? 'black' : 'gray',
                        }}
                        search
                        placeholder="Select item..."
                        data={Object.values(FocusArea).map((area) => ({
                            label: area,
                            value: area,
                        }))}
                        value={focusAreas}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder="Search..."
                        onChange={(items) => {
                            setFocusAreas(items as FocusArea[]);
                        }}
                        renderLeftIcon={() => (
                            <Focus
                                mx={10}
                                color={edit ? 'black' : 'gray'}
                            />
                        )}
                        renderRightIcon={edit ? undefined : () => null}
                    />
                    {!isFocusAreaValid && (
                        <Text
                            backgroundColor="red"
                            color="white"
                            borderRadius="$3"
                            textAlign="center"
                            p="$2"
                        >
                            Please select at least one focus area
                        </Text>
                    )}

                    <Label>Difficulty</Label>
                    <Dropdown
                        disable={!edit}
                        style={{
                            minHeight: 60,
                            borderColor: 'gray',
                            borderWidth: 0.5,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                        }}
                        placeholderStyle={{
                            color: edit ? 'black' : 'gray',
                        }}
                        selectedTextStyle={{
                            color: edit ? 'black' : 'gray',
                        }}
                        search
                        placeholder="Select item..."
                        data={Object.values(Difficulty)
                            .filter((d) => d !== Difficulty.NONE)
                            .map((d) => ({
                                label: d,
                                value: d,
                            }))}
                        value={difficulty}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder="Search..."
                        onChange={(item) => {
                            setDifficulty(item.value || Difficulty.NONE);
                        }}
                        renderLeftIcon={() => (
                            <Footprints
                                mx={10}
                                color={edit ? 'black' : 'gray'}
                            />
                        )}
                        renderRightIcon={edit ? undefined : () => null}
                    />

                    <Label>Health Conditions</Label>
                    <MultiSelect
                        disable={!edit}
                        inside
                        style={{
                            minHeight: 60,
                            borderColor: !isHealthProblemValid ? 'red' : 'gray',
                            borderWidth: 0.5,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                        }}
                        placeholderStyle={{
                            color: edit ? 'black' : 'gray',
                        }}
                        selectedStyle={{
                            borderRadius: 14,
                        }}
                        selectedTextStyle={{
                            color: edit ? 'black' : 'gray',
                        }}
                        search
                        placeholder="Select item..."
                        data={Object.values(HealthProblem).map((p) => ({
                            label: p,
                            value: p,
                        }))}
                        value={healthProblems}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder="Search..."
                        onChange={(items) => {
                            setHealthProblems(items as HealthProblem[]);
                        }}
                        renderLeftIcon={() => (
                            <HeartPulse
                                mx={10}
                                color={edit ? 'black' : 'gray'}
                            />
                        )}
                        renderRightIcon={edit ? undefined : () => null}
                    />
                    {!isHealthProblemValid && (
                        <Text
                            backgroundColor="red"
                            color="white"
                            borderRadius="$3"
                            textAlign="center"
                            p="$2"
                        >
                            Please select at least one health condition
                        </Text>
                    )}

                    <Label>Height (cm)</Label>
                    <Input
                        inputMode="numeric"
                        disabled={!edit}
                        style={{
                            minHeight: 60,
                            backgroundColor: 'transparent',
                            borderColor: !isHeightValid ? 'red' : 'lightgray',
                            borderWidth: 0.5,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                            color: edit ? 'black' : 'gray',
                        }}
                        value={height.toString()}
                        onChangeText={(e) => {
                            if (!Number.isNaN(+e)) {
                                setHeight(+e);
                            }
                        }}
                    />
                    {!isHeightValid && (
                        <Text
                            backgroundColor="red"
                            color="white"
                            borderRadius="$3"
                            textAlign="center"
                            p="$2"
                        >
                            Height must be between 0 and 300 cm
                        </Text>
                    )}

                    <Label>Weight (kg)</Label>
                    <Input
                        inputMode="numeric"
                        disabled={!edit}
                        style={{
                            minHeight: 60,
                            backgroundColor: 'transparent',
                            borderColor: !isWeightValid ? 'red' : 'lightgray',
                            borderWidth: 0.5,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                            color: edit ? 'black' : 'gray',
                        }}
                        value={weight.toString()}
                        onChangeText={(e) => {
                            if (!Number.isNaN(+e)) {
                                setWeight(+e);
                            }
                        }}
                    />
                    {!isWeightValid && (
                        <Text
                            backgroundColor="red"
                            color="white"
                            borderRadius="$3"
                            textAlign="center"
                            p="$2"
                        >
                            Weight must be between 0 and 700 kg
                        </Text>
                    )}
                </YStack>
            </ScrollView>
            <Button
                disabled={edit && (!isFocusAreaValid || !isHealthProblemValid || !isHeightValid || !isWeightValid)}
                disabledStyle={{ backgroundColor: '$green7' }}
                backgroundColor={edit ? '$green11' : 'darkblue'}
                pressStyle={{ backgroundColor: edit ? '$green10' : '$blue11' }}
                color="white"
                m="$4"
                borderRadius="$8"
                onPress={() => {
                    if (edit) {
                        setWorkoutProfile({
                            ...workoutProfile,
                            gender,
                            focusAreas,
                            difficulty,
                            healthProblems,
                            height,
                            weight,
                        });
                    }
                    Toast.show({
                        type: 'success',
                        text1: !edit ? 'Edit mode turned on' : 'Edit mode turned off',
                        visibilityTime: 1000,
                    });
                    setEdit(!edit);
                }}
            >
                {edit ? 'Save' : 'Edit'}
            </Button>
        </View>
    );
}

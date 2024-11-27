import { Focus, Footprints, HeartPulse, SquareUserRound } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import { Button, Input, Label, ScrollView, Text, View, YStack } from 'tamagui';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { Difficulty } from '../../onboarding/data/entities/Difficulty';
import { FocusArea } from '../../onboarding/data/entities/FocusArea';
import { Gender } from '../../onboarding/data/entities/Gender';
import { HealthProblem } from '../../onboarding/data/entities/HealthProblem';

export function SettingsWorkoutProfileScreen() {
    const { t } = useTranslation();
    const { workoutProfile, setWorkoutProfile } = useWorkoutProfile();
    const [gender, setGender] = useState(workoutProfile.gender);
    const [focusAreas, setFocusAreas] = useState(workoutProfile.focusAreas);
    const [difficulty, setDifficulty] = useState(workoutProfile.difficulty);
    const [healthProblems, setHealthProblems] = useState(workoutProfile.healthProblems);
    const [height, setHeight] = useState(workoutProfile.height);
    const [weight, setWeight] = useState(workoutProfile.weight);
    const [edit, setEdit] = useState(false);

    const isFocusAreaValid = focusAreas.length > 0;

    const isHeightValid = height > 0 && height <= 300;

    const isWeightValid = weight > 0 && weight <= 700;

    const getDifficultyLabel = (d: Difficulty) => {
        if (d === Difficulty.Beginner) {
            return t('general.shared.beginner');
        }
        if (d === Difficulty.Intermediate) {
            return t('general.shared.intermediate');
        }
        if (d === Difficulty.Advanced) {
            return t('general.shared.advanced');
        }
        return t('settings.workout.profile.none');
    };

    const getFocusAreaLabel = (focusArea: FocusArea) => {
        switch (focusArea) {
            case FocusArea.FullBody:
                return t('general.shared.fullbody');
            case FocusArea.Arm:
                return t('general.shared.arm');
            case FocusArea.Abs:
                return t('general.shared.abs');
            case FocusArea.Butt:
                return t('general.shared.butt');
            case FocusArea.Leg:
                return t('general.shared.leg');
            default:
                return t('settings.workout.profile.none');
        }
    };

    const getGenderLabel = (g: Gender) => {
        if (g === Gender.Male) {
            return t('general.shared.male');
        }
        if (g === Gender.Female) {
            return t('general.shared.female');
        }
        return t('settings.workout.profile.none');
    };

    const getHealthProblemLabel = (healthProblem: HealthProblem) => {
        switch (healthProblem) {
            case HealthProblem.HeartCondition:
                return t('general.shared.heart.conditions');
            case HealthProblem.ChestPainWithPhysicalActivity:
                return t('general.shared.heart.chest.pain.with.physical.activity');
            case HealthProblem.ChestPainWithoutPhysicalActivity:
                return t('general.shared.heart.chest.pain.without.physical.activity');
            case HealthProblem.Dizziness:
                return t('general.shared.heart.dizziness');
            case HealthProblem.BoneOrJointProblem:
                return t('general.shared.heart.bone.or.joint.problem');
            case HealthProblem.UnderBloodPressureDrugs:
                return t('general.shared.heart.under.blood.pressure.drug');
            default:
                return t('settings.workout.profile.none');
        }
    };

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
                    <Label>{t('settings.workout.profile.gender')}</Label>
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
                        placeholder={t('settings.workout.profile.select.item')}
                        data={Object.values(Gender)
                            .filter((g) => g !== Gender.NONE)
                            .map((g) => ({
                                label: getGenderLabel(g),
                                value: g,
                            }))}
                        value={gender}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder={t('settings.workout.profile.search')}
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

                    <Label>{t('settings.workout.profile.focus.area')}</Label>
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
                        placeholder={t('settings.workout.profile.select.item')}
                        data={Object.values(FocusArea).map((area) => ({
                            label: getFocusAreaLabel(area),
                            value: area,
                        }))}
                        value={focusAreas}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder={t('settings.workout.profile.search')}
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
                            {t('settings.workout.profile.select.at.least.one.focus.area')}
                        </Text>
                    )}

                    <Label>{t('settings.workout.profile.difficulty')}</Label>
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
                        placeholder={t('settings.workout.profile.select.item')}
                        data={Object.values(Difficulty)
                            .filter((d) => d !== Difficulty.NONE)
                            .map((d) => ({
                                label: getDifficultyLabel(d),
                                value: d,
                            }))}
                        value={difficulty}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder={t('settings.workout.profile.search')}
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

                    <Label>{t('settings.workout.profile.health.conditions')}</Label>
                    <MultiSelect
                        disable={!edit}
                        inside
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
                        selectedStyle={{
                            borderRadius: 14,
                        }}
                        selectedTextStyle={{
                            color: edit ? 'black' : 'gray',
                        }}
                        search
                        placeholder={
                            healthProblems.length === 0
                                ? t('settings.workout.profile.none')
                                : t('settings.workout.profile.select.item')
                        }
                        data={Object.values(HealthProblem).map((p) => ({
                            label: getHealthProblemLabel(p),
                            value: p,
                        }))}
                        value={healthProblems}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder={t('settings.workout.profile.search')}
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

                    <Label>{t('settings.workout.profile.height.in.cm')}</Label>
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
                            {t('settings.workout.profile.height.between.0.and.300cm')}
                        </Text>
                    )}

                    <Label>{t('settings.workout.profile.weight.in.kg')}</Label>
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
                            {t('settings.workout.profile.weight.between.0.and.700kg')}
                        </Text>
                    )}
                </YStack>
            </ScrollView>
            <Button
                disabled={edit && (!isFocusAreaValid || !isHeightValid || !isWeightValid)}
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
                        text1: !edit
                            ? t('settings.workout.profile.edit.turned.on')
                            : t('settings.workout.profile.edit.turned.off'),
                        visibilityTime: 1000,
                    });
                    setEdit(!edit);
                }}
            >
                {edit ? t('general.shared.save') : t('general.shared.edit')}
            </Button>
        </View>
    );
}

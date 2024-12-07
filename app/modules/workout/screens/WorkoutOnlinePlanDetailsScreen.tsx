import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CheckCircle, Download, Minus, Plus } from '@tamagui/lucide-icons';
import { Asset } from 'expo-asset';
import { StatusBar } from 'expo-status-bar';
import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, Image, ScrollView, Separator, View, XStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { Sheet } from '../../../components/Sheet';
import { useLanguageCode } from '../../../context/LanguageCodeProvider';
import { useWorkoutOffline } from '../../../context/WorkoutOfflineProvider';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { LanguageCode } from '../../../lang/LanguageCode';
import { WorkoutExerciseDetailsSheetContent } from '../components/WorkoutExerciseDetailsSheet';
import { WorkoutExerciseOverview } from '../components/WorkoutExerciseOverview';
import { EXERCISES, ExerciseKey } from '../data/exercises';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';
import { WorkoutStackParamList } from '../navigation/WorkoutStackParamList';

export function WorkoutOnlinePlanDetailsScreen() {
    const { t } = useTranslation();
    const { navigate, goBack } = useWorkoutNavigation<'WorkoutOnlinePlanDetails'>();
    const { params } = useRoute<RouteProp<WorkoutStackParamList, 'WorkoutOnlinePlanDetails'>>();
    const { workoutProfile } = useWorkoutProfile();
    const { workoutPoints, healthProblems } = workoutProfile;
    const { languageCode } = useLanguageCode();
    const { offlineWorkouts, setOfflineWorkouts } = useWorkoutOffline();

    const getInitialMultiplier = () => {
        if (workoutPoints < 15) {
            switch (params.difficulty) {
                case 'beginner':
                    return 1;
                case 'intermediate':
                    return 0.75;
                case 'advanced':
                    return 0.5;
                default:
                    return 1;
            }
        }
        if (workoutPoints < 30) {
            switch (params.difficulty) {
                case 'beginner':
                    return 1.25;
                case 'intermediate':
                    return 1;
                case 'advanced':
                    return 0.75;
                default:
                    return 1;
            }
        }
        switch (params.difficulty) {
            case 'beginner':
                return 1.5;
            case 'intermediate':
                return 1.25;
            case 'advanced':
                return 1;
            default:
                return 1;
        }
    };

    const [multiplier, setMultiplier] = useState(getInitialMultiplier());

    const sheetRef = useRef<BottomSheetModal>(null);

    const [selectedExercise, setSelectedExercise] = useState<ExerciseKey>('jumpingJacks');
    const selectedExerciseDetails = params.exercises.find((exercise) => exercise.exerciseKey === selectedExercise)!;
    const [multiplierChangedAlertVisible, setMultiplierChangedAlertVisible] = useState(getInitialMultiplier() !== 1);

    const renderDialogContent = () => {
        if (healthProblems.length > 0 && params.difficulty !== 'beginner') {
            return (
                <>
                    <Heading>Oops</Heading>
                    <Paragraph>
                        We have detected health problems in your profile, it is recommended to continue with a workout
                        plan of beginner difficulty with a lower intensity.
                    </Paragraph>
                    <Button
                        themeInverse
                        onPress={() => {
                            goBack();
                        }}
                    >
                        Alright
                    </Button>
                    <Button
                        theme="red_active"
                        themeInverse
                        onPress={() => {
                            setMultiplierChangedAlertVisible(false);
                        }}
                    >
                        I understand the risks
                    </Button>
                </>
            );
        }

        if (getInitialMultiplier() > 1) {
            return (
                <>
                    <Heading>Great Progress!</Heading>
                    <Paragraph>
                        The workout multiplier has been raised to a value that is more suitable for your current fitness
                        level.
                    </Paragraph>
                    <Button
                        themeInverse
                        onPress={() => {
                            setMultiplierChangedAlertVisible(false);
                        }}
                    >
                        Alright
                    </Button>
                </>
            );
        }

        return (
            <>
                <Heading>Adjust Intensity</Heading>
                <Paragraph>
                    This workout might not be suitable for your current fitness level, you may choose to continue with
                    an adjusted intensity or choose a different workout.
                </Paragraph>
                <XStack columnGap="$3">
                    <Button
                        theme="red_active"
                        themeInverse
                        onPress={() => {
                            goBack();
                        }}
                    >
                        Go back
                    </Button>
                    <Button
                        themeInverse
                        onPress={() => {
                            setMultiplierChangedAlertVisible(false);
                        }}
                    >
                        Continue
                    </Button>
                </XStack>
            </>
        );
    };

    const isWorkoutSaved = offlineWorkouts.some((workout) => workout.id === params.id);

    return (
        <View flex={1}>
            <StatusBar
                style="light"
                animated
            />
            <View>
                <Image
                    style={{ height: 250, width: '100%' }}
                    objectFit="cover"
                    source={{ uri: params.imageUrl }}
                />
                <Heading
                    position="absolute"
                    l="$4"
                    b="$3"
                    color="white"
                    textShadowRadius={1}
                    textShadowColor="black"
                >
                    {languageCode === LanguageCode.ENGLISH ? params.titleEn : params.titleMs}
                </Heading>
            </View>
            <ScrollView flex={1}>
                <Paragraph
                    py="$3"
                    px="$4"
                >
                    {languageCode === LanguageCode.ENGLISH ? params.introductionEn : params.introductionMs}
                </Paragraph>
                <Separator borderColor="#D0D3D8" />
                <XStack
                    py="$3"
                    px="$4"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Paragraph>
                        {(params.estimatedDuration * multiplier).toFixed(0)} MINS | {params.exercises.length}{' '}
                        {t('workout.plan.details.exercises').toUpperCase()}
                    </Paragraph>
                    <XStack
                        alignItems="center"
                        justifyContent="center"
                        columnGap="$2"
                    >
                        <Button
                            circular
                            size="$2.5"
                            themeInverse
                            icon={
                                <Minus
                                    size="$1"
                                    strokeWidth={3}
                                />
                            }
                            onPress={() => {
                                if (multiplier - 0.25 < 0.5) return;
                                setMultiplier((prev) => prev - 0.25);
                            }}
                        />
                        <Label
                            textAlign="center"
                            width={40}
                        >
                            {multiplier.toFixed(2)}x
                        </Label>
                        <Button
                            circular
                            size="$2.5"
                            themeInverse
                            icon={
                                <Plus
                                    size="$1"
                                    strokeWidth={3}
                                />
                            }
                            onPress={() => {
                                if (multiplier + 0.25 > 2) return;
                                setMultiplier((prev) => prev + 0.25);
                            }}
                        />
                    </XStack>
                </XStack>
                <Separator borderColor="#D0D3D8" />
                {params.exercises.map((exercise, index) => {
                    const exerciseDetails = EXERCISES[exercise.exerciseKey];
                    return (
                        // Not having a stable key here is fine because the exercises are static
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={exercise.exerciseKey + index}>
                            {exercise.type === 'duration' ? (
                                <WorkoutExerciseOverview
                                    type={exercise.type}
                                    value={exercise.exerciseKey}
                                    title={exerciseDetails.title}
                                    duration={exercise.duration * multiplier}
                                    lottieSource={exerciseDetails.lottieSource}
                                    onValueChange={(exerciseKey) => {
                                        setSelectedExercise(exerciseKey);
                                        sheetRef.current?.present();
                                    }}
                                />
                            ) : (
                                <WorkoutExerciseOverview
                                    type={exercise.type}
                                    value={exercise.exerciseKey}
                                    title={exerciseDetails.title}
                                    reps={exercise.reps * multiplier}
                                    lottieSource={exerciseDetails.lottieSource}
                                    onValueChange={(exerciseKey) => {
                                        setSelectedExercise(exerciseKey);
                                        sheetRef.current?.present();
                                    }}
                                />
                            )}
                            <Separator borderColor="#D0D3D8" />
                        </Fragment>
                    );
                })}
            </ScrollView>
            <XStack
                p="$4"
                columnGap="$2"
            >
                <Button
                    themeInverse
                    borderRadius="$8"
                    flex={1}
                    onPress={() => {
                        navigate('WorkoutOnlineStartInitial', { ...params, multiplier });
                    }}
                >
                    {t('general.shared.start')}
                </Button>
                <Button
                    themeInverse
                    borderRadius="$8"
                    onPress={async () => {
                        if (isWorkoutSaved) {
                            setOfflineWorkouts(offlineWorkouts.filter((workout) => workout.id !== params.id));
                            return;
                        }
                        const onlineAsset = await Asset.fromURI(params.imageUrl);
                        // @ts-expect-error
                        onlineAsset.type = 'jpg';
                        const downloadedAsset = await onlineAsset.downloadAsync();
                        setOfflineWorkouts([
                            ...offlineWorkouts,
                            { ...params, imageUrl: downloadedAsset.localUri ?? '' },
                        ]);
                    }}
                >
                    {isWorkoutSaved ? <CheckCircle color="white" /> : <Download color="white" />}
                </Button>
            </XStack>

            <Sheet
                ref={sheetRef}
                snapPoints={['85%']}
            >
                <WorkoutExerciseDetailsSheetContent
                    {...selectedExerciseDetails}
                    {...EXERCISES[selectedExercise]}
                />
            </Sheet>
            <Dialog
                open={multiplierChangedAlertVisible}
                modal
            >
                <Dialog.Portal>
                    <Dialog.Overlay key="overlay" />
                    <Dialog.Content
                        margin="$4"
                        rowGap="$3"
                        key="content"
                    >
                        {renderDialogContent()}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </View>
    );
}

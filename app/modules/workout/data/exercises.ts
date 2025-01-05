import { useTranslation } from 'react-i18next';
import { LottieAssets } from '../../../assets/lottie';
import { Exercise } from './entities/Exercise';

export const useExercises = () => {
    const { t } = useTranslation('exercise');
    return {
        jumpingJacks: {
            title: t('jumpingJacks.title'),
            lottieSource: LottieAssets.jumpingJacks,
            instructions: t('jumpingJacks.instructions'),
            focusAreas: ['Shoulders', 'Quadriceps', 'Chest', 'Adductors', 'Glutes', 'Calves'],
            commonMistakes: [
                {
                    title: t('jumpingJacks.commonMistakes.1.title'),
                    description: t('jumpingJacks.commonMistakes.1.description'),
                },
                {
                    title: t('jumpingJacks.commonMistakes.2.title'),
                    description: t('jumpingJacks.commonMistakes.2.description'),
                },
                {
                    title: t('jumpingJacks.commonMistakes.3.title'),
                    description: t('jumpingJacks.commonMistakes.3.description'),
                },
            ],
            breathingTips: [
                t('jumpingJacks.breathingTips.1'),
                t('jumpingJacks.breathingTips.2'),
                t('jumpingJacks.breathingTips.3'),
            ],
            difficulty: 'vigorous',
        },
        pushUp: {
            title: t('pushUp.title'),
            lottieSource: LottieAssets.pushUp,
            instructions: t('pushUp.instructions'),
            focusAreas: ['Shoulders', 'Quadriceps', 'Chest', 'Adductors', 'Glutes', 'Calves'],
            commonMistakes: [
                {
                    title: t('pushUp.commonMistakes.1.title'),
                    description: t('pushUp.commonMistakes.1.description'),
                },
                {
                    title: t('pushUp.commonMistakes.2.title'),
                    description: t('pushUp.commonMistakes.2.description'),
                },
                {
                    title: t('pushUp.commonMistakes.3.title'),
                    description: t('pushUp.commonMistakes.3.description'),
                },
            ],
            breathingTips: [t('pushUp.breathingTips.1'), t('pushUp.breathingTips.2'), t('pushUp.breathingTips.3')],
            difficulty: 'moderate',
        },
        abdominalCrunches: {
            title: t('abdominalCrunches.title'),
            lottieSource: LottieAssets.abdominalCrunches,
            instructions: t('abdominalCrunches.instructions'),
            focusAreas: ['Abs'],
            commonMistakes: [
                {
                    title: t('abdominalCrunches.commonMistakes.1.title'),
                    description: t('abdominalCrunches.commonMistakes.1.description'),
                },
                {
                    title: t('abdominalCrunches.commonMistakes.2.title'),
                    description: t('abdominalCrunches.commonMistakes.2.description'),
                },
                {
                    title: t('abdominalCrunches.commonMistakes.3.title'),
                    description: t('abdominalCrunches.commonMistakes.3.description'),
                },
            ],
            breathingTips: [
                t('abdominalCrunches.breathingTips.1'),
                t('abdominalCrunches.breathingTips.2'),
                t('abdominalCrunches.breathingTips.3'),
            ],
            difficulty: 'low',
        },
        inclinePushUp: {
            title: t('inclinePushUp.title'),
            lottieSource: LottieAssets.inclinePushUp,
            instructions: t('inclinePushUp.instructions'),
            focusAreas: ['Shoulders', 'Chest', 'Triceps'],
            commonMistakes: [
                {
                    title: t('inclinePushUp.commonMistakes.1.title'),
                    description: t('inclinePushUp.commonMistakes.1.description'),
                },
                {
                    title: t('inclinePushUp.commonMistakes.2.title'),
                    description: t('inclinePushUp.commonMistakes.2.description'),
                },
                {
                    title: t('inclinePushUp.commonMistakes.3.title'),
                    description: t('inclinePushUp.commonMistakes.3.description'),
                },
                {
                    title: t('inclinePushUp.commonMistakes.4.title'),
                    description: t('inclinePushUp.commonMistakes.4.description'),
                },
            ],
            breathingTips: [t('inclinePushUp.breathingTips.1'), t('inclinePushUp.breathingTips.2')],
            difficulty: 'low',
        },
        legRaises: {
            title: t('legRaises.title'),
            lottieSource: LottieAssets.legRaises,
            instructions: t('legRaises.instructions'),
            focusAreas: ['Abs', 'Glutes', 'Quadriceps'],
            commonMistakes: [
                {
                    title: t('legRaises.commonMistakes.1.title'),
                    description: t('legRaises.commonMistakes.1.description'),
                },
                {
                    title: t('legRaises.commonMistakes.2.title'),
                    description: t('legRaises.commonMistakes.2.description'),
                },
                {
                    title: t('legRaises.commonMistakes.3.title'),
                    description: t('legRaises.commonMistakes.3.description'),
                },
                {
                    title: t('legRaises.commonMistakes.4.title'),
                    description: t('legRaises.commonMistakes.4.description'),
                },
            ],
            breathingTips: [
                t('legRaises.breathingTips.1'),
                t('legRaises.breathingTips.2'),
                t('legRaises.breathingTips.3'),
            ],
            difficulty: 'moderate',
        },
        mountainClimber: {
            title: t('mountainClimber.title'),
            lottieSource: LottieAssets.mountainClimber,
            instructions: t('mountainClimber.instructions'),
            focusAreas: ['Abs', 'Glutes', 'Quadriceps', 'Lower back', 'Calves'],
            commonMistakes: [
                {
                    title: t('mountainClimber.commonMistakes.1.title'),
                    description: t('mountainClimber.commonMistakes.1.description'),
                },
                {
                    title: t('mountainClimber.commonMistakes.2.title'),
                    description: t('mountainClimber.commonMistakes.2.description'),
                },
                {
                    title: t('mountainClimber.commonMistakes.3.title'),
                    description: t('mountainClimber.commonMistakes.3.description'),
                },
                {
                    title: t('mountainClimber.commonMistakes.4.title'),
                    description: t('mountainClimber.commonMistakes.4.description'),
                },
            ],
            breathingTips: [t('mountainClimber.breathingTips.1'), t('mountainClimber.breathingTips.2')],
            difficulty: 'moderate',
        },
        wideArmPushUp: {
            title: t('wideArmPushUp.title'),
            lottieSource: LottieAssets.wideArmPushUp,
            instructions: t('wideArmPushUp.instructions'),
            focusAreas: ['Chest', 'Triceps', 'Shoulders'],
            commonMistakes: [
                {
                    title: t('wideArmPushUp.commonMistakes.1.title'),
                    description: t('wideArmPushUp.commonMistakes.1.description'),
                },
                {
                    title: t('wideArmPushUp.commonMistakes.2.title'),
                    description: t('wideArmPushUp.commonMistakes.2.description'),
                },
                {
                    title: t('wideArmPushUp.commonMistakes.3.title'),
                    description: t('wideArmPushUp.commonMistakes.3.description'),
                },
                {
                    title: t('wideArmPushUp.commonMistakes.4.title'),
                    description: t('wideArmPushUp.commonMistakes.4.description'),
                },
            ],
            breathingTips: [
                t('wideArmPushUp.breathingTips.1'),
                t('wideArmPushUp.breathingTips.2'),
                t('wideArmPushUp.breathingTips.3'),
            ],
            difficulty: 'moderate',
        },
        kneePushUp: {
            title: t('kneePushUp.title'),
            lottieSource: LottieAssets.kneePushUp,
            instructions: t('kneePushUp.instructions'),
            focusAreas: ['Chest', 'Triceps', 'Shoulders'],
            commonMistakes: [
                {
                    title: t('kneePushUp.commonMistakes.1.title'),
                    description: t('kneePushUp.commonMistakes.1.description'),
                },
                {
                    title: t('kneePushUp.commonMistakes.2.title'),
                    description: t('kneePushUp.commonMistakes.2.description'),
                },
                {
                    title: t('kneePushUp.commonMistakes.3.title'),
                    description: t('kneePushUp.commonMistakes.3.description'),
                },
                {
                    title: t('kneePushUp.commonMistakes.4.title'),
                    description: t('kneePushUp.commonMistakes.4.description'),
                },
            ],
            breathingTips: [
                t('kneePushUp.breathingTips.1'),
                t('kneePushUp.breathingTips.2'),
                t('kneePushUp.breathingTips.3'),
            ],
            difficulty: 'low',
        },
        squat: {
            title: t('squat.title'),
            lottieSource: LottieAssets.squat,
            instructions: t('squat.instructions'),
            focusAreas: ['Glutes', 'Quadriceps', 'Hamstrings', 'Calves'],
            commonMistakes: [
                {
                    title: t('squat.commonMistakes.1.title'),
                    description: t('squat.commonMistakes.1.description'),
                },
                {
                    title: t('squat.commonMistakes.2.title'),
                    description: t('squat.commonMistakes.2.description'),
                },
                {
                    title: t('squat.commonMistakes.3.title'),
                    description: t('squat.commonMistakes.3.description'),
                },
                {
                    title: t('squat.commonMistakes.4.title'),
                    description: t('squat.commonMistakes.4.description'),
                },
            ],
            breathingTips: [t('squat.breathingTips.1'), t('squat.breathingTips.2'), t('squat.breathingTips.3')],
            difficulty: 'low',
        },
        cobraStretch: {
            title: t('cobraStretch.title'),
            lottieSource: LottieAssets.cobraStretch,
            instructions: t('cobraStretch.instructions'),
            focusAreas: ['Abs', 'Glutes', 'Hamstrings'],
            commonMistakes: [
                {
                    title: t('cobraStretch.commonMistakes.1.title'),
                    description: t('cobraStretch.commonMistakes.1.description'),
                },
                {
                    title: t('cobraStretch.commonMistakes.2.title'),
                    description: t('cobraStretch.commonMistakes.2.description'),
                },
                {
                    title: t('cobraStretch.commonMistakes.3.title'),
                    description: t('cobraStretch.commonMistakes.3.description'),
                },
            ],
            breathingTips: [t('cobraStretch.breathingTips.1'), t('cobraStretch.breathingTips.2')],
            difficulty: 'low',
        },
        lumbarTwist: {
            title: t('lumbarTwist.title'),
            lottieSource: LottieAssets.lumbarTwist,
            instructions: t('lumbarTwist.instructions'),
            focusAreas: ['Abs', 'Glutes', 'Back', 'Traps'],
            commonMistakes: [
                {
                    title: t('lumbarTwist.commonMistakes.1.title'),
                    description: t('lumbarTwist.commonMistakes.1.description'),
                },
                {
                    title: t('lumbarTwist.commonMistakes.2.title'),
                    description: t('lumbarTwist.commonMistakes.2.description'),
                },
                {
                    title: t('lumbarTwist.commonMistakes.3.title'),
                    description: t('lumbarTwist.commonMistakes.3.description'),
                },
                {
                    title: t('lumbarTwist.commonMistakes.4.title'),
                    description: t('lumbarTwist.commonMistakes.4.description'),
                },
            ],
            breathingTips: [t('lumbarTwist.breathingTips.1'), t('lumbarTwist.breathingTips.2')],
            difficulty: 'low',
        },
        doorwayStretch: {
            title: t('doorwayStretch.title'),
            lottieSource: LottieAssets.doorwayStretch,
            instructions: t('doorwayStretch.instructions'),
            focusAreas: ['Chest', 'Shoulders', 'Biceps', 'Back'],
            commonMistakes: [
                {
                    title: t('doorwayStretch.commonMistakes.1.title'),
                    description: t('doorwayStretch.commonMistakes.1.description'),
                },
                {
                    title: t('doorwayStretch.commonMistakes.2.title'),
                    description: t('doorwayStretch.commonMistakes.2.description'),
                },
                {
                    title: t('doorwayStretch.commonMistakes.3.title'),
                    description: t('doorwayStretch.commonMistakes.3.description'),
                },
                {
                    title: t('doorwayStretch.commonMistakes.4.title'),
                    description: t('doorwayStretch.commonMistakes.4.description'),
                },
            ],
            breathingTips: [t('doorwayStretch.breathingTips.1'), t('doorwayStretch.breathingTips.2')],
            difficulty: 'low',
        },
        sitUp: {
            title: t('sitUp.title'),
            lottieSource: LottieAssets.sitUp,
            instructions: t('sitUp.instructions'),
            focusAreas: ['Abs'],
            commonMistakes: [
                {
                    title: t('sitUp.commonMistakes.1.title'),
                    description: t('sitUp.commonMistakes.1.description'),
                },
                {
                    title: t('sitUp.commonMistakes.2.title'),
                    description: t('sitUp.commonMistakes.2.description'),
                },
                {
                    title: t('sitUp.commonMistakes.3.title'),
                    description: t('sitUp.commonMistakes.3.description'),
                },
                {
                    title: t('sitUp.commonMistakes.4.title'),
                    description: t('sitUp.commonMistakes.4.description'),
                },
            ],
            breathingTips: [t('sitUp.breathingTips.1'), t('sitUp.breathingTips.2'), t('sitUp.breathingTips.3')],
            difficulty: 'low',
        },
        reverseLunges: {
            title: t('reverseLunges.title'),
            lottieSource: LottieAssets.reverseLunges,
            instructions: t('reverseLunges.instructions'),
            focusAreas: ['Glutes', 'Quadriceps', 'Hamstrings', 'Calves'],
            commonMistakes: [
                {
                    title: t('reverseLunges.commonMistakes.1.title'),
                    description: t('reverseLunges.commonMistakes.1.description'),
                },
                {
                    title: t('reverseLunges.commonMistakes.2.title'),
                    description: t('reverseLunges.commonMistakes.2.description'),
                },
                {
                    title: t('reverseLunges.commonMistakes.3.title'),
                    description: t('reverseLunges.commonMistakes.3.description'),
                },
                {
                    title: t('reverseLunges.commonMistakes.4.title'),
                    description: t('reverseLunges.commonMistakes.4.description'),
                },
            ],
            breathingTips: [
                t('reverseLunges.breathingTips.1'),
                t('reverseLunges.breathingTips.2'),
                t('reverseLunges.breathingTips.3'),
            ],
            difficulty: 'moderate',
        },
        burpee: {
            title: t('burpee.title'),
            lottieSource: LottieAssets.burpee,
            instructions: t('burpee.instructions'),
            focusAreas: ['Chest', 'Triceps', 'Shoulders', 'Quadriceps', 'Glutes', 'Abs'],
            commonMistakes: [
                {
                    title: t('burpee.commonMistakes.1.title'),
                    description: t('burpee.commonMistakes.1.description'),
                },
                {
                    title: t('burpee.commonMistakes.2.title'),
                    description: t('burpee.commonMistakes.2.description'),
                },
                {
                    title: t('burpee.commonMistakes.3.title'),
                    description: t('burpee.commonMistakes.3.description'),
                },
                {
                    title: t('burpee.commonMistakes.4.title'),
                    description: t('burpee.commonMistakes.4.description'),
                },
            ],
            breathingTips: [
                t('burpee.breathingTips.1'),
                t('burpee.breathingTips.2'),
                t('burpee.breathingTips.3'),
                t('burpee.breathingTips.4'),
            ],
            difficulty: 'vigorous',
        },
        crunch: {
            title: t('crunch.title'),
            lottieSource: LottieAssets.crunch,
            instructions: t('crunch.instructions'),
            focusAreas: ['Abs'],
            commonMistakes: [
                {
                    title: t('crunch.commonMistakes.1.title'),
                    description: t('crunch.commonMistakes.1.description'),
                },
                {
                    title: t('crunch.commonMistakes.2.title'),
                    description: t('crunch.commonMistakes.2.description'),
                },
                {
                    title: t('crunch.commonMistakes.3.title'),
                    description: t('crunch.commonMistakes.3.description'),
                },
                {
                    title: t('crunch.commonMistakes.4.title'),
                    description: t('crunch.commonMistakes.4.description'),
                },
            ],
            breathingTips: [t('crunch.breathingTips.1'), t('crunch.breathingTips.2'), t('crunch.breathingTips.3')],
            difficulty: 'moderate',
        },
        kneelingSquat: {
            title: t('kneelingSquat.title'),
            lottieSource: LottieAssets.kneelingSquat,
            instructions: t('kneelingSquat.instructions'),
            focusAreas: ['Glutes', 'Quadriceps', 'Hamstrings'],
            commonMistakes: [
                {
                    title: t('kneelingSquat.commonMistakes.1.title'),
                    description: t('kneelingSquat.commonMistakes.1.description'),
                },
                {
                    title: t('kneelingSquat.commonMistakes.2.title'),
                    description: t('kneelingSquat.commonMistakes.2.description'),
                },
                {
                    title: t('kneelingSquat.commonMistakes.3.title'),
                    description: t('kneelingSquat.commonMistakes.3.description'),
                },
            ],
            breathingTips: [
                t('kneelingSquat.breathingTips.1'),
                t('kneelingSquat.breathingTips.2'),
                t('kneelingSquat.breathingTips.3'),
            ],
            difficulty: 'low',
        },
    } as const satisfies Record<string, Exercise>;
};

export type ExerciseKey = keyof ReturnType<typeof useExercises>;

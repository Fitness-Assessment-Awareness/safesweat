import { useTranslation } from 'react-i18next';
import { Difficulty } from '../../onboarding/data/entities/Difficulty';
import { FocusArea } from '../../onboarding/data/entities/FocusArea';
import { WorkoutAssets } from '../assets';
import { Workout } from './entities/Workout';

export const useWorkouts = () => {
    const { t } = useTranslation('workouts');
    return {
        absBeginner: {
            title: t('absBeginner.title'),
            difficulty: Difficulty.Beginner,
            estimatedDuration: 20,
            focusArea: FocusArea.Abs,
            exercises: [
                { type: 'duration', duration: 20, exerciseKey: 'jumpingJacks' },
                { type: 'reps', reps: 16, exerciseKey: 'abdominalCrunches' },
                { type: 'reps', reps: 16, exerciseKey: 'mountainClimber' },
                { type: 'reps', reps: 16, exerciseKey: 'legRaises' },
                { type: 'reps', reps: 16, exerciseKey: 'abdominalCrunches' },
                { type: 'reps', reps: 16, exerciseKey: 'mountainClimber' },
                { type: 'reps', reps: 16, exerciseKey: 'legRaises' },
                { type: 'duration', duration: 30, exerciseKey: 'cobraStretch' },
                { type: 'duration', duration: 30, exerciseKey: 'lumbarTwist' },
            ],
            thumbnail: WorkoutAssets.absBeginner,
        },
        chestBeginner: {
            title: t('chestBeginner.title'),
            estimatedDuration: 11,
            difficulty: Difficulty.Beginner,
            focusArea: FocusArea.Abs,
            exercises: [
                { type: 'duration', duration: 30, exerciseKey: 'jumpingJacks' },
                { type: 'reps', reps: 16, exerciseKey: 'inclinePushUp' },
                { type: 'reps', reps: 12, exerciseKey: 'kneePushUp' },
                { type: 'reps', reps: 10, exerciseKey: 'pushUp' },
                { type: 'reps', reps: 10, exerciseKey: 'wideArmPushUp' },
                { type: 'reps', reps: 12, exerciseKey: 'inclinePushUp' },
                { type: 'reps', reps: 12, exerciseKey: 'kneePushUp' },
                { type: 'reps', reps: 10, exerciseKey: 'pushUp' },
                { type: 'reps', reps: 10, exerciseKey: 'wideArmPushUp' },
                { type: 'duration', duration: 20, exerciseKey: 'cobraStretch' },
                { type: 'duration', duration: 20, exerciseKey: 'doorwayStretch' },
            ],
            thumbnail: WorkoutAssets.chestBeginner,
        },
        absIntermediate: {
            title: t('absIntermediate.title'),
            estimatedDuration: 20,
            difficulty: Difficulty.Intermediate,
            focusArea: FocusArea.Abs,
            exercises: [{ type: 'duration', duration: 20, exerciseKey: 'jumpingJacks' }],
            thumbnail: WorkoutAssets.absBeginner,
        },
        chestIntermediate: {
            title: t('chestIntermediate.title'),
            estimatedDuration: 20,
            focusArea: FocusArea.Abs,
            difficulty: Difficulty.Intermediate,
            exercises: [{ type: 'duration', duration: 20, exerciseKey: 'jumpingJacks' }],
            thumbnail: WorkoutAssets.absBeginner,
        },
        absAdvanced: {
            title: t('absAdvanced.title'),
            estimatedDuration: 20,
            focusArea: FocusArea.Abs,
            difficulty: Difficulty.Advanced,
            exercises: [{ type: 'duration', duration: 20, exerciseKey: 'jumpingJacks' }],
            thumbnail: WorkoutAssets.absBeginner,
        },
        chestAdvanced: {
            title: t('chestAdvanced.title'),
            estimatedDuration: 20,
            difficulty: Difficulty.Advanced,
            focusArea: FocusArea.Abs,
            exercises: [{ type: 'duration', duration: 20, exerciseKey: 'jumpingJacks' }],
            thumbnail: WorkoutAssets.absBeginner,
        },
    } as const satisfies Record<string, Workout>;
};

export type WorkoutKey = keyof ReturnType<typeof useWorkouts>;

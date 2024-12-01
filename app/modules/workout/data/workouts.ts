import { FocusArea } from '../../onboarding/data/entities/FocusArea';
import { WorkoutAssets } from '../assets';
import { Workout } from './entities/Workout';

export const WORKOUTS = {
    absBeginner: {
        title: 'ABS BEGINNER',
        difficulty: 'beginner',
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
        title: 'CHEST BEGINNER',
        estimatedDuration: 11,
        difficulty: 'beginner',
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
        title: 'ABS INTERMEDIATE',
        estimatedDuration: 20,
        difficulty: 'intermediate',
        focusArea: FocusArea.Abs,
        exercises: [{ type: 'duration', duration: 20, exerciseKey: 'jumpingJacks' }],
        thumbnail: WorkoutAssets.absBeginner,
    },
    chestIntermediate: {
        title: 'CHEST INTERMEDIATE',
        estimatedDuration: 20,
        focusArea: FocusArea.Abs,
        difficulty: 'intermediate',
        exercises: [{ type: 'duration', duration: 20, exerciseKey: 'jumpingJacks' }],
        thumbnail: WorkoutAssets.absBeginner,
    },
    absAdvanced: {
        title: 'ABS ADVANCED',
        estimatedDuration: 20,
        focusArea: FocusArea.Abs,
        difficulty: 'advanced',
        exercises: [{ type: 'duration', duration: 20, exerciseKey: 'jumpingJacks' }],
        thumbnail: WorkoutAssets.absBeginner,
    },
    chestAdvanced: {
        title: 'CHEST ADVANCED',
        estimatedDuration: 20,
        difficulty: 'advanced',
        focusArea: FocusArea.Abs,
        exercises: [{ type: 'duration', duration: 20, exerciseKey: 'jumpingJacks' }],
        thumbnail: WorkoutAssets.absBeginner,
    },
} as const satisfies Record<string, Workout>;

export type WorkoutKey = keyof typeof WORKOUTS;

import { WorkoutAssets } from '../assets';
import { Workout } from './entities/Workout';

export const WORKOUTS = {
    absBeginner: {
        title: 'ABS BEGINNER',
        difficulty: 'beginner',
        estimatedDuration: 20,
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
        thumbnail: WorkoutAssets.workoutBeginner,
    },
} as const satisfies Record<string, Workout>;

export type WorkoutKey = keyof typeof WORKOUTS;

import { WorkoutAssets } from '../assets';
import { Workout } from './entities/Workout';

export const WORKOUTS = {
    absBeginner: {
        title: 'ABS BEGINNER',
        difficulty: 'beginner',
        estimatedDuration: 20,
        exercises: [
            { type: 'duration', duration: 20, exerciseKey: 'jumpingJacks' },
            { type: 'reps', reps: 5, exerciseKey: 'pushUp' },
        ],
        thumbnail: WorkoutAssets.workoutBeginner,
    },
} as const satisfies Record<string, Workout>;

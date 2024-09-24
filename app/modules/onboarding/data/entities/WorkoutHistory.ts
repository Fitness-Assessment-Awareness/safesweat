import { WorkoutKey } from '../../workout/data/workouts';

export interface WorkoutHistory {
    workoutKey: WorkoutKey;
    timestamp: string;
    rating: number | null;
}

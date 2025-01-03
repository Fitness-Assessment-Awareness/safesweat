import { WorkoutKey } from '../../../workout/data/workouts';
import { Difficulty } from './Difficulty';

interface WorkoutLocalHistory {
    type: 'local';
    workoutKey: WorkoutKey;
    timestamp: string;
    rating: number | null;
    multiplier: number;
    caloriesBurned: number;
    timeTaken: number;
}

interface WorkoutOnlineHistory {
    type: 'online';
    titleEn: string;
    titleMs: string;
    timestamp: string;
    rating: number | null;
    multiplier: number;
    imageUrl: string;
    difficulty: Difficulty;
    caloriesBurned: number;
    timeTaken: number;
}

export type WorkoutHistory = WorkoutLocalHistory | WorkoutOnlineHistory;

export type UserBackupWorkoutHistoryDto = WorkoutHistory & { userId: string };

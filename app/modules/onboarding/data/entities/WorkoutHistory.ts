import { WorkoutKey } from '../../../workout/data/workouts';

interface WorkoutLocalHistory {
    type: 'local';
    workoutKey: WorkoutKey;
    timestamp: string;
    rating: number | null;
    multiplier: number;
}

interface WorkoutOnlineHistory {
    type: 'online';
    titleEn: string;
    titleMs: string;
    timestamp: string;
    rating: number | null;
    multiplier: number;
    imageUrl: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export type WorkoutHistory = WorkoutLocalHistory | WorkoutOnlineHistory;

export type UserBackupWorkoutHistoryDto = WorkoutHistory & { userId: string };

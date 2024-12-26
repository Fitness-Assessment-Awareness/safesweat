import { Difficulty } from '../../onboarding/data/entities/Difficulty';

export function getWorkoutLevel(workoutPoints: number) {
    if (workoutPoints < 15) {
        return Difficulty.Beginner;
    }
    if (workoutPoints < 30) {
        return Difficulty.Intermediate;
    }
    return Difficulty.Advanced;
}

import { FocusArea } from '../../../onboarding/data/entities/FocusArea';
import { ExerciseKey } from '../exercises';

interface WorkoutPlanExerciseReps {
    planId: string;
    exerciseId: string;
    exerciseKey: ExerciseKey;
    repCount: number;
}
interface WorkoutPlanExerciseDuration {
    planId: string;
    exerciseId: string;
    exerciseKey: ExerciseKey;
    estimatedTimeSecond: number;
}

export function isWorkoutPlanExerciseReps(exercise: WorkoutPlanExercise): exercise is WorkoutPlanExerciseReps {
    return (exercise as WorkoutPlanExerciseReps).repCount !== undefined;
}

export function isWorkoutPlanExerciseDuration(exercise: WorkoutPlanExercise): exercise is WorkoutPlanExerciseDuration {
    return (exercise as WorkoutPlanExerciseDuration).estimatedTimeSecond !== undefined;
}

type WorkoutPlanExercise = WorkoutPlanExerciseReps | WorkoutPlanExerciseDuration;

export interface WorkoutListAllPlanAPIModel {
    planId: string;
    titleEn: string;
    titleMs: string;
    estimatedTimeMinute: number;
    focusAreaId: string;
    focusAreaDto: {
        focusAreaId: string;
        name: FocusArea;
    };
    introductionEn: string;
    introductionMs: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    workoutPlanExerciseDtos: WorkoutPlanExercise[];
    imageUrl: string;
}

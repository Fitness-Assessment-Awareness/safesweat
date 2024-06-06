import { ExerciseKey } from '../exercises';

interface BaseWorkoutExercise {
    exerciseKey: ExerciseKey;
}

interface WorkoutExerciseReps extends BaseWorkoutExercise {
    type: 'reps';
    reps: number;
}

interface WorkoutExerciseDuration extends BaseWorkoutExercise {
    type: 'duration';
    duration: number;
}

export type WorkoutExercise = WorkoutExerciseReps | WorkoutExerciseDuration;

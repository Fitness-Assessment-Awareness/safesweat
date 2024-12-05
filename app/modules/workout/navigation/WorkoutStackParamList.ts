import { WorkoutKey } from '../data/workouts';

interface WorkoutPlanDetailsParams {
    workoutKey: WorkoutKey;
}

interface WorkoutStartInitialParams {
    workoutKey: WorkoutKey;
    multiplier: number;
}

interface WorkoutRestingParams {
    workoutKey: WorkoutKey;
    index: number;
    multiplier: number;
}

interface WorkoutExercisingParams {
    workoutKey: WorkoutKey;
    index: number;
    multiplier: number;
}

interface WorkoutSuccessParams {
    workoutKey: WorkoutKey;
}

export type WorkoutStackParamList = {
    WorkoutLanding: undefined;
    WorkoutPlanDetails: WorkoutPlanDetailsParams;
    WorkoutRoutinePlanning: undefined;
    WorkoutHistory: undefined;
    WorkoutOnlineExercise: undefined;
};

export type WorkoutRootStackParamList = {
    WorkoutStartInitial: WorkoutStartInitialParams;
    WorkoutResting: WorkoutRestingParams;
    WorkoutExercising: WorkoutExercisingParams;
    WorkoutSuccess: WorkoutSuccessParams;
};

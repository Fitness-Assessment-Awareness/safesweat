import { WorkoutKey } from '../data/workouts';

interface WorkoutPlanDetailsParams {
    workoutKey: WorkoutKey;
}

interface WorkoutStartInitialParams {
    workoutKey: WorkoutKey;
}

interface WorkoutRestingParams {
    workoutKey: WorkoutKey;
    index: number;
}

interface WorkoutExercisingParams {
    workoutKey: WorkoutKey;
    index: number;
}

interface WorkoutSuccessParams {
    workoutKey: WorkoutKey;
}

export type WorkoutStackParamList = {
    WorkoutLanding: undefined;
    WorkoutPlanDetails: WorkoutPlanDetailsParams;
    WorkoutRoutinePlanning: undefined;
};

export type WorkoutRootStackParamList = {
    WorkoutStartInitial: WorkoutStartInitialParams;
    WorkoutResting: WorkoutRestingParams;
    WorkoutExercising: WorkoutExercisingParams;
    WorkoutSuccess: WorkoutSuccessParams;
};

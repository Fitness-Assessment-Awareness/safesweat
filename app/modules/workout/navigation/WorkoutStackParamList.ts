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

export type WorkoutStackParamList = {
    WorkoutLanding: undefined;
    WorkoutPlanDetails: WorkoutPlanDetailsParams;
};

export type WorkoutRootStackParamList = {
    WorkoutStartInitial: WorkoutStartInitialParams;
    WorkoutResting: WorkoutRestingParams;
};

import { WorkoutListAllPlan } from '../data/entities/WorkoutListAll';
import { WorkoutKey } from '../data/workouts';

interface WorkoutPlanDetailsParams {
    workoutKey: WorkoutKey;
}

type WorkoutOnlinePlanDetailsParams = WorkoutListAllPlan;
type WorkoutOnlineStartInitialParams = WorkoutListAllPlan & { multiplier: number };
type WorkoutOnlineExercisingParams = WorkoutListAllPlan & {
    index: number;
    multiplier: number;
    timeTaken: number;
    caloriesBurned: number;
};
type WorkoutOnlineRestingParams = WorkoutListAllPlan & {
    index: number;
    multiplier: number;
    timeTaken: number;
    caloriesBurned: number;
};

interface WorkoutStartInitialParams {
    workoutKey: WorkoutKey;
    multiplier: number;
}

interface WorkoutRestingParams {
    workoutKey: WorkoutKey;
    index: number;
    multiplier: number;
    timeTaken: number;
    caloriesBurned: number;
}

interface WorkoutExercisingParams {
    workoutKey: WorkoutKey;
    index: number;
    multiplier: number;
    timeTaken: number;
    caloriesBurned: number;
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
    WorkoutOnlinePlanDetails: WorkoutOnlinePlanDetailsParams;
};

export type WorkoutRootStackParamList = {
    WorkoutStartInitial: WorkoutStartInitialParams;
    WorkoutResting: WorkoutRestingParams;
    WorkoutExercising: WorkoutExercisingParams;
    WorkoutSuccess: WorkoutSuccessParams;
    WorkoutOnlineStartInitial: WorkoutOnlineStartInitialParams;
    WorkoutOnlineExercising: WorkoutOnlineExercisingParams;
    WorkoutOnlineResting: WorkoutOnlineRestingParams;
    WorkoutOnlineSuccess: undefined;
};

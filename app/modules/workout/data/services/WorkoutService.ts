import { Network } from '../../../../network/Network';
import { Difficulty } from '../../../onboarding/data/entities/Difficulty';
import { WorkoutListAllPlan } from '../entities/WorkoutListAll';
import { isWorkoutPlanExerciseDuration, WorkoutListAllPlanAPIModel } from '../entities/WorkoutListAllAPIModel';

export namespace WorkoutService {
    const baseUrl = '/workout-plan';
    export async function listAllPlan(): Promise<WorkoutListAllPlan[]> {
        const response = await Network.get<WorkoutListAllPlanAPIModel[]>(`${baseUrl}/list`);

        return response.data.map((plan) => ({
            id: plan.planId,
            titleEn: plan.titleEn,
            titleMs: plan.titleMs,
            introductionEn: plan.introductionEn,
            introductionMs: plan.introductionMs,
            estimatedDuration: plan.estimatedTimeMinute,
            difficulty: plan.difficulty as Difficulty,
            focusArea: plan.focusAreaDto.name,
            exercises: plan.workoutPlanExerciseDtos.map((exercise) => {
                if (isWorkoutPlanExerciseDuration(exercise)) {
                    return {
                        type: 'duration',
                        exerciseKey: exercise.exerciseKey,
                        duration: exercise.estimatedTimeSecond,
                    };
                }
                return {
                    type: 'reps',
                    exerciseKey: exercise.exerciseKey,
                    reps: exercise.repCount,
                };
            }),
            imageUrl: plan.imageUrl,
        }));
    }
}

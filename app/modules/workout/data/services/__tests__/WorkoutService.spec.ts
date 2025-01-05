import { Network } from '../../../../../network/Network';
import { Difficulty } from '../../../../onboarding/data/entities/Difficulty';
import { FocusArea } from '../../../../onboarding/data/entities/FocusArea';
import { WorkoutListAllPlanAPIModel } from '../../entities/WorkoutListAllAPIModel';
import { WorkoutService } from '../WorkoutService';

jest.mock('../../../../../network/Network');

describe('WorkoutService', () => {
    describe('listAllPlan', () => {
        it('should return a list of workout plans', async () => {
            const mockResponse: WorkoutListAllPlanAPIModel[] = [
                {
                    planId: '1',
                    titleEn: 'Plan 1',
                    titleMs: 'Pelan 1',
                    introductionEn: 'Introduction 1',
                    introductionMs: 'Pengenalan 1',
                    estimatedTimeMinute: 30,
                    difficulty: Difficulty.Beginner,
                    focusAreaDto: { focusAreaId: '1', name: FocusArea.Abs },
                    workoutPlanExerciseDtos: [
                        {
                            planId: '1',
                            exerciseId: '1',
                            exerciseKey: 'abdominalCrunches',
                            estimatedTimeSecond: 20,
                        },
                        {
                            planId: '1',
                            exerciseId: '2',
                            exerciseKey: 'pushUp',
                            repCount: 15,
                        },
                    ],
                    imageUrl: 'http://example.com/image1.jpg',
                    focusAreaId: '1',
                },
            ];

            (Network.get as jest.Mock).mockResolvedValue({ data: mockResponse });

            const result = await WorkoutService.listAllPlan();

            expect(result).toEqual([
                {
                    id: '1',
                    titleEn: 'Plan 1',
                    titleMs: 'Pelan 1',
                    introductionEn: 'Introduction 1',
                    introductionMs: 'Pengenalan 1',
                    estimatedDuration: 30,
                    difficulty: Difficulty.Beginner,
                    focusArea: FocusArea.Abs,
                    exercises: [
                        {
                            type: 'duration',
                            exerciseKey: 'abdominalCrunches',
                            duration: 20,
                        },
                        {
                            type: 'reps',
                            exerciseKey: 'pushUp',
                            reps: 15,
                        },
                    ],
                    imageUrl: 'http://example.com/image1.jpg',
                },
            ]);
        });

        it('should handle empty response', async () => {
            (Network.get as jest.Mock).mockResolvedValue({ data: [] });

            const result = await WorkoutService.listAllPlan();

            expect(result).toEqual([]);
        });

        it('should handle network errors', async () => {
            (Network.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

            await expect(WorkoutService.listAllPlan()).rejects.toThrow('Network Error');
        });
    });
});

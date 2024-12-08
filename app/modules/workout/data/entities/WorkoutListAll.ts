import { Difficulty } from '../../../onboarding/data/entities/Difficulty';
import { FocusArea } from '../../../onboarding/data/entities/FocusArea';
import { WorkoutExercise } from './WorkoutExercise';

export interface WorkoutListAllPlan {
    id: string;
    titleEn: string;
    titleMs: string;
    introductionEn: string;
    introductionMs: string;
    estimatedDuration: number;
    difficulty: Difficulty;
    focusArea: FocusArea;
    exercises: WorkoutExercise[];
    imageUrl: string;
}

import { FocusArea } from '../../../onboarding/data/entities/FocusArea';
import { WorkoutExercise } from './WorkoutExercise';

export interface WorkoutListAllPlan {
    id: string;
    titleEn: string;
    titleMs: string;
    introductionEn: string;
    introductionMs: string;
    estimatedDuration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    focusArea: FocusArea;
    exercises: WorkoutExercise[];
    imageUrl: string;
}

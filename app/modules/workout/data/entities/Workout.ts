import { ImageSourcePropType } from 'react-native';
import { Difficulty } from '../../../onboarding/data/entities/Difficulty';
import { FocusArea } from '../../../onboarding/data/entities/FocusArea';
import { WorkoutExercise } from './WorkoutExercise';

export interface Workout {
    title: string;
    estimatedDuration: number;
    difficulty: Difficulty;
    focusArea: FocusArea;
    exercises: WorkoutExercise[];
    thumbnail: ImageSourcePropType;
}

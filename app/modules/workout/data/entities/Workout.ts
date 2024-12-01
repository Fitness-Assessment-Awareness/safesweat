import { ImageSourcePropType } from 'react-native';
import { FocusArea } from '../../../onboarding/data/entities/FocusArea';
import { WorkoutExercise } from './WorkoutExercise';

export interface Workout {
    title: string;
    estimatedDuration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    focusArea: FocusArea;
    exercises: WorkoutExercise[];
    thumbnail: ImageSourcePropType;
}

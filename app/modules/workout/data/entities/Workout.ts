import { ImageSourcePropType } from 'react-native';
import { WorkoutExercise } from './WorkoutExercise';

export interface Workout {
    title: string;
    estimatedDuration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    exercises: WorkoutExercise[];
    thumbnail: ImageSourcePropType;
}

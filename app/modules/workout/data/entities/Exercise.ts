import { AnimationObject } from 'lottie-react-native';

export const EXERCISE_FOCUS_AREAS = [
    'Shoulders',
    'Quadriceps',
    'Chest',
    'Adductors',
    'Glutes',
    'Calves',
    'Abs',
    'Triceps',
    'Lower back',
    'Hamstrings',
    'Back',
    'Biceps',
    'Traps',
] as const;

type ExerciseFocusArea = (typeof EXERCISE_FOCUS_AREAS)[number];

export interface Exercise {
    title: string;
    lottieSource: AnimationObject;
    instructions: string;
    focusAreas: ExerciseFocusArea[];
    commonMistakes: { title: string; description: string }[];
    breathingTips: string[];
    difficulty: 'low' | 'moderate' | 'vigorous';
}

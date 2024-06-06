import { AnimationObject } from 'lottie-react-native';

export interface Exercise {
    title: string;
    lottieSource: AnimationObject;
    instructions: string;
    focusAreas: string[];
    commonMistakes: { title: string; description: string }[];
    breathingTips: string[];
}

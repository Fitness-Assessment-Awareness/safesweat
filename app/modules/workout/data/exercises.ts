import { LottieAssets } from '../../../assets/lottie';
import { Exercise } from './entities/Exercise';

export const EXERCISES = {
    jumpingJacks: {
        title: 'JUMPING JACKS',
        lottieSource: LottieAssets.jumpingJacks,
        instructions:
            'Start with your feet together and your arms by your sides, then jump up with your feet apart and your hands overhead.\n\nReturn to the start position then do the next rep. This exercise provides a full-body workout and works all your large muscle groups.',
        focusAreas: ['Shoulders', 'Quadriceps', 'Chest', 'Adductors', 'Glutes', 'Calves'],
        commonMistakes: [
            {
                title: 'Landing too hard',
                description:
                    'When you jump in the air and come down, you are putting too much impact or pressure on your feet, ankles, knees or other joints, this can lead to discomfort or injury. Try to land on the balls of your feet rather than your heels. It absorbs more shock.',
            },
            {
                title: 'Not keeping the knees bent',
                description: 'Failing to keep the knees bent can cause the exercise to be less effective.',
            },
            {
                title: 'Not engaging the core',
                description:
                    'It requires the core muscles to be engaged throughout the exercise. If the core is not engaged, it can lead to poor form and an ineffective workout.',
            },
        ],
        breathingTips: [
            'Inhale as you jump your feet apart.',
            'Exhale as you jump your feet back together.',
            'Take deep breaths to fully oxygenate your body.',
        ],
    },
    pushUp: {
        title: 'PUSH UP',
        lottieSource: LottieAssets.pushUp,
        instructions:
            'Start with your feet together and your arms by your sides, then jump up with your feet apart and your hands overhead.\n\nReturn to the start position then do the next rep. This exercise provides a full-body workout and works all your large muscle groups.',
        focusAreas: ['Shoulders', 'Quadriceps', 'Chest', 'Adductors', 'Glutes', 'Calves'],
        commonMistakes: [
            {
                title: 'Landing too hard',
                description:
                    'When you jump in the air and come down, you are putting too much impact or pressure on your feet, ankles, knees or other joints, this can lead to discomfort or injury. Try to land on the balls of your feet rather than your heels. It absorbs more shock.',
            },
            {
                title: 'Not keeping the knees bent',
                description: 'Failing to keep the knees bent can cause the exercise to be less effective.',
            },
            {
                title: 'Not engaging the core',
                description:
                    'It requires the core muscles to be engaged throughout the exercise. If the core is not engaged, it can lead to poor form and an ineffective workout.',
            },
        ],
        breathingTips: [
            'Inhale as you jump your feet apart.',
            'Exhale as you jump your feet back together.',
            'Take deep breaths to fully oxygenate your body.',
        ],
    },
} as const satisfies Record<string, Exercise>;

export type ExerciseKey = keyof typeof EXERCISES;

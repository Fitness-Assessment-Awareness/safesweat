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
    abdominalCrunches: {
        title: 'ABDOMINAL CRUNCHES',
        lottieSource: LottieAssets.abdominalCrunches,
        instructions:
            'Lie on your back with your knees bent and your arms stretched forward.\n\nThen lift your upper body off the floor. Hold for a few seconds and slowly return.\n\nIt primarily works the rectus abdominis muscle and the obliques.',
        focusAreas: ['Abs'],
        commonMistakes: [
            {
                title: 'Pulling your neck',
                description:
                    'Pulling your neck during Abdominal Crunches can strain your neck and lead to potential injury. Instead, use your core muscles to lift your upper body.',
            },
            {
                title: 'Not engaging the core',
                description:
                    'It requires the core muscles to be engaged throughout the entire exercise. If the core is not engaged, it can lead to poor form and an ineffective workout.',
            },
            {
                title: 'Performing the exercise too quickly or with poor form',
                description: 'This can increase the risk of injury and make the exercise less effective.',
            },
        ],
        breathingTips: [
            'Proper breathing during Abdominal Crunches is important because it helps engage the core muscles and provides stability for the spine.',
            'Exhaling as you lift your torso off the ground helps engage the upper abdominals, which are the primary muscles targeted in this exercise.',
            'Inhaling as you lower back down helps you maintain control and avoid straining your back',
        ],
    },
    inclinePushUp: {
        title: 'INCLINE PUSH UP',
        lottieSource: LottieAssets.inclinePushUp,
        instructions:
            'Start in the regular push-up position but with your hands elevated on a chair or bench.\n\nThen push your body up down using your arm strength.\n\nRemember to keep your body straight.',
        focusAreas: ['Shoulders', 'Chest', 'Triceps'],
        commonMistakes: [
            {
                title: 'Improper hand placement',
                description:
                    'Placing your hands too wide or too close together can put unnecessary strain on your elbows and wrists. Keep you hands shoulder-width apart and directly under your shoulders.',
            },
            {
                title: 'Excessive lifting of the hips or collapsing of the back',
                description:
                    'Allowing your back to sag or lifting your hips too high during Push-ups can put undue stress on your spine and increase the risk of injury. Keep your body in a straight line form head to heels.',
            },
            {
                title: 'Not engaging the core',
                description:
                    'It requires the core muscles to be engaged throughout the entire exercise. If the core is not engaged, it can lead to poor form and an ineffective workout.',
            },
            {
                title: 'Allowing the elbows to flare out of the sides',
                description:
                    'This can put unnecessary stress on the shoulder joints and can reduce the effectiveness of the exercise.',
            },
        ],
        breathingTips: [
            'Inhale as you lower your body towards the elevated surface.',
            'Exhale as you push your body back up to the starting position.',
        ],
    },
    legRaises: {
        title: 'LEG RAISES',
        lottieSource: LottieAssets.legRaises,
        instructions:
            'Lie down on your back, and put your hands beneath your hips for support.\n\nThen lift your legs up until they form a right angle with the floor.\n\nSlowly bring your legs back down and repeat the exercise.',
        focusAreas: ['Abs', 'Glutes', 'Quadriceps'],
        commonMistakes: [
            {
                title: 'Raising the legs too high',
                description: 'This can cause excessive bending of the lower back and increase the risk of injury.',
            },
            {
                title: 'Not controlling the legs',
                description: 'This can result in improper form, and reduced effectiveness of the exercise.',
            },
            {
                title: 'Excessive reliance on leg strength',
                description:
                    'Excessive reliance on leg strength during exercise while ignoring the participation of core muscle groups will affect the exercise effect.',
            },
            {
                title: 'Lack of support for the lower back',
                description:
                    'This can damage the spine. You can avoid the risk of injury by placing a folded towel under your lower back.',
            },
        ],
        breathingTips: [
            'Proper breathing during leg raises is important because it helps activate the core muscles, improve the effectiveness of the exercise, and protect your spine from injury.',
            'Exhaling as you raise your legs helps you better control the movement.',
            'Inhaling as you lower them reduces the stress on your spine.',
        ],
    },
    mountainClimber: {
        title: 'MOUNTAIN CLIMBER',
        lottieSource: LottieAssets.mountainClimber,
        instructions:
            'Start in the push-up position. Bend your right knee towards your chest and keep your left leg straight, then quickly switch from one leg to the other.\n\nThis exercise strengthens multiple muscle groups.',
        focusAreas: ['Abs', 'Glutes', 'Quadriceps', 'Lower back', 'Calves'],
        commonMistakes: [
            {
                title: 'Hunching the back',
                description:
                    'Hunching the back can put undue stress on your spine and increase the risk of injury. Keep your core engaged and your back straight.',
            },
            {
                title: 'Lifting the hips',
                description:
                    'Raising the hips too high during the exercise can cause the lower back to arch and can reduce the effectiveness of the exercise.',
            },
            {
                title: 'Moving too quickly',
                description:
                    'Performing the exercise too quickly can reduce its effectiveness and may cause you to lose proper form.',
            },
            {
                title: 'Not engaging the core',
                description:
                    'It requires the core muscles to be engaged throughout the entire exercise. If the core is not engaged, it can lead to poor form and an ineffective workout.',
            },
        ],
        breathingTips: [
            'Take natural and deep breaths. Avoid holding your breath.',
            'Keep a consistent breathing rhythm throughout the exercise.',
        ],
    },
    wideArmPushUp: {
        title: 'WIDE ARM PUSH UP',
        lottieSource: LottieAssets.mountainClimber,
        instructions:
            'Start in the regular push-up position but with your hands spread wider than your shoulders.\n\nThen push your body up and down. Remember to keep your body straight.',
        focusAreas: ['Chest', 'Triceps', 'Shoulders'],
        commonMistakes: [
            {
                title: 'Allowing the elbows to flare out of the sides',
                description:
                    'This places unnecessary stress on the shoulder joints and can reduce the effectiveness of the exercise.',
            },
            {
                title: 'Failing to engage the core muscles',
                description:
                    'This can cause the lower back to sag and increase the risk of injury. Tighten your abs to engage the core muscles.',
            },
            {
                title: 'Excessive lifting of the hips or collapsing of the back',
                description:
                    'Allowing your back to sag or lifting your hips too high during Push-ups can put undue stress on your spine and increase the risk of injury. Keep your body in a straight line form head to heels.',
            },
            {
                title: 'Not keeping the head in a neutral position',
                description:
                    'This can cause strain on the neck and also take away from the effectiveness of the exercise.',
            },
        ],
        breathingTips: [
            'Inhale as you lower your body towards the ground.',
            'Exhale as you push your body back up to the starting position.',
            'Taking deep breaths throughtout an exercise can increase oxygen flow to your muscles, which helps them work more efficiently and can help enhance your performance.',
        ],
    },
    kneePushUp: {
        title: 'KNEE PUSH UP',
        lottieSource: LottieAssets.kneePushUp,
        instructions:
            'Start in the regular push-up position, then let your knees touch the floor and raise your feet up off the floor.\n\nNext push your body up and down.',
        focusAreas: ['Chest', 'Triceps', 'Shoulders'],
        commonMistakes: [
            {
                title: 'Improper hand placement',
                description:
                    'Placing your hands too wide or too close together can put unnecessary strain on your elbows and wrists. Keep you hands shoulder-width apart and directly under your shoulders.',
            },
            {
                title: 'Not engaging the core',
                description:
                    'It requires the core muscles to be engaged throughout the entire exercise. If the core is not engaged, it can lead to poor form and an ineffective workout.',
            },
            {
                title: 'Excessive lifting of the hips or collapsing of the back',
                description:
                    'Allowing your back to sag or lifting your hips too high during Push-ups can put undue stress on your spine and increase the risk of injury. Keep your body in a straight line form head to heels.',
            },
            {
                title: 'Allowing the elbows to flare out of the sides',
                description:
                    'This places unnecessary stress on the shoulder joints and can reduce the effectiveness of the exercise.',
            },
        ],
        breathingTips: [
            'Inhale as you lower your body towards the ground.',
            'Exhale as you push your body back up to the starting position.',
            'Its important to keep your breathing steady and controlled throughout the exercise to maintain good form and prevent dizziness.',
        ],
    },
    squat: {
        title: 'SQUAT',
        lottieSource: LottieAssets.squat,
        instructions:
            'Stand with your feet shoulder width apart and your arms stretched forward, then lower your body until your thighs are parallel with the floor.\n\nYour knees should be extended in the same direction as your toes. Return to the start position and do the next rep.\n\nThis works the thighs, hips buttocks, quads, hamstrings and lower body.',
        focusAreas: ['Glutes', 'Quadriceps', 'Hamstrings', 'Calves'],
        commonMistakes: [
            {
                title: 'Allowing your knees to cave in',
                description:
                    'This can put unnecessary stress on the knee joint and increase the risk of injury. Keep your knees in line with your toes. Also, do not let your knees go past your toes.',
            },
            {
                title: 'Hunching the back',
                description:
                    'Hunching the back can put undue stress on your spine and increase the risk of injury. Keep your core engaged and your back straight.',
            },
            {
                title: 'Not going low enough',
                description:
                    "If you don't squat low enough, you're not engaging your glutes and hamstrings as effectively. Aim to squat until your thighs are parallel to the ground.",
            },
            {
                title: 'Letting your heels come off the ground',
                description:
                    'Lifting your heels can shift your weight forward and put more stress on your knees. Keep your feet flat on the ground.',
            },
        ],
        breathingTips: [
            'Inhale as you lower your body down.',
            'Exhale as you push yourself back up.',
            'This can help to stabilize your core and ensure proper form.',
        ],
    },
} as const satisfies Record<string, Exercise>;

export type ExerciseKey = keyof typeof EXERCISES;

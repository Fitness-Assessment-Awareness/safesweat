import dayjs from 'dayjs';
import { Label } from '../../../components/Label';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { Difficulty } from '../../onboarding/data/entities/Difficulty';
import { Workout } from '../data/entities/Workout';
import { WORKOUTS, WorkoutKey } from '../data/workouts';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';
import { WorkoutPlanCard } from './WorkoutPlanCard';

export function WorkoutLandingRecommendedSection() {
    const navigation = useWorkoutNavigation<'WorkoutLanding'>();
    const { workoutProfile } = useWorkoutProfile();

    const getWorkoutDifficultyInPoints = (difficulty: Difficulty) => {
        switch (difficulty) {
            case Difficulty.Beginner:
                return 0;
            case Difficulty.Intermediate:
                return 15;
            case Difficulty.Advanced:
                return 30;
            default:
                return 0;
        }
    };

    const workoutHistoriesInPoints = workoutProfile.workoutHistories.reduce((acc, history) => {
        const workout = WORKOUTS[history.workoutKey];
        if (dayjs(history.timestamp).diff(dayjs(), 'days') <= 30) {
            if (workout.difficulty === 'beginner') {
                return acc + 1;
            }
            if (workout.difficulty === 'intermediate') {
                return acc + 2;
            }
            return acc + 3;
        }
        return acc;
    }, 0);

    const getWorkoutLevel = (workoutPoints: number) => {
        if (workoutPoints < 15) {
            return 'beginner';
        }
        if (workoutPoints < 30) {
            return 'intermediate';
        }
        return 'advanced';
    };

    const repeatedWorkouts = workoutProfile.workoutHistories.reduce(
        (acc, history) => ({
            ...acc,
            [history.workoutKey]: (acc[history.workoutKey] || 0) + 1,
        }),
        {} as Record<WorkoutKey, number>,
    );

    const filteredWorkouts = (Object.entries(WORKOUTS) as [WorkoutKey, Workout][])
        .filter(
            ([, workout]) =>
                workoutProfile.healthProblems.length === 0 ||
                (workoutProfile.healthProblems.length > 0 && workout.difficulty === 'beginner'),
        )
        .sort(([workoutKeyA, workoutA], [workoutKeyB, workoutB]) => {
            const workoutPoints = getWorkoutDifficultyInPoints(workoutProfile.difficulty) + workoutHistoriesInPoints;
            const workoutLevel = getWorkoutLevel(workoutPoints);
            if (workoutA.difficulty === workoutB.difficulty) {
                return repeatedWorkouts[workoutKeyA] || 0 - repeatedWorkouts[workoutKeyB] || 0;
            }
            if (workoutA.difficulty === workoutLevel) return -1;
            if (workoutB.difficulty === workoutLevel) return 1;
            if (workoutA.difficulty === 'beginner') return 1;
            if (workoutB.difficulty === 'beginner') return -1;
            if (workoutA.difficulty === 'intermediate') return -1;
            if (workoutB.difficulty === 'intermediate') return 1;
            return 0;
        });

    return (
        <>
            <Label size="large">Recommended</Label>
            {filteredWorkouts.slice(0, 3).map(([workoutKey, value]) => (
                <WorkoutPlanCard
                    key={workoutKey}
                    title={value.title}
                    description={`${value.estimatedDuration} MINS | ${value.exercises.length} EXERCISES`}
                    imageSource={value.thumbnail}
                    onPress={() => {
                        navigation.navigate('WorkoutPlanDetails', {
                            workoutKey,
                        });
                    }}
                />
            ))}
        </>
    );
}

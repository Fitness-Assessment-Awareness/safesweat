import { useTranslation } from 'react-i18next';
import { Label } from '../../../components/Label';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { Difficulty } from '../../onboarding/data/entities/Difficulty';
import { Workout } from '../data/entities/Workout';
import { WORKOUTS, WorkoutKey } from '../data/workouts';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';
import { WorkoutPlanCard } from './WorkoutPlanCard';

export function WorkoutLandingRecommendedSection() {
    const { t } = useTranslation();
    const navigation = useWorkoutNavigation<'WorkoutLanding'>();
    const { workoutProfile } = useWorkoutProfile();

    const getWorkoutLevel = (workoutPoints: number) => {
        if (workoutPoints < 15) {
            return Difficulty.Beginner;
        }
        if (workoutPoints < 30) {
            return Difficulty.Intermediate;
        }
        return Difficulty.Advanced;
    };

    const repeatedWorkouts = workoutProfile.workoutHistories.reduce(
        (acc, history) =>
            history.type === 'local'
                ? {
                      ...acc,
                      [history.workoutKey]: (acc[history.workoutKey] || 0) + 1,
                  }
                : acc,
        {} as Record<WorkoutKey, number>,
    );

    const filteredWorkouts = (Object.entries(WORKOUTS) as [WorkoutKey, Workout][])
        .filter(
            ([, workout]) =>
                workoutProfile.healthProblems.length === 0 ||
                (workoutProfile.healthProblems.length > 0 && workout.difficulty === Difficulty.Beginner),
        )
        .sort(([workoutKeyA, workoutA], [workoutKeyB, workoutB]) => {
            const workoutLevel = getWorkoutLevel(workoutProfile.workoutPoints);
            if (workoutA.difficulty === workoutB.difficulty) {
                if (workoutA.focusArea !== workoutB.focusArea) {
                    if (workoutProfile.focusAreas.includes(workoutA.focusArea)) return -1;
                    if (workoutProfile.focusAreas.includes(workoutB.focusArea)) return 1;
                }

                return repeatedWorkouts[workoutKeyA] || 0 - repeatedWorkouts[workoutKeyB] || 0;
            }
            if (workoutA.difficulty === workoutLevel) return -1;
            if (workoutB.difficulty === workoutLevel) return 1;
            if (workoutA.difficulty === Difficulty.Beginner) return 1;
            if (workoutB.difficulty === Difficulty.Beginner) return -1;
            if (workoutA.difficulty === Difficulty.Intermediate) return -1;
            if (workoutB.difficulty === Difficulty.Intermediate) return 1;
            return 0;
        });

    return (
        <>
            <Label size="large">{t('workout.exercise.details.recommended')}</Label>
            {filteredWorkouts.slice(0, 3).map(([workoutKey, value]) => (
                <WorkoutPlanCard
                    key={workoutKey}
                    title={value.title}
                    description={`${value.estimatedDuration} ${t('workout.exercise.details.mins').toUpperCase()} | ${value.exercises.length} ${t('workout.plan.details.exercises').toUpperCase()}`}
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

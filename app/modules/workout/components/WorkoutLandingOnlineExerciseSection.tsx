import { useQuery } from '@tanstack/react-query';
import { XStack } from 'tamagui';
import { Label } from '../../../components/Label';
import { useLanguageCode } from '../../../context/LanguageCodeProvider';
import { LanguageCode } from '../../../lang/LanguageCode';
import { WorkoutService } from '../data/services/WorkoutService';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';
import { WorkoutPlanCard } from './WorkoutPlanCard';

export function WorkoutLandingOnlineExerciseSection() {
    const { navigate } = useWorkoutNavigation<'WorkoutLanding'>();
    const { data, isPending, isError } = useQuery({
        queryKey: ['workout'],
        queryFn: WorkoutService.listAllPlan,
    });
    const { languageCode } = useLanguageCode();

    if (isPending) {
        return (
            <>
                <XStack justifyContent="space-between">
                    <Label size="large">More Exercise</Label>
                </XStack>
                <Label alignSelf="center">Loading...</Label>
            </>
        );
    }

    if (isError) {
        return (
            <>
                <XStack justifyContent="space-between">
                    <Label size="large">More Exercise</Label>
                </XStack>
                <Label alignSelf="center">Error getting data! Please try again</Label>
            </>
        );
    }

    return (
        <>
            <XStack justifyContent="space-between">
                <Label size="large">More Exercise</Label>
                <Label
                    size="large"
                    textDecorationLine="underline"
                    onPress={() => {
                        navigate('WorkoutOnlineExercise');
                    }}
                >
                    See more
                </Label>
            </XStack>
            {data.slice(0, 3).map((plan) => (
                <WorkoutPlanCard
                    key={plan[languageCode === LanguageCode.ENGLISH ? 'titleEn' : 'titleMs']}
                    title={plan[languageCode === LanguageCode.ENGLISH ? 'titleEn' : 'titleMs']}
                    description={`${plan.estimatedDuration} MINS | ${plan.exercises.length} EXERCISES`}
                    imageSource={{ uri: plan.imageUrl }}
                    onPress={() => {
                        navigate('WorkoutOnlinePlanDetails', plan);
                    }}
                />
            ))}
        </>
    );
}

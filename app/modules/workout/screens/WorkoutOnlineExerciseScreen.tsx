import { useQuery } from '@tanstack/react-query';
import { Label, ScrollView, XStack } from 'tamagui';
import { useLanguageCode } from '../../../context/LanguageCodeProvider';
import { LanguageCode } from '../../../lang/LanguageCode';
import { WorkoutPlanCard } from '../components/WorkoutPlanCard';
import { WorkoutService } from '../data/services/WorkoutService';

export function WorkoutOnlineExerciseScreen() {
    const { data, isPending, isError } = useQuery({
        queryKey: ['workout'],
        queryFn: async () => {
            const test = await WorkoutService.listAllPlan();
            return test;
        },
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
        <ScrollView
            contentContainerStyle={{
                p: '$3',
                rowGap: '$4',
            }}
        >
            {data.map((plan) => (
                <WorkoutPlanCard
                    key={plan[languageCode === LanguageCode.ENGLISH ? 'titleEn' : 'titleMs']}
                    title={plan[languageCode === LanguageCode.ENGLISH ? 'titleEn' : 'titleMs']}
                    description={`${plan.estimatedDuration} MINS | ${plan.exercises.length} EXERCISES`}
                    imageSource={{ uri: plan.imageUrl }}
                />
            ))}
        </ScrollView>
    );
}

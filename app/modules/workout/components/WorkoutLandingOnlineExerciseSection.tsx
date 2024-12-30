import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { XStack } from 'tamagui';
import { Label } from '../../../components/Label';
import { useLanguageCode } from '../../../context/LanguageCodeProvider';
import { LanguageCode } from '../../../lang/LanguageCode';
import { WorkoutService } from '../data/services/WorkoutService';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';
import { WorkoutPlanCard } from './WorkoutPlanCard';

export function WorkoutLandingOnlineExerciseSection() {
    const { t } = useTranslation('workout');
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
                    <Label size="large">{t('landing.online_exercise.more_exercise')}</Label>
                    <Label
                        size="large"
                        textDecorationLine="underline"
                        onPress={() => {
                            navigate('WorkoutOnlineExercise');
                        }}
                    >
                        {t('landing.online_exercise.see_more')}
                    </Label>
                </XStack>
                <Label
                    alignSelf="center"
                    textAlign="center"
                >
                    {t('landing.online_exercise.loading')}
                </Label>
            </>
        );
    }

    if (isError) {
        return (
            <>
                <XStack justifyContent="space-between">
                    <Label size="large">{t('landing.online_exercise.more_exercise')}</Label>
                    <Label
                        size="large"
                        textDecorationLine="underline"
                        onPress={() => {
                            navigate('WorkoutOnlineExercise');
                        }}
                    >
                        {t('landing.online_exercise.see_more')}
                    </Label>
                </XStack>
                <Label
                    alignSelf="center"
                    textAlign="center"
                >
                    {t('landing.online_exercise.error')}
                </Label>
            </>
        );
    }

    return (
        <>
            <XStack justifyContent="space-between">
                <Label size="large">{t('landing.online_exercise.more_exercise')}</Label>
                <Label
                    size="large"
                    textDecorationLine="underline"
                    onPress={() => {
                        navigate('WorkoutOnlineExercise');
                    }}
                >
                    {t('landing.online_exercise.see_more')}
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

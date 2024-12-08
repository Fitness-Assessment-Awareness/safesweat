import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ScrollView, Tabs } from 'tamagui';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { useLanguageCode } from '../../../context/LanguageCodeProvider';
import { useWorkoutOffline } from '../../../context/WorkoutOfflineProvider';
import { LanguageCode } from '../../../lang/LanguageCode';
import { WorkoutPlanCard } from '../components/WorkoutPlanCard';
import { WorkoutService } from '../data/services/WorkoutService';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';

export function WorkoutOnlineExerciseScreen() {
    const { navigate } = useWorkoutNavigation<'WorkoutOnlineExercise'>();
    const { data, isPending, isError } = useQuery({
        queryKey: ['workout'],
        queryFn: WorkoutService.listAllPlan,
    });
    const { languageCode } = useLanguageCode();
    const [selectedTab, setSelectedTab] = useState<'online' | 'offline'>('online');
    const { offlineWorkouts } = useWorkoutOffline();

    const getContent = () => {
        if (isPending) {
            return (
                <Label
                    alignSelf="center"
                    p="$4"
                    textAlign="center"
                >
                    Loading...
                </Label>
            );
        }

        if (isError) {
            return (
                <Label
                    alignSelf="center"
                    p="$4"
                    textAlign="center"
                >
                    Error getting data! Please try again. You can still access workout you saved.
                </Label>
            );
        }

        return (
            <ScrollView
                contentContainerStyle={{
                    p: '$3',
                    rowGap: '$4',
                    flexGrow: 1,
                }}
            >
                {data.map((plan) => (
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
            </ScrollView>
        );
    };

    return (
        <Tabs
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value as 'online' | 'offline')}
            flexDirection="column"
            orientation="vertical"
            flex={1}
        >
            <Tabs.List
                flexDirection="row"
                columnGap="$4"
                p="$3"
                pb="$0"
            >
                <Tabs.Tab
                    value="online"
                    unstyled
                >
                    <Label
                        size="large"
                        textDecorationLine={selectedTab === 'online' ? 'underline' : 'none'}
                    >
                        Online
                    </Label>
                </Tabs.Tab>
                <Tabs.Tab
                    value="offline"
                    unstyled
                >
                    <Label
                        size="large"
                        textDecorationLine={selectedTab === 'offline' ? 'underline' : 'none'}
                    >
                        Downloaded
                    </Label>
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Content
                value="online"
                flex={1}
            >
                {getContent()}
            </Tabs.Content>
            <Tabs.Content
                value="offline"
                flex={1}
            >
                <ScrollView
                    contentContainerStyle={{
                        p: '$3',
                        rowGap: '$4',
                        flexGrow: 1,
                    }}
                >
                    {offlineWorkouts.length === 0 && (
                        <Paragraph
                            textAlign="center"
                            alignSelf="center"
                            p="$4"
                        >
                            No downloaded workout
                        </Paragraph>
                    )}
                    {offlineWorkouts.map((plan) => (
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
                </ScrollView>
            </Tabs.Content>
        </Tabs>
    );
}

import React from 'react';
import { ScrollView, View } from 'tamagui';
import { WorkoutAssets } from '../assets';
import { WorkoutLandingTabs } from '../components/WorkoutLandingTabs';
import { WorkoutPlanCard } from '../components/WorkoutPlanCard';
import { WorkoutRoutineCard } from '../components/WorkoutRoutineCard';
import { useWorkoutNavigation } from '../navigation/useWorkoutNavigation';

export function WorkoutLandingScreen() {
    const navigation = useWorkoutNavigation<'WorkoutLanding'>();

    return (
        <View>
            <ScrollView
                contentContainerStyle={{
                    px: '$3',
                    py: '$8',
                    rowGap: '$4',
                }}
            >
                <WorkoutRoutineCard />
                <WorkoutLandingTabs tabs={['beginner', 'intermediate', 'advanced']}>
                    <WorkoutLandingTabs.Content
                        selectedTab="beginner"
                        rowGap="$4"
                    >
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                            onPress={() => {
                                navigation.navigate('WorkoutPlanDetails', { workoutKey: 'absBeginner' });
                            }}
                        />
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                    </WorkoutLandingTabs.Content>
                    <WorkoutLandingTabs.Content
                        selectedTab="intermediate"
                        rowGap="$4"
                    >
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                    </WorkoutLandingTabs.Content>
                    <WorkoutLandingTabs.Content
                        selectedTab="advanced"
                        rowGap="$4"
                    >
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                        <WorkoutPlanCard
                            title="ABS BEGINNER"
                            description="20 MINS | 16 EXERCISES"
                            imageSource={WorkoutAssets.workoutBeginner}
                        />
                    </WorkoutLandingTabs.Content>
                </WorkoutLandingTabs>
            </ScrollView>
        </View>
    );
}

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, View } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Screen } from '../../../components/Screen';
import { useRootNavigation } from '../../../navigation/useAppNavigation';

export function WorkoutSuccessScreen() {
    const { reset } = useRootNavigation();
    return (
        <Screen flex={1}>
            <StatusBar
                style="dark"
                animated
            />
            <View
                flex={1}
                justifyContent="center"
                alignItems="center"
            >
                <Heading
                    size="x-large"
                    textAlign="center"
                >
                    Workout Completed!
                </Heading>
            </View>
            <Button
                themeInverse
                m="$4"
                borderRadius="$8"
                onPress={() => {
                    reset({
                        index: 0,
                        routes: [
                            {
                                name: 'HomeTab',
                                params: { screen: 'WorkoutStack', params: { screen: 'WorkoutLanding' } },
                            },
                        ],
                    });
                }}
            >
                Finish
            </Button>
        </Screen>
    );
}

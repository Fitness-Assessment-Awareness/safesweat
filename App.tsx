import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Screens } from './app/navigation/Screens';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

// eslint-disable-next-line import/no-default-export
export default function App() {
    const onNavigationReady = () => {
        SplashScreen.hideAsync();
    };

    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer onReady={onNavigationReady}>
                    <Screens />
                </NavigationContainer>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
}

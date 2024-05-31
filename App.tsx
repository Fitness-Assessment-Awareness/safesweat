/* eslint-disable global-require */
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { Screens } from './app/navigation/Screens';
import { appConfig } from './tamagui.config';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

// eslint-disable-next-line import/no-default-export
export default function App() {
    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    });

    if (!loaded) {
        return null;
    }

    const onNavigationReady = () => {
        SplashScreen.hideAsync();
    };

    return (
        <TamaguiProvider config={appConfig}>
            <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                    <NavigationContainer onReady={onNavigationReady}>
                        <Screens />
                    </NavigationContainer>
                </QueryClientProvider>
            </SafeAreaProvider>
        </TamaguiProvider>
    );
}

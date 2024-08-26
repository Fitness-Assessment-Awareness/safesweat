/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ms';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import durationPlugin from 'dayjs/plugin/duration';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalProvider, TamaguiProvider } from 'tamagui';
import { Screens } from './app/navigation/Screens';
import appConfig from './tamagui.config';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

dayjs.extend(customParseFormat);
dayjs.extend(durationPlugin);
dayjs.extend(relativeTimePlugin);

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
        <TamaguiProvider
            defaultTheme="light"
            config={appConfig}
        >
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <QueryClientProvider client={queryClient}>
                        <NavigationContainer onReady={onNavigationReady}>
                            <BottomSheetModalProvider>
                                <PortalProvider shouldAddRootHost>
                                    <Screens />
                                </PortalProvider>
                            </BottomSheetModalProvider>
                        </NavigationContainer>
                    </QueryClientProvider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </TamaguiProvider>
    );
}

LogBox.ignoreLogs([/Cannot update a component/]);

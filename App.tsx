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
import React, { useMemo, useState } from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalProvider, TamaguiProvider } from 'tamagui';
import { User, UserContext } from './app/context/UserContext';
import { Difficulty } from './app/modules/onboarding/data/Difficulty';
import { Gender } from './app/modules/onboarding/data/Gender';
import { Screens } from './app/navigation/Screens';
import appConfig from './tamagui.config';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

dayjs.extend(customParseFormat);
dayjs.extend(durationPlugin);
dayjs.extend(relativeTimePlugin);

// eslint-disable-next-line import/no-default-export
export default function App() {
    const [user, setUser] = useState<User>({
        gender: Gender.Male,
        focusAreas: [],
        difficulty: Difficulty.NONE,
        healthProblems: [],
        weight: 50,
        height: 160,
    });
    const userContextValue = useMemo(() => ({ user, setUser }), [user]);
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
                                    <UserContext.Provider value={userContextValue}>
                                        <Screens />
                                    </UserContext.Provider>
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

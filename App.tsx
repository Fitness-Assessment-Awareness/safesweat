/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import { useMMKVDevTools } from '@dev-plugins/react-native-mmkv';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import durationPlugin from 'dayjs/plugin/duration';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { useFonts } from 'expo-font';
import { AndroidNotificationPriority, setNotificationHandler } from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { I18nextProvider } from 'react-i18next';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { PortalProvider, TamaguiProvider } from 'tamagui';
import { EmergencyContactsProvider } from './app/context/EmergencyContactProvider';
import { LanguageCodeProvider } from './app/context/LanguageCodeProvider';
import { SessionProvider } from './app/context/SessionProvider';
import { WorkoutNotificationProvider } from './app/context/WorkoutNotificationProvider';
import { WorkoutOfflineProvider } from './app/context/WorkoutOfflineProvider';
import { WorkoutProfileProvider } from './app/context/WorkoutProfileProvider';
import { i18n } from './app/lang/i18n';
import { Screens } from './app/navigation/Screens';
import appConfig from './tamagui.config';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

dayjs.extend(customParseFormat);
dayjs.extend(durationPlugin);
dayjs.extend(relativeTimePlugin);
dayjs.extend(isBetweenPlugin);

// eslint-disable-next-line import/no-default-export
export default function App() {
    useMMKVDevTools();
    useReactQueryDevTools(queryClient);

    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Regular.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
        InterItalic: require('@tamagui/font-inter/otf/Inter-Italic.otf'),
        InterBoldItalic: require('@tamagui/font-inter/otf/Inter-BoldItalic.otf'),
    });

    if (!loaded) {
        return null;
    }

    const onNavigationReady = async () => {
        await SplashScreen.hideAsync();
        setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
                priority: AndroidNotificationPriority.MAX,
            }),
        });
    };

    return (
        <TamaguiProvider
            defaultTheme="light"
            config={appConfig}
        >
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <QueryClientProvider client={queryClient}>
                        <I18nextProvider i18n={i18n}>
                            <EmergencyContactsProvider>
                                <SessionProvider>
                                    <LanguageCodeProvider>
                                        <WorkoutOfflineProvider>
                                            <WorkoutProfileProvider>
                                                <WorkoutNotificationProvider>
                                                    <NavigationContainer onReady={onNavigationReady}>
                                                        <BottomSheetModalProvider>
                                                            <PortalProvider shouldAddRootHost>
                                                                <Screens />
                                                                <Toast position="bottom" />
                                                            </PortalProvider>
                                                        </BottomSheetModalProvider>
                                                    </NavigationContainer>
                                                </WorkoutNotificationProvider>
                                            </WorkoutProfileProvider>
                                        </WorkoutOfflineProvider>
                                    </LanguageCodeProvider>
                                </SessionProvider>
                            </EmergencyContactsProvider>
                        </I18nextProvider>
                    </QueryClientProvider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </TamaguiProvider>
    );
}

LogBox.ignoreLogs([/Cannot update a component/]);

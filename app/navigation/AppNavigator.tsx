import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CatalogueStackParamList } from '../modules/catalogue/navigation/CatalogueStackParamList';
import { ExploreStackParamList } from '../modules/explore/navigation/ExploreStackParamList';
import { OnboardingRootStackParamList } from '../modules/onboarding/navigation/OnboardingRootStackParamList';
import { SettingsStackParamList } from '../modules/settings/navigation/SettingsStackParamList';
import { WorkoutStackParamList } from '../modules/workout/navigation/WorkoutStackParamList';

export type HomeTabParamList = {
    WorkoutStack: NavigatorScreenParams<WorkoutStackParamList>;
    ExploreStack: NavigatorScreenParams<ExploreStackParamList>;
    CatalogueStack: NavigatorScreenParams<CatalogueStackParamList>;
    SettingsStack: NavigatorScreenParams<SettingsStackParamList>;
};

export type NavigationStackParamList = {
    HomeTab: NavigatorScreenParams<HomeTabParamList>;
} & OnboardingRootStackParamList;

export const RootStack = createNativeStackNavigator<NavigationStackParamList>();
export const Tab = createBottomTabNavigator<HomeTabParamList>();

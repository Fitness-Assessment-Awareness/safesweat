import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeTabParamList, NavigationStackParamList } from '../../../navigation/AppNavigator';
import { SettingsStackParamList } from './SettingsStackParamList';

export function useSettingsNavigation<T extends keyof SettingsStackParamList>() {
    const navigation =
        useNavigation<
            CompositeNavigationProp<
                CompositeNavigationProp<
                    StackNavigationProp<SettingsStackParamList, T>,
                    BottomTabNavigationProp<HomeTabParamList, 'SettingsStack'>
                >,
                StackNavigationProp<NavigationStackParamList>
            >
        >();
    return navigation;
}

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeTabParamList, NavigationStackParamList } from './AppNavigator';

export const useRootNavigation = useNavigation<StackNavigationProp<NavigationStackParamList>>;

export function useHomeNavigation<T extends keyof HomeTabParamList>() {
    const navigation =
        useNavigation<
            CompositeNavigationProp<
                BottomTabNavigationProp<HomeTabParamList, T>,
                StackNavigationProp<NavigationStackParamList>
            >
        >();
    return navigation;
}

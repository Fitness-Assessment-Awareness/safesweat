import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeTabParamList, NavigationStackParamList } from '../../../navigation/AppNavigator';
import { ExploreStackParamList } from './ExploreStackParamList';

export function useExploreNavigation<T extends keyof ExploreStackParamList>() {
    const navigation =
        useNavigation<
            CompositeNavigationProp<
                CompositeNavigationProp<
                    StackNavigationProp<ExploreStackParamList, T>,
                    BottomTabNavigationProp<HomeTabParamList, 'ExploreStack'>
                >,
                StackNavigationProp<NavigationStackParamList>
            >
        >();
    return navigation;
}

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeTabParamList, NavigationStackParamList } from '../../../navigation/AppNavigator';
import { WorkoutStackParamList } from './WorkoutStackParamList';

export function useWorkoutNavigation<T extends keyof WorkoutStackParamList>() {
    const navigation =
        useNavigation<
            CompositeNavigationProp<
                CompositeNavigationProp<
                    StackNavigationProp<WorkoutStackParamList, T>,
                    BottomTabNavigationProp<HomeTabParamList, 'WorkoutStack'>
                >,
                StackNavigationProp<NavigationStackParamList>
            >
        >();
    return navigation;
}

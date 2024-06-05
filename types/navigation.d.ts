import { NavigationStackParamList } from '../app/navigation/AppNavigator';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends NavigationStackParamList {}
    }
}

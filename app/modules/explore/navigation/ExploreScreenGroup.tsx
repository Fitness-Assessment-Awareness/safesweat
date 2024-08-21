/* eslint-disable react/no-unstable-nested-components */
import { HeaderBackButton } from '../../../components/HeaderBackButton';
import { HeaderTitle } from '../../../components/HeaderTitle';
import { ExploreEducationPostDetailsScreen } from '../screens/ExploreEducationPostDetailsScreen';
import { ExploreLandingScreen } from '../screens/ExploreLandingScreen';
import { ExploreStack } from './ExploreStack';
import { useExploreNavigation } from './useExploreNavigation';

export function ExploreScreens() {
    return (
        <ExploreStack.Navigator
            screenOptions={{
                headerTitle: '',
                headerLeft: (props) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const navigation = useExploreNavigation();

                    return (
                        <HeaderBackButton
                            {...props}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    );
                },
            }}
        >
            <ExploreStack.Screen
                name="ExploreLanding"
                component={ExploreLandingScreen}
                options={{
                    headerTitle: '',
                    headerLeft: () => <HeaderTitle>DISCOVER</HeaderTitle>,
                }}
            />
            <ExploreStack.Screen
                name="ExploreEducationPostDetails"
                component={ExploreEducationPostDetailsScreen}
                options={{ headerTransparent: true, headerTintColor: 'white' }}
            />
        </ExploreStack.Navigator>
    );
}

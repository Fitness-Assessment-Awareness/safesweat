/* eslint-disable react/no-unstable-nested-components */
import { HeaderTitle } from '../../../components/HeaderTitle';
import { EducationPostDetailsScreen } from '../screens/EducationPostDetailsScreen';
import { ExploreLandingScreen } from '../screens/ExploreLandingScreen';
import { ExploreStack } from './ExploreStack';

export function ExploreScreens() {
    return (
        <ExploreStack.Navigator>
            <ExploreStack.Screen
                name="ExploreLanding"
                component={ExploreLandingScreen}
                options={{
                    headerTitle: '',
                    headerLeft: () => <HeaderTitle>DISCOVER</HeaderTitle>,
                }}
            />
            <ExploreStack.Screen
                name="EducationPostDetails"
                component={EducationPostDetailsScreen}
                options={{ headerTitle: '', headerTransparent: true, headerTintColor: 'white' }}
            />
        </ExploreStack.Navigator>
    );
}

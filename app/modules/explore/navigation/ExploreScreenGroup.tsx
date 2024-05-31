import { ExploreLandingScreen } from '../screens/ExploreLandingScreen';
import { ExploreStack } from './ExploreStack';

export function ExploreScreens() {
    return (
        <ExploreStack.Navigator>
            <ExploreStack.Screen
                name="ExploreLanding"
                component={ExploreLandingScreen}
            />
        </ExploreStack.Navigator>
    );
}

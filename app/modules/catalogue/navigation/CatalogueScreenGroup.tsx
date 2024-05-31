import { CatalogueLandingScreen } from '../screens/CatalogueLandingScreen';
import { CatalogueStack } from './CatalogueStack';

export function CatalogueScreens() {
    return (
        <CatalogueStack.Navigator>
            <CatalogueStack.Screen
                name="CatalogueLanding"
                component={CatalogueLandingScreen}
            />
        </CatalogueStack.Navigator>
    );
}

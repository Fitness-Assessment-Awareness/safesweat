/* eslint-disable react/no-unstable-nested-components */
import { HeaderTitle } from '../../../components/HeaderTitle';
import { CatalogueLandingScreen } from '../screens/CatalogueLandingScreen';
import { CatalogueStack } from './CatalogueStack';

export function CatalogueScreens() {
    return (
        <CatalogueStack.Navigator>
            <CatalogueStack.Screen
                name="CatalogueLanding"
                component={CatalogueLandingScreen}
                options={{
                    headerTitle: '',
                    headerLeft: () => <HeaderTitle>CATALOGUE</HeaderTitle>,
                }}
            />
        </CatalogueStack.Navigator>
    );
}

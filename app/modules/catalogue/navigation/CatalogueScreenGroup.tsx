/* eslint-disable react/no-unstable-nested-components */
import { useTranslation } from 'react-i18next';
import { HeaderTitle } from '../../../components/HeaderTitle';
import { CatalogueLandingScreen } from '../screens/CatalogueLandingScreen';
import { CatalogueStack } from './CatalogueStack';

export function CatalogueScreens() {
    const { t } = useTranslation();
    return (
        <CatalogueStack.Navigator>
            <CatalogueStack.Screen
                name="CatalogueLanding"
                component={CatalogueLandingScreen}
                options={{
                    headerTitle: '',
                    headerLeft: () => <HeaderTitle>{t('catalogue.header.catalogue').toUpperCase()}</HeaderTitle>,
                }}
            />
        </CatalogueStack.Navigator>
    );
}

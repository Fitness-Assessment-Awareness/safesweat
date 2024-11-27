import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContentProps, TabsProps } from 'tamagui';
import { Label } from '../../../components/Label';

type TabsValue = 'beginner' | 'intermediate' | 'advanced';

interface ComponentProps extends TabsProps {
    tabs: TabsValue[];
}

export function WorkoutLandingTabs({ tabs, children, ...tabsProps }: ComponentProps) {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState<TabsValue>('beginner');

    const getTabLabel = (tab: TabsValue) => {
        switch (tab) {
            case 'beginner':
                return t('general.shared.beginner');
            case 'intermediate':
                return t('general.shared.intermediate');
            case 'advanced':
                return t('general.shared.advanced');
            default:
                return '';
        }
    };

    return (
        <Tabs
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value as TabsValue)}
            flexDirection="column"
            orientation="vertical"
            alignItems="flex-start"
            {...tabsProps}
        >
            <Tabs.List
                flexDirection="row"
                columnGap="$4"
            >
                {tabs.map((tab) => (
                    <Tabs.Tab
                        key={tab}
                        value={tab}
                        unstyled
                    >
                        <Label
                            size="large"
                            textDecorationLine={selectedTab === tab ? 'underline' : 'none'}
                        >
                            {getTabLabel(tab)}
                        </Label>
                    </Tabs.Tab>
                ))}
            </Tabs.List>
            {children}
        </Tabs>
    );
}

interface WorkoutLandingTabsContentProps extends Omit<TabsContentProps, 'value'> {
    selectedTab: TabsValue;
}

function WorkoutLandingTabsContent({ selectedTab, children, ...tabsContentProps }: WorkoutLandingTabsContentProps) {
    return (
        <Tabs.Content
            value={selectedTab}
            width="100%"
            py="$4"
            {...tabsContentProps}
        >
            {children}
        </Tabs.Content>
    );
}

WorkoutLandingTabs.Content = WorkoutLandingTabsContent;

import { useState } from 'react';
import { Tabs, TabsContentProps, TabsProps } from 'tamagui';
import { Label } from '../../../components/Label';

type TabsValue = 'beginner' | 'intermediate' | 'advanced';

interface ComponentProps extends TabsProps {
    tabs: TabsValue[];
}

export function WorkoutLandingTabs({ tabs, children, ...tabsProps }: ComponentProps) {
    const [selectedTab, setSelectedTab] = useState<TabsValue>('beginner');

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
                            {`${tab.charAt(0).toUpperCase()}${tab.slice(1)}`}
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

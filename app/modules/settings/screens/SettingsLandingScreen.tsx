import { Session } from '@supabase/supabase-js';
import { AlertTriangle, ChevronRight, Globe, PencilLine, RefreshCw } from '@tamagui/lucide-icons';
import React, { useEffect, useState } from 'react';
import { Image, ListItem, ScrollView, Separator, YGroup } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Screen } from '../../../components/Screen';
import { supabase } from '../../../utils/Supabase';
import { SettingsAssets } from '../assets';
import { AuthDialog } from '../components/AuthDialog';

export function SettingsLandingScreen() {
    const [userSession, setUserSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUserSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setUserSession(session);
        });
    }, []);

    return (
        <Screen flex={1}>
            <ScrollView flex={1}>
                <YGroup>
                    {userSession !== null && (
                        <>
                            <YGroup.Item>
                                <ListItem
                                    size="$5"
                                    pressTheme
                                    title={<Heading size="small">Backup & Restore</Heading>}
                                    icon={
                                        <Image
                                            objectFit="contain"
                                            style={{ width: '8%', height: '100%' }}
                                            source={SettingsAssets.googleIcon}
                                        />
                                    }
                                    subTitle="Sign in and synchronize your data"
                                    iconAfter={RefreshCw}
                                />
                            </YGroup.Item>
                            <Separator borderColor="#D0D3D8" />
                            <YGroup.Item>
                                <ListItem
                                    pressTheme
                                    title="Edit Profile"
                                    icon={PencilLine}
                                    iconAfter={ChevronRight}
                                />
                            </YGroup.Item>
                            <Separator borderColor="#D0D3D8" />
                        </>
                    )}
                    <YGroup.Item>
                        <ListItem
                            pressTheme
                            title="Language Options"
                            icon={Globe}
                            iconAfter={ChevronRight}
                        />
                    </YGroup.Item>
                    <Separator borderColor="#D0D3D8" />
                    <YGroup.Item>
                        <ListItem
                            pressTheme
                            title="Emergency Contacts"
                            icon={AlertTriangle}
                            iconAfter={ChevronRight}
                        />
                    </YGroup.Item>
                    <Separator borderColor="#D0D3D8" />
                </YGroup>
                <AuthDialog />
            </ScrollView>
        </Screen>
    );
}

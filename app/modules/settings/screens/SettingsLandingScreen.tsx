import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Session } from '@supabase/supabase-js';
import { AlertTriangle, ChevronRight, Globe, PencilLine, RefreshCw } from '@tamagui/lucide-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, ListItem, ScrollView, Separator, View, YGroup } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Sheet } from '../../../components/Sheet';
import { supabase } from '../../../utils/Supabase';
import { SettingsAssets } from '../assets';
import { SettingsAuthSheetContent } from '../components/SettingsAuthSheet';

export function SettingsLandingScreen() {
    const sheetRef = useRef<BottomSheetModal>(null);
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
        <View flex={1}>
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
                <Button
                    backgroundColor="$green11"
                    pressStyle={{ backgroundColor: '$green10' }}
                    color="white"
                    m="$4"
                    borderRadius="$8"
                    onPress={() => {
                        sheetRef.current?.present();
                    }}
                >
                    Login
                </Button>
            </ScrollView>
            <Sheet
                ref={sheetRef}
                enableDynamicSizing
            >
                <Sheet.ScrollView>
                    <SettingsAuthSheetContent />
                </Sheet.ScrollView>
            </Sheet>
        </View>
    );
}

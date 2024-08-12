import { AlertTriangle, ChevronRight, Globe, PencilLine, RefreshCw } from '@tamagui/lucide-icons';
import React from 'react';
import { Button, Image, ListItem, ScrollView, Separator, YGroup } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Screen } from '../../../components/Screen';
import { SettingsAssets } from '../assets';

export function SettingsLandingScreen() {
    return (
        <Screen flex={1}>
            <ScrollView flex={1}>
                <YGroup>
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
                >
                    Create Account
                </Button>
            </ScrollView>
        </Screen>
    );
}

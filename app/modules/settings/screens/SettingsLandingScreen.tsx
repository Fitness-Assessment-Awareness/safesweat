import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNetInfo } from '@react-native-community/netinfo';
import { AlertTriangle, Bookmark, ChevronRight, Globe, LogOut, PencilLine, RefreshCw } from '@tamagui/lucide-icons';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { Button, Image, ListItem, ScrollView, Separator, View, YGroup } from 'tamagui';
import { Dialog } from '../../../components/Dialog';
import { Heading } from '../../../components/Heading';
import { Sheet } from '../../../components/Sheet';
import { useSession } from '../../../context/SessionProvider';
import { SettingsAssets } from '../assets';
import { SettingsAuthSheetContent } from '../components/SettingsAuthSheet';
import { SettingsBackupRestoreSheetContent } from '../components/SettingsBackupRestoreSheet';
import { SettingsLanguageSheetContent } from '../components/SettingsLanguageSheet';
import { useSettingsNavigation } from '../navigation/useSettingsNavigation';
import { deleteUserAccount, signOut } from '../services/AuthService';

export function SettingsLandingScreen() {
    const { t } = useTranslation();
    const { isConnected } = useNetInfo();
    const { navigate } = useSettingsNavigation<'SettingsLanding'>();
    const authSheetRef = useRef<BottomSheetModal>(null);
    const languageSheetRef = useRef<BottomSheetModal>(null);
    const backupRestoreSheetRef = useRef<BottomSheetModal>(null);
    const userSession = useSession();
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDismissAuthSheet = () => {
        authSheetRef.current?.dismiss();
    };

    const handleDismissLanguageSheet = () => {
        languageSheetRef.current?.dismiss();
    };

    const handleDismissBackupRestoreSheet = () => {
        backupRestoreSheetRef.current?.dismiss();
    };

    const handleDeleteAccount = async () => {
        if (!userSession) {
            throw new Error('User not found');
        }
        const { error } = await deleteUserAccount(userSession.user.id);
        Toast.show({
            type: error ? 'error' : 'success',
            text1: error ? t('settings.landing.error.deleting.account') : t('settings.landing.account.deleted'),
            visibilityTime: 2000,
        });
        signOut();
    };

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
                                    title={<Heading size="small">{t('settings.landing.backup.and.restore')}</Heading>}
                                    icon={
                                        <Image
                                            objectFit="contain"
                                            style={{ width: '8%', height: '100%' }}
                                            source={SettingsAssets.googleIcon}
                                        />
                                    }
                                    subTitle={t('settings.landing.synchronize.data')}
                                    iconAfter={RefreshCw}
                                    onPress={() => {
                                        if (!isConnected) {
                                            Toast.show({
                                                type: 'info',
                                                text1: t('settings.landing.no.internet'),
                                                visibilityTime: 2000,
                                            });
                                        } else {
                                            backupRestoreSheetRef.current?.present();
                                        }
                                    }}
                                />
                            </YGroup.Item>

                            <Separator borderColor="#D0D3D8" />
                        </>
                    )}
                    <YGroup.Item>
                        <ListItem
                            onPress={() => {
                                navigate('SettingsEmergencyContact');
                            }}
                            pressTheme
                            title={t('settings.landing.emergency.contact')}
                            icon={AlertTriangle}
                            iconAfter={ChevronRight}
                        />
                    </YGroup.Item>
                    <Separator borderColor="#D0D3D8" />
                    <YGroup.Item>
                        <ListItem
                            onPress={() => {
                                languageSheetRef.current?.present();
                            }}
                            pressTheme
                            title={t('settings.language.options')}
                            icon={Globe}
                            iconAfter={ChevronRight}
                        />
                    </YGroup.Item>
                    <Separator borderColor="#D0D3D8" />
                    <YGroup.Item>
                        <ListItem
                            onPress={() => {
                                navigate('SettingsWorkoutProfile');
                            }}
                            pressTheme
                            title={t('settings.landing.workout.profile')}
                            icon={PencilLine}
                            iconAfter={ChevronRight}
                        />
                    </YGroup.Item>
                    <Separator borderColor="#D0D3D8" />
                    {userSession != null && (
                        <>
                            <YGroup.Item>
                                <ListItem
                                    pressTheme
                                    title={t('settings.landing.bookmarked.posts')}
                                    icon={Bookmark}
                                    iconAfter={ChevronRight}
                                    onPress={() => {
                                        navigate('SettingsBookmarkPosts');
                                    }}
                                />
                            </YGroup.Item>
                            <Separator borderColor="#D0D3D8" />
                            <YGroup.Item>
                                <ListItem
                                    pressTheme
                                    title={t('settings.landing.logout')}
                                    icon={LogOut}
                                    onPress={() => {
                                        setOpenLogoutDialog(true);
                                    }}
                                />
                            </YGroup.Item>
                            <Separator borderColor="#D0D3D8" />
                        </>
                    )}
                </YGroup>
                <Button
                    backgroundColor={userSession ? '$red11' : '$green11'}
                    pressStyle={{ backgroundColor: userSession ? '$red10' : '$green10' }}
                    color="white"
                    m="$4"
                    borderRadius="$8"
                    onPress={() => {
                        if (!userSession) {
                            authSheetRef.current?.present();
                        } else {
                            setOpenDeleteAccountDialog(true);
                        }
                    }}
                >
                    {userSession ? t('settings.landing.delete.account') : t('settings.landing.login')}
                </Button>
            </ScrollView>
            <Dialog
                title={t('settings.landing.account.logout')}
                description={t('settings.landing.logout.logout.confirmation')}
                onPressOk={() => {
                    signOut();
                    Toast.show({
                        type: 'success',
                        text1: t('settings.landing.logout.success'),
                        visibilityTime: 2000,
                    });
                }}
                open={openLogoutDialog}
                setOpen={setOpenLogoutDialog}
            />
            <Dialog
                title={t('settings.landing.account.delete')}
                description={t('settings.landing.account.delete.confirmation')}
                onPressOk={() => {
                    handleDeleteAccount();
                }}
                open={openDeleteAccountDialog}
                setOpen={setOpenDeleteAccountDialog}
            />
            <Sheet
                onBackdropPressBehavior={loading ? 'none' : 'close'}
                ref={authSheetRef}
                enableDynamicSizing
            >
                <Sheet.ScrollView pointerEvents={loading ? 'none' : 'auto'}>
                    <SettingsAuthSheetContent
                        handleDismissSheet={handleDismissAuthSheet}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </Sheet.ScrollView>
            </Sheet>
            <Sheet
                ref={languageSheetRef}
                enableDynamicSizing
            >
                <Sheet.ScrollView>
                    <SettingsLanguageSheetContent handleDismissSheet={handleDismissLanguageSheet} />
                </Sheet.ScrollView>
            </Sheet>
            <Sheet
                ref={backupRestoreSheetRef}
                enableDynamicSizing
            >
                <Sheet.ScrollView>
                    <SettingsBackupRestoreSheetContent handleDismissSheet={handleDismissBackupRestoreSheet} />
                </Sheet.ScrollView>
            </Sheet>
        </View>
    );
}

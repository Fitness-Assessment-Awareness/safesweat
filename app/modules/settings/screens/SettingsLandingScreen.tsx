import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AlertTriangle, ChevronRight, Eye, Globe, LogOut, PencilLine, RefreshCw } from '@tamagui/lucide-icons';
import React, { useRef, useState } from 'react';
import Toast from 'react-native-toast-message';
import { Button, Image, ListItem, ScrollView, Separator, View, YGroup } from 'tamagui';
import { Dialog } from '../../../components/Dialog';
import { Heading } from '../../../components/Heading';
import { Sheet } from '../../../components/Sheet';
import { useUser } from '../../../context/UserProvider';
import { SettingsAssets } from '../assets';
import { SettingsAuthSheetContent } from '../components/SettingsAuthSheet';
import { useSettingsNavigation } from '../navigation/useSettingsNavigation';
import { deleteUserAccount, signOut } from '../services/AuthService';

export function SettingsLandingScreen() {
    const { navigate } = useSettingsNavigation<'SettingsLanding'>();
    const sheetRef = useRef<BottomSheetModal>(null);
    const userSession = useUser();
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDismissSheet = () => {
        sheetRef.current?.dismiss();
    };

    const handleDeleteAccount = async () => {
        const { error } = await deleteUserAccount(userSession.user.id);
        Toast.show({
            type: error ? 'error' : 'success',
            text1: error ? 'Error deleting account' : 'Account deleted successfully!',
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
                            title="Emergency Contacts"
                            icon={AlertTriangle}
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
                            onPress={() => {
                                navigate('SettingsAssessmentResult');
                            }}
                            pressTheme
                            title="Assessment Result"
                            icon={Eye}
                            iconAfter={ChevronRight}
                        />
                    </YGroup.Item>
                    <Separator borderColor="#D0D3D8" />
                    {userSession != null && (
                        <>
                            <YGroup.Item>
                                <ListItem
                                    pressTheme
                                    title="Logout"
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
                            sheetRef.current?.present();
                        } else {
                            setOpenDeleteAccountDialog(true);
                        }
                    }}
                >
                    {userSession ? 'Delete Account' : 'Login'}
                </Button>
            </ScrollView>
            <Dialog
                title="Logout Confirmation"
                description="Are you sure you want to logout?"
                onPressOk={() => {
                    signOut();
                    Toast.show({
                        type: 'success',
                        text1: 'Logged out successfully!',
                        visibilityTime: 2000,
                    });
                }}
                open={openLogoutDialog}
                setOpen={setOpenLogoutDialog}
            />
            <Dialog
                title="Account Delete"
                description="Do you want to delete this account? You cannot undo this action."
                onPressOk={() => {
                    handleDeleteAccount();
                }}
                open={openDeleteAccountDialog}
                setOpen={setOpenDeleteAccountDialog}
            />
            <Sheet
                onBackdropPressBehavior={loading ? 'none' : 'close'}
                ref={sheetRef}
                enableDynamicSizing
            >
                <Sheet.ScrollView pointerEvents={loading ? 'none' : 'auto'}>
                    <SettingsAuthSheetContent
                        handleDismissSheet={handleDismissSheet}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </Sheet.ScrollView>
            </Sheet>
        </View>
    );
}

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import Toast from 'react-native-toast-message';
import { Button, ScrollView, View, YStack } from 'tamagui';
import { Dialog } from '../../../components/Dialog';
import { Sheet } from '../../../components/Sheet';
import { useEmergencyContacts } from '../../../context/EmergencyContactProvider';
import { SettingsEmergencyContactCard } from '../components/SettingsEmergencyContactCard';
import {
    SettingsEmergencyContactSheetAction,
    SettingsEmergencyContactSheetContent,
} from '../components/SettingsEmergencyContactSheet';
import { EmergencyContact } from '../data/entities/EmergencyContact';

export function SettingsEmergencyContactScreen() {
    const { emergencyContacts, setEmergencyContacts } = useEmergencyContacts();
    const sheetRef = useRef<BottomSheetModal>(null);
    const [action, setAction] = useState(SettingsEmergencyContactSheetAction.ADD);
    const [contactOnEdit, setContactOnEdit] = useState<EmergencyContact | null>(null);
    const [contactOnDelete, setContactOnDelete] = useState<EmergencyContact | null>(null);
    const [openDeleteContactDialog, setOpenDeleteContactDialog] = useState(false);

    const handleDismissSheet = () => {
        setContactOnEdit(null);
        sheetRef.current?.dismiss();
    };

    const deleteContact = () => {
        if (!contactOnDelete) {
            throw new Error('contactOnDelete is not set');
        }
        if (emergencyContacts.length === 1) {
            Toast.show({
                type: 'info',
                text1: 'You cannot delete the last contact',
                visibilityTime: 2000,
            });
            return;
        }
        setEmergencyContacts(emergencyContacts.filter((contact) => contact.id !== contactOnDelete.id));
        setOpenDeleteContactDialog(false);
        setContactOnDelete(null);
    };

    return (
        <View flex={1}>
            <ScrollView flex={1}>
                <YStack
                    gap="$4"
                    px="$3"
                    py="$5"
                >
                    {emergencyContacts.map((emergencyContact) => (
                        <SettingsEmergencyContactCard
                            key={emergencyContact.id}
                            fullName={emergencyContact.fullName}
                            phoneNumber={emergencyContact.phoneNumber}
                            handleEdit={() => {
                                setAction(SettingsEmergencyContactSheetAction.EDIT);
                                setContactOnEdit(emergencyContact);
                                sheetRef.current?.present();
                            }}
                            handleDelete={() => {
                                setContactOnDelete(emergencyContact);
                                setOpenDeleteContactDialog(true);
                            }}
                        />
                    ))}
                </YStack>
            </ScrollView>
            <Button
                disabled={emergencyContacts.length >= 3}
                backgroundColor="darkblue"
                pressStyle={{ backgroundColor: '$blue11' }}
                disabledStyle={{ backgroundColor: '$blue7' }}
                color="white"
                m="$4"
                borderRadius="$8"
                onPress={() => {
                    setAction(SettingsEmergencyContactSheetAction.ADD);
                    sheetRef.current?.present();
                }}
            >
                {emergencyContacts.length < 3 ? 'Add Contact' : 'Reached 3 Contact Limit'}
            </Button>
            <Dialog
                title="Emergency Contact Delete"
                description="Do you want to delete this contact? You cannot undo this action."
                onPressOk={deleteContact}
                open={openDeleteContactDialog}
                setOpen={setOpenDeleteContactDialog}
            />
            <Sheet
                ref={sheetRef}
                enableDynamicSizing
                onDismiss={handleDismissSheet}
            >
                <Sheet.ScrollView>
                    <SettingsEmergencyContactSheetContent
                        handleDismissSheet={handleDismissSheet}
                        action={action}
                        contactOnEdit={contactOnEdit}
                    />
                </Sheet.ScrollView>
            </Sheet>
        </View>
    );
}

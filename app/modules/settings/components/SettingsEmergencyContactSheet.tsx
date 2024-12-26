import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import { Button, Input, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useEmergencyContacts } from '../../../context/EmergencyContactProvider';
import { EMERGENCY_CONTACT_MALAYSIA } from '../constant/EmergencyContactMalaysia';
import { EmergencyContact } from '../data/entities/EmergencyContact';
import { isPhoneNumber } from '../utils/isPhoneNumber';

interface ComponentProps {
    handleDismissSheet: () => void;
    action: SettingsEmergencyContactSheetAction;
    contactOnEdit?: EmergencyContact | null;
}

export enum SettingsEmergencyContactSheetAction {
    ADD = 'Add new',
    EDIT = 'Edit contact',
}

export function SettingsEmergencyContactSheetContent({ handleDismissSheet, action, contactOnEdit }: ComponentProps) {
    const { t } = useTranslation();
    const { emergencyContacts, setEmergencyContacts, updateEmergencyContact } = useEmergencyContacts();

    const [form, setForm] = useState({
        fullName: contactOnEdit ? contactOnEdit.fullName : '',
        phoneNumber: contactOnEdit ? contactOnEdit.phoneNumber : '',
        errorMsg: '',
    });

    const id = useId();

    const validateField = () => {
        if (form.fullName === '' || form.phoneNumber === '') {
            setForm({
                ...form,
                errorMsg: t('settings.emergency.contact.fill.all.fields'),
            });
            return false;
        }
        if (!isPhoneNumber(form.phoneNumber) && form.phoneNumber !== EMERGENCY_CONTACT_MALAYSIA.phoneNumber) {
            setForm({
                ...form,
                errorMsg: t('settings.emergency.contact.invalid.phone.format'),
            });
            return false;
        }
        if (!Linking.canOpenURL(`tel:${form.phoneNumber}`)) {
            setForm({
                ...form,
                errorMsg: t('settings.emergency.contact.phone.not.callable'),
            });
            return false;
        }
        return true;
    };

    const handleAdd = () => {
        if (!validateField()) {
            return;
        }

        setEmergencyContacts([
            ...emergencyContacts,
            {
                phoneId: uuid.v4().toString(),
                fullName: form.fullName,
                phoneNumber: form.phoneNumber,
            },
        ]);
        handleDismissSheet();
        Toast.show({ type: 'success', text1: t('settings.emergency.contact.added'), visibilityTime: 2000 });
    };

    const handleEdit = () => {
        if (contactOnEdit) {
            if (!validateField()) {
                return;
            }

            updateEmergencyContact(contactOnEdit.phoneId, {
                fullName: form.fullName,
                phoneNumber: form.phoneNumber,
            });
            handleDismissSheet();
            Toast.show({ type: 'success', text1: t('settings.emergency.contact.edited'), visibilityTime: 2000 });
        } else {
            throw new Error('contactOnEdit & setContactOnEdit props is required for editing');
        }
    };

    return (
        <>
            <Heading m="$4">{action}</Heading>
            <YStack
                width="85%"
                gap="$4"
                my="$2"
                mx="$4"
            >
                <Label htmlFor={`${id}-fullname`}>{t('settings.emergency.contact.fullname')}</Label>
                <Input
                    id={`${id}-fullname`}
                    value={form.fullName}
                    onChangeText={(e) =>
                        setForm({
                            ...form,
                            fullName: e,
                        })
                    }
                    placeholder={t('settings.emergency.contact.enter.fullname')}
                />
                <Label htmlFor={`${id}-phonenumber`}>{t('settings.emergency.contact.phone.number')}</Label>
                <Input
                    id={`${id}-phonenumber`}
                    value={form.phoneNumber}
                    onChangeText={(e) =>
                        setForm({
                            ...form,
                            phoneNumber: e,
                        })
                    }
                    placeholder={t('settings.emergency.contact.enter.phone')}
                />
                {form.errorMsg && (
                    <Label
                        backgroundColor="red"
                        color="white"
                        borderRadius="$3"
                        textAlign="center"
                        p="$2"
                    >
                        {form.errorMsg}
                    </Label>
                )}
                <Button
                    themeInverse
                    onPress={() => {
                        if (action === SettingsEmergencyContactSheetAction.ADD) {
                            handleAdd();
                        } else if (action === SettingsEmergencyContactSheetAction.EDIT) {
                            handleEdit();
                        }
                    }}
                >
                    OK
                </Button>
            </YStack>
        </>
    );
}

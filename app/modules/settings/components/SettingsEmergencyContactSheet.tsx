import React, { useId, useState } from 'react';
import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import { Button, Input, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useEmergencyContacts } from '../../../context/EmergencyContactProvider';
import { EmergencyContact } from '../data/entities/EmergencyContact';

interface ComponentProps {
    handleDismissSheet: () => void;
    action: SettingsEmergencyContactSheetAction;
    contactOnEdit?: EmergencyContact | null;
}

export enum SettingsEmergencyContactSheetAction {
    ADD = 'Add new',
    EDIT = 'Edit contact',
}

const phoneNumMalaysiaRegex = /^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$/;
const emergencyContactNumMalaysia = '999';

export function SettingsEmergencyContactSheetContent({ handleDismissSheet, action, contactOnEdit }: ComponentProps) {
    const { emergencyContacts, setEmergencyContacts, updateEmergencyContact } = useEmergencyContacts();

    const [form, setForm] = useState({
        fullName: contactOnEdit ? contactOnEdit.fullName : '',
        phoneNumber: contactOnEdit ? contactOnEdit.phoneNumber : '',
        errorMsg: '',
    });

    const id = useId();

    function validateField() {
        if (form.fullName === '' || form.phoneNumber === '') {
            setForm({
                ...form,
                errorMsg: 'Please fill out all fields',
            });
            return false;
        }
        if (!phoneNumMalaysiaRegex.test(form.phoneNumber) && form.phoneNumber !== emergencyContactNumMalaysia) {
            setForm({
                ...form,
                errorMsg: 'Invalid phone number format',
            });
            return false;
        }
        if (!Linking.canOpenURL(`tel:${form.phoneNumber}`)) {
            setForm({
                ...form,
                errorMsg: 'Phone number is not callable',
            });
            return false;
        }
        return true;
    }

    function handleAdd() {
        if (!validateField()) {
            return;
        }

        setEmergencyContacts([
            ...emergencyContacts,
            {
                id: uuid.v4().toString(),
                fullName: form.fullName,
                phoneNumber: form.phoneNumber,
            },
        ]);

        handleDismissSheet();
        Toast.show({ type: 'success', text1: 'New contact added successfully!', visibilityTime: 2000 });
    }

    function handleEdit() {
        if (contactOnEdit) {
            if (!validateField()) {
                return;
            }

            updateEmergencyContact(contactOnEdit.id, {
                fullName: form.fullName,
                phoneNumber: form.phoneNumber,
            });

            handleDismissSheet();
            Toast.show({ type: 'success', text1: 'Contact edited successfully!', visibilityTime: 2000 });
        } else {
            throw new Error('contactOnEdit & setContactOnEdit props is required for editing');
        }
    }

    return (
        <>
            <Heading m="$4">{action}</Heading>
            <YStack
                width="85%"
                gap="$4"
                my="$2"
                mx="$4"
            >
                <Label htmlFor={`${id}-fullname`}>Full name</Label>
                <Input
                    id={`${id}-fullname`}
                    value={form.fullName}
                    onChangeText={(e) =>
                        setForm({
                            ...form,
                            fullName: e,
                        })
                    }
                    placeholder="Enter contact's full name"
                />
                <Label htmlFor={`${id}-phonenumber`}>Phone number</Label>
                <Input
                    keyboardType="phone-pad"
                    id={`${id}-phonenumber`}
                    value={form.phoneNumber}
                    onChangeText={(e) =>
                        setForm({
                            ...form,
                            phoneNumber: e,
                        })
                    }
                    placeholder="Enter contact's phone number"
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

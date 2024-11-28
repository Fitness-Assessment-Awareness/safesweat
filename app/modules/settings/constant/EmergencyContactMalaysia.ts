import uuid from 'react-native-uuid';
import { EmergencyContact } from '../data/entities/EmergencyContact';

export const EMERGENCY_CONTACT_MALAYSIA: EmergencyContact = {
    phoneId: uuid.v4().toString(),
    fullName: 'Ambulance Service',
    phoneNumber: '999',
};

import { LanguageCode } from '../../../../lang/LanguageCode';
import { EmergencyContact } from './EmergencyContact';

export interface SettingsPublicData {
    emergencyContacts: EmergencyContact[];
    languageCode: LanguageCode;
}

import { EmergencyContact } from './EmergencyContact';
import { LanguageCode } from './LanguageCode';

export interface SettingsPublicData {
    emergencyContacts: EmergencyContact[];
    languageCode: LanguageCode;
}

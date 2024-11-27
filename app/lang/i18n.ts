import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LanguageCode } from './LanguageCode';
import en from './en.json';
import ms from './ms.json';

const resources = {
    en,
    ms,
};

i18n.use(initReactI18next).init({
    resources,
    lng: LanguageCode.ENGLISH,
    fallbackLng: [LanguageCode.ENGLISH, LanguageCode.MELAYU],
});

export { i18n };

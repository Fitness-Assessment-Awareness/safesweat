import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LanguageCode } from './LanguageCode';
import catalogueEn from './en/catalogue.json';
import exerciseEn from './en/exercise.json';
import translationEn from './en/translation.json';
import workoutEn from './en/workout.json';
import workoutsEn from './en/workouts.json';
import catalogueMs from './ms/catalogue.json';
import exerciseMs from './ms/exercise.json';
import translationMs from './ms/translation.json';
import workoutMs from './ms/workout.json';
import workoutsMs from './ms/workouts.json';

export const resources = {
    en: {
        translation: translationEn,
        ...catalogueEn,
        ...exerciseEn,
        ...workoutEn,
        ...workoutsEn,
    },
    ms: {
        translation: translationMs,
        ...catalogueMs,
        ...exerciseMs,
        ...workoutMs,
        ...workoutsMs,
    },
} as const;

export const defaultNS = 'translation';

i18n.use(initReactI18next).init({
    resources,
    ns: ['translation', 'exercise'],
    lng: LanguageCode.ENGLISH,
    defaultNS,
    fallbackLng: [LanguageCode.ENGLISH, LanguageCode.MELAYU],
});

export { i18n };

import { OnboardingPublicData } from '../../../modules/onboarding/data/entities/OnboardingPublicData';
import { SettingsPublicData } from '../../../modules/settings/data/entities/SettingsPublicData';

/**
 * Intersect your states here so that intellisense and linting can work properly
 *
 * key -> namespace
 *
 * NOTE: Try to sort the typing alphabetically for better readability
 */
export type StoragePublicData = {
    onboarding: OnboardingPublicData;
    settings: SettingsPublicData;
};

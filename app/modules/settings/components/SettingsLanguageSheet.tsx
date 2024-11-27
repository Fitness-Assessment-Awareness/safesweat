import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import { Label, YStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { useLanguageCode } from '../../../context/LanguageCodeProvider';
import { LanguageCode } from '../../../lang/LanguageCode';

interface ComponentProps {
    handleDismissSheet: () => void;
}

export function SettingsLanguageSheetContent({ handleDismissSheet }: ComponentProps) {
    const { t } = useTranslation();
    const { languageCode, setLanguageCode } = useLanguageCode();
    return (
        <>
            <Heading m="$4">{t('settings.language.options')}</Heading>
            <YStack
                width="85%"
                gap="$4"
                my="$4"
                mx="$4"
            >
                {Object.entries(LanguageCode).map(([key, value]) => (
                    <Fragment key={key}>
                        <Pressable
                            onPress={() => {
                                setLanguageCode(value);
                                handleDismissSheet();
                                Toast.show({
                                    type: 'success',
                                    text1: t('settings.language.changed.success'),
                                    visibilityTime: 2000,
                                })
                            }}
                        >
                            <Chip
                                height="$6"
                                borderRadius="$4"
                                backgroundColor={value === languageCode ? 'darkblue' : 'white'}
                                borderStyle="solid"
                                borderColor="$gray5"
                                borderWidth={1}
                                alignItems="flex-start"
                            >
                                <Label
                                    fontWeight="bold"
                                    size="large"
                                    color={value === languageCode ? 'white' : 'black'}
                                >
                                    {`${key}`}
                                </Label>
                            </Chip>
                        </Pressable>
                    </Fragment>
                ))}
            </YStack>
        </>
    );
}

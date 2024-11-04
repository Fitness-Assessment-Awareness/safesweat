import { Fragment } from 'react';
import { Pressable } from 'react-native';
import { Label, YStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { useLanguageCode } from '../../../context/LanguageCodeProvider';
import { LanguageCode } from '../data/entities/LanguageCode';

interface ComponentProps {
    handleDismissSheet: () => void;
}

export function SettingsLanguageSheetContent({ handleDismissSheet }: ComponentProps) {
    const { languageCode, setLanguageCode } = useLanguageCode();
    return (
        <>
            <Heading m="$4">Language Options</Heading>
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

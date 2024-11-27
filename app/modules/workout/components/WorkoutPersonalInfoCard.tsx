import { useTranslation } from 'react-i18next';
import { XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Paragraph } from '../../../components/Paragraph';

export function WorkoutPersonalInfoCard() {
    const { t } = useTranslation();

    return (
        <XStack justifyContent="space-evenly">
            <YStack
                justifyContent="center"
                alignItems="center"
            >
                <Heading>2</Heading>
                <Paragraph>{t('workout.personal.info.workout')}</Paragraph>
            </YStack>
            <YStack
                justifyContent="center"
                alignItems="center"
            >
                <Heading>0</Heading>
                <Paragraph>{t('workout.personal.info.kcal').toUpperCase()}</Paragraph>
            </YStack>
            <YStack
                justifyContent="center"
                alignItems="center"
            >
                <Heading>0</Heading>
                <Paragraph>{t('workout.personal.info.minute').toUpperCase()}</Paragraph>
            </YStack>
        </XStack>
    );
}

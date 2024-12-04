import { useNetInfo } from '@react-native-community/netinfo';
import { useTranslation } from 'react-i18next';
import { YStack } from 'tamagui';
import { Label } from '../../../../components/Label';
import { useLanguageCode } from '../../../../context/LanguageCodeProvider';
import { useSession } from '../../../../context/SessionProvider';
import { LanguageCode } from '../../../../lang/LanguageCode';
import { EducationPostSummary } from '../data/entities/EducationPost';
import { EducationPostCard } from './EducationPostCard';

interface ComponentProps {
    handleFeedOnPress: (post: EducationPostSummary) => void;
    educationPostsSummary: EducationPostSummary[];
}

export function EducationFeedRecommendedSection({ handleFeedOnPress, educationPostsSummary }: ComponentProps) {
    const { t } = useTranslation();
    const { isConnected } = useNetInfo();
    const userSession = useSession();
    const { languageCode } = useLanguageCode();

    if (educationPostsSummary.length === 0) {
        return null;
    }

    return (
        <>
            <Label size="large">{t('education.feed.post.might.like')}</Label>
            {isConnected && userSession && (
                <YStack gap="$4">
                    {educationPostsSummary.map((post) => (
                        <EducationPostCard
                            key={post.postId}
                            title={languageCode === LanguageCode.ENGLISH ? post.titleEn : post.titleMs}
                            imageSource={{ uri: post.imageUrl }}
                            onPress={() => handleFeedOnPress(post)}
                            backgroundColor="$colorTransparent"
                        />
                    ))}
                </YStack>
            )}
        </>
    );
}

import { useNetInfo } from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { useSession } from '../../../context/SessionProvider';
import { EducationPostSummary } from '../../common/education/data/entities/EducationPost';
import { fetchBookmarkEducationPosts } from '../../common/education/data/services/EducationPostService';
import { EducationFeedScreen } from '../../common/education/screens/EducationFeedScreen';
import { useSettingsNavigation } from '../navigation/useSettingsNavigation';

export function SettingsBookmarkPostsScreen() {
    const navigation = useSettingsNavigation<'SettingsBookmarkPosts'>();
    const { isConnected } = useNetInfo();
    const userSession = useSession();
    const [educationPostsSummary, setEducationPostsSummary] = useState<EducationPostSummary[]>([]);

    useEffect(() => {
        if (isConnected && userSession) {
            fetchBookmarkEducationPosts(userSession.user.id).then((p) => {
                setEducationPostsSummary(p);
            });
        }
    }, [isConnected, userSession]);

    const handleFeedOnPress = (post: EducationPostSummary) => {
        navigation.navigate('SettingsEducationPostDetails', {
            postDetails: {
                postId: post.postId,
                imageUrl: post.imageUrl,
            },
        });
    };

    return (
        <EducationFeedScreen
            educationPostsSummary={educationPostsSummary}
            handleFeedOnPress={handleFeedOnPress}
        />
    );
}

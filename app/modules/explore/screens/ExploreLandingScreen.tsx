import { useNetInfo } from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useSession } from '../../../context/SessionProvider';
import { EducationPostSummary } from '../../common/education/data/entities/EducationPost';
import {
    fetchEducationPosts,
    fetchRecommendedEducationPosts,
} from '../../common/education/data/services/EducationPostService';
import { EducationFeedScreen } from '../../common/education/screens/EducationFeedScreen';
import { useExploreNavigation } from '../navigation/useExploreNavigation';

export function ExploreLandingScreen() {
    const navigation = useExploreNavigation<'ExploreLanding'>();
    const { isConnected } = useNetInfo();
    const userSession = useSession();
    const [educationPostsSummary, setEducationPostsSummary] = useState<EducationPostSummary[]>([]);
    const [recommendedEducationPosts, setRecommendedEducationPosts] = useState<EducationPostSummary[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (isConnected && userSession) {
                fetchRecommendedEducationPosts(userSession.user.id).then((p) => {
                    setRecommendedEducationPosts(p);
                });
                fetchEducationPosts().then((p) => {
                    setEducationPostsSummary(p);
                });
                if (refreshing) {
                    setRefreshing(false);
                }
            }
        }, [isConnected, userSession, refreshing]),
    );

    const handleFeedOnPress = (post: EducationPostSummary) => {
        navigation.navigate('ExploreEducationPostDetails', {
            postDetails: {
                postId: post.postId,
                imageUrl: post.imageUrl,
            },
        });
    };

    return (
        <EducationFeedScreen
            educationPostsSummary={educationPostsSummary}
            recommendedEducationPosts={recommendedEducationPosts}
            handleFeedOnPress={handleFeedOnPress}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
        />
    );
}

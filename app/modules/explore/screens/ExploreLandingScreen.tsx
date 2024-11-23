import { useNetInfo } from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';

import { useSession } from '../../../context/SessionProvider';
import { EducationPostSummary } from '../../common/education/data/entities/EducationPost';
import { fetchEducationPosts } from '../../common/education/data/services/EducationPostService';
import { EducationFeedScreen } from '../../common/education/screens/EducationFeedScreen';
import { useExploreNavigation } from '../navigation/useExploreNavigation';

export function ExploreLandingScreen() {
    const navigation = useExploreNavigation<'ExploreLanding'>();
    const { isConnected } = useNetInfo();
    const userSession = useSession();
    const [educationPostsSummary, setEducationPostsSummary] = useState<EducationPostSummary[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (isConnected && userSession) {
            fetchEducationPosts().then((p) => {
                setEducationPostsSummary(p);
            });
            if (refreshing) {
                setRefreshing(false);
            }
        }
    }, [isConnected, userSession, refreshing]);

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
            handleFeedOnPress={handleFeedOnPress}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
        />
    );
}

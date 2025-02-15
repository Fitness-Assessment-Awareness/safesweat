import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { EducationPostScreen } from '../../common/education/screens/EducationPostScreen';
import { ExploreEducationPostDetailsParams } from '../navigation/ExploreStackParamList';

interface ComponentProps {
    route: RouteProp<{ ExploreEducationPostDetails: ExploreEducationPostDetailsParams }, 'ExploreEducationPostDetails'>;
}

export function ExploreEducationPostDetailsScreen({ route }: ComponentProps) {
    const { postDetails } = route.params;
    const { postId, imageUrl } = postDetails;

    return (
        <EducationPostScreen
            postId={postId}
            imageUrl={imageUrl}
        />
    );
}

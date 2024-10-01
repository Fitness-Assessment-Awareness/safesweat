import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { EducationPostScreen } from '../../common/education/screens/EducationPostScreen';
import { SettingsEducationPostDetailsParams } from '../navigation/SettingsStackParamList';

interface ComponentProps {
    route: RouteProp<
        { SettingsEducationPostDetails: SettingsEducationPostDetailsParams },
        'SettingsEducationPostDetails'
    >;
}

export function SettingsEducationPostDetailsScreen({ route }: ComponentProps) {
    const { postDetails } = route.params;
    const { postId, imageUrl } = postDetails;

    return (
        <EducationPostScreen
            postId={postId}
            imageUrl={imageUrl}
        />
    );
}

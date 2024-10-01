export interface SettingsEducationPostDetailsParams {
    postDetails: {
        postId: string;
        imageUrl: string;
    };
}

export type SettingsStackParamList = {
    SettingsLanding: undefined;
    SettingsAssessmentResult: undefined;
    SettingsBookmarkPosts: undefined;
    SettingsEducationPostDetails: SettingsEducationPostDetailsParams;
};

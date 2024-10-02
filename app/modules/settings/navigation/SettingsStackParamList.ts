export interface SettingsEducationPostDetailsParams {
    postDetails: {
        postId: string;
        imageUrl: string;
    };
}

export type SettingsStackParamList = {
    SettingsLanding: undefined;
    SettingsWorkoutProfile: undefined;
    SettingsBookmarkPosts: undefined;
    SettingsEducationPostDetails: SettingsEducationPostDetailsParams;
};

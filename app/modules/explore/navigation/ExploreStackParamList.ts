export interface ExploreEducationPostDetailsParams {
    postDetails: {
        postId: string;
        imageUrl: string;
    };
}

export type ExploreStackParamList = {
    ExploreLanding: undefined;
    ExploreEducationPostDetails: ExploreEducationPostDetailsParams;
};

import { Network } from '../../../../network/Network';
import { EducationCategory } from '../entities/EducationCategory';
import { EducationPost, EducationPostSummary } from '../entities/EducationPost';
import { EducationPostLike } from '../entities/EducationPostLike';

export const fetchEducationPosts = async () => {
    const response = await Network.get<EducationPostSummary[]>('/education-post/list-summary');
    return response.data;
};

export const fetchEducationPostById = async (postId: string) => {
    const response = await Network.get<EducationPost>(`/education-post/${postId}`);
    return response.data;
};

export const fetchEducationCategories = async () => {
    const response = await Network.get<EducationCategory[]>('/education-post/categories');
    return response.data;
};

export const likeEducationPost = async (educationPostLike: EducationPostLike) => {
    const response = await Network.post<EducationPostLike>('/education-post/like', educationPostLike);
    return response.data;
};

export const dislikeEducationPost = async (educationPostLike: EducationPostLike) => {
    await Network.post<EducationPostLike>('/education-post/dislike', educationPostLike);
};

export const removeAllLikes = async (userId: string) => {
    await Network.delete<void>(`/education-post/likes/${userId}`);
};

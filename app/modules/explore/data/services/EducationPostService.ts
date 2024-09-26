import { Network } from '../../../../network/Network';
import { EducationCategory } from '../entities/EducationCategory';
import { EducationPost, EducationPostSummary } from '../entities/EducationPost';
import { EducationPostBookmark } from '../entities/EducationPostBookmark';
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

export const bookmarkEducationPost = async (educationPostBookmark: EducationPostBookmark) => {
    const response = await Network.post<EducationPostBookmark>('/education-post/bookmark', educationPostBookmark);
    return response.data;
};

export const removeBookmarkEducationPost = async (educationPostBookmark: EducationPostBookmark) => {
    await Network.post<EducationPostBookmark>('/education-post/bookmark-remove', educationPostBookmark);
};

export const removeAllBookmarks = async (userId: string) => {
    await Network.delete<void>(`/education-post/bookmark/${userId}`);
};

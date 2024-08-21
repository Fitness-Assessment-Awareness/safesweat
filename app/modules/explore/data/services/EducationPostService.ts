import { Network } from '../../../../network/Network';
import { EducationCategory } from '../entities/EducationCategory';
import { EducationPost } from '../entities/EducationPost';

export const fetchEducationPosts = async () => {
    const response = await Network.get<EducationPost[]>('/education-post/list');
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

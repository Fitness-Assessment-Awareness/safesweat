import { EducationCategory } from '../modules/explore/data/entities/EducationCategory';
import { EducationPost } from '../modules/explore/data/entities/EducationPost';
import { Network } from '../network/Network';

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

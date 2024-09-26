import { EducationCategory } from './EducationCategory';
import { EducationPostBookmark } from './EducationPostBookmark';
import { EducationPostLike } from './EducationPostLike';

export type EducationPost = {
    postId: string;
    titleEn: string;
    titleMs: string;
    contentEn: string;
    contentMs: string;
    categoryId: string;
    imageUrl: string;
    createdDate: Date;
    createdBy: string;
    lastUpdatedDate?: Date;
    lastUpdatedBy?: string;
    categoryDto: EducationCategory;
    educationPostLikeDtos: EducationPostLike[];
    educationPostBookmarkDtos: EducationPostBookmark[];
};

export type EducationPostSummary = {
    postId: string;
    titleEn: string;
    titleMs: string;
    imageUrl: string;
    categoryId: string;
    likeCount: number;
};

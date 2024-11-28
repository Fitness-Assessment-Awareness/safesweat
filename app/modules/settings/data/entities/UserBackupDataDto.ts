import { Difficulty } from '../../../onboarding/data/entities/Difficulty';
import { UserBackupFocusAreaDto } from '../../../onboarding/data/entities/FocusArea';
import { Gender } from '../../../onboarding/data/entities/Gender';
import { UserBackupHealthProblemDto } from '../../../onboarding/data/entities/HealthProblem';
import { UserBackupWorkoutHistoryDto } from '../../../onboarding/data/entities/WorkoutHistory';
import { UserBackupEmergencyContactDto } from './EmergencyContact';

export interface UserBackupDataDto {
    userId: string;
    gender: Gender;
    difficulty: Difficulty;
    weight: number;
    height: number;
    weeklyGoal: number | null;
    userBackupEmergencyContactDtos: UserBackupEmergencyContactDto[];
    userBackupFocusAreaDtos: UserBackupFocusAreaDto[];
    userBackupHealthProblemDtos: UserBackupHealthProblemDto[];
    userBackupWorkoutHistoryDtos: UserBackupWorkoutHistoryDto[];
}

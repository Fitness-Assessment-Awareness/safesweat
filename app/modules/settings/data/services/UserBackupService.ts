import { Network } from '../../../../network/Network';
import { UserBackupDataDto } from '../entities/UserBackupDataDto';

export const fetchUserBackupDataByUserId = async (userId: string) => {
    const response = await Network.get<UserBackupDataDto>(`/user-backup/${userId}`);
    return response.data;
};

export const createUserBackupData = async (userBackupData: UserBackupDataDto) => {
    const response = await Network.post<UserBackupDataDto>('/user-backup', userBackupData);
    return response.data;
};

export const deleteUserBackupData = async (userId: string) => {
    await Network.delete(`/user-backup/${userId}`);
};

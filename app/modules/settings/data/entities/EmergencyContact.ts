export interface EmergencyContact {
    phoneId: string;
    fullName: string;
    phoneNumber: string;
}

export interface UserBackupEmergencyContactDto extends EmergencyContact {
    userId: string;
}

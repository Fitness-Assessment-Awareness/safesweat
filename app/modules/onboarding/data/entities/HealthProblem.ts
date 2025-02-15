export enum HealthProblem {
    HeartCondition = 'Heart Condition',
    ChestPainWithPhysicalActivity = 'Chest Pain with Physical Activity',
    ChestPainWithoutPhysicalActivity = 'Chest Pain without Physical Activity',
    Dizziness = 'Dizziness',
    BoneOrJointProblem = 'Bone/Joint Problem',
    UnderBloodPressureDrugs = 'Under Blood Pressure Drugs',
}

export interface UserBackupHealthProblemDto {
    userId: string;
    healthProblem: HealthProblem;
}

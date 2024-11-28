export enum FocusArea {
    FullBody = 'Full Body',
    Arm = 'Arm',
    Abs = 'Abs',
    Butt = 'Butt',
    Leg = 'Leg',
}

export interface UserBackupFocusAreaDto {
    userId: string;
    focusArea: FocusArea;
}

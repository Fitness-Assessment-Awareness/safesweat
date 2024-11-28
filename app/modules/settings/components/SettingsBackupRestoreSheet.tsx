import { CircleCheck } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button, Spinner, YStack } from 'tamagui';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useEmergencyContacts } from '../../../context/EmergencyContactProvider';
import { useSession } from '../../../context/SessionProvider';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { UserBackupDataDto } from '../data/entities/UserBackupDataDto';
import { createUserBackupData, fetchUserBackupDataByUserId } from '../data/services/UserBackupService';

interface ComponentProps {
    handleDismissSheet: () => void;
}

enum CloudAction {
    BACKUP_DATA = 'Backup Data',
    RESTORE_DATA = 'Restore Data',
    DONE = 'Done',
}
export function SettingsBackupRestoreSheetContent({ handleDismissSheet }: ComponentProps) {
    const { t } = useTranslation();
    const [action, setAction] = useState<CloudAction | null>(null);
    const [loading, setLoading] = useState(false);
    const userSession = useSession();
    const { workoutProfile, setWorkoutProfile } = useWorkoutProfile();
    const { emergencyContacts, setEmergencyContacts } = useEmergencyContacts();

    const backupUserData = async (userId: string) => {
        setLoading(true);
        const userBackupData: UserBackupDataDto = {
            userId,
            difficulty: workoutProfile.difficulty,
            gender: workoutProfile.gender,
            height: workoutProfile.height,
            weight: workoutProfile.weight,
            weeklyGoal: workoutProfile.weeklyGoal,
            userBackupEmergencyContactDtos: emergencyContacts.map((contact) => ({
                userId,
                ...contact,
            })),
            userBackupFocusAreaDtos: workoutProfile.focusAreas.map((focusArea) => ({
                userId,
                focusArea,
            })),
            userBackupHealthProblemDtos: workoutProfile.healthProblems.map((healthProblem) => ({
                userId,
                healthProblem,
            })),
            userBackupWorkoutHistoryDtos: workoutProfile.workoutHistories.map((workoutHistory) => ({
                userId,
                ...workoutHistory,
            })),
        };
        await createUserBackupData(userBackupData);
        setLoading(false);
        setAction(CloudAction.DONE);
    };

    const restoreUserData = async (userId: string) => {
        setLoading(true);
        fetchUserBackupDataByUserId(userId).then((userBackupData) => {
            if (userBackupData !== null) {
                setWorkoutProfile({
                    difficulty: userBackupData.difficulty,
                    focusAreas: userBackupData.userBackupFocusAreaDtos.map((focusArea) => focusArea.focusArea),
                    gender: userBackupData.gender,
                    healthProblems: userBackupData.userBackupHealthProblemDtos.map(
                        (healthProblem) => healthProblem.healthProblem,
                    ),
                    height: userBackupData.height,
                    weight: userBackupData.weight,
                    weeklyGoal: userBackupData.weeklyGoal,
                    workoutHistories: userBackupData.userBackupWorkoutHistoryDtos.map((workoutHistory) => ({
                        workoutKey: workoutHistory.workoutKey,
                        timestamp: workoutHistory.timestamp,
                        rating: workoutHistory.rating,
                        multiplier: workoutHistory.multiplier,
                    })),
                });
                setEmergencyContacts(
                    userBackupData.userBackupEmergencyContactDtos.map((contact) => ({
                        phoneId: contact.phoneId,
                        fullName: contact.fullName,
                        phoneNumber: contact.phoneNumber,
                    })),
                );
            }
        });
        setLoading(false);
        setAction(CloudAction.DONE);
    };

    const handleBackupRestoreData = async () => {
        if (userSession === null) {
            throw new Error('User session is null');
        }
        if (action === CloudAction.BACKUP_DATA) {
            backupUserData(userSession.user.id);
        }
        if (action === CloudAction.RESTORE_DATA) {
            restoreUserData(userSession.user.id);
        }
    };

    return (
        <>
            <Heading m="$4">{t('settings.landing.backup.and.restore')}</Heading>
            {action === CloudAction.DONE && (
                <>
                    <CircleCheck
                        size="$8"
                        alignSelf="center"
                        color="green"
                    />
                    <Button
                        themeInverse
                        m="$4"
                        borderRadius="$8"
                        onPress={() => {
                            handleDismissSheet();
                        }}
                    >
                        {t('general.shared.done')}
                    </Button>
                </>
            )}
            {action !== CloudAction.DONE && (
                <YStack
                    width="85%"
                    gap="$4"
                    my="$4"
                    mx="$4"
                >
                    <Pressable
                        onPress={() => {
                            setAction(CloudAction.BACKUP_DATA);
                            Toast.show({
                                type: 'error',
                                text1: t('general.shared.warning'),
                                text1Style: { fontSize: 16 },
                                text2: t('settings.backup.data.to.cloud.warning'),
                                text2Style: { fontWeight: 'bold', fontSize: 14 },
                                visibilityTime: 2000,
                            });
                        }}
                    >
                        <Chip
                            height="$6"
                            borderRadius="$4"
                            backgroundColor={action === CloudAction.BACKUP_DATA ? 'darkblue' : 'white'}
                            borderStyle="solid"
                            borderColor="$gray5"
                            borderWidth={1}
                            alignItems="flex-start"
                        >
                            <Label
                                fontWeight="bold"
                                size="large"
                                color={action === CloudAction.BACKUP_DATA ? 'white' : 'black'}
                            >
                                {t('settings.backup.data.to.cloud')}
                            </Label>
                        </Chip>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            setAction(CloudAction.RESTORE_DATA);
                            Toast.show({
                                type: 'error',
                                text1: t('general.shared.warning'),
                                text1Style: { fontSize: 16 },
                                text2: t('settings.restore.data.from.cloud.warning'),
                                text2Style: { fontWeight: 'bold', fontSize: 14 },
                                visibilityTime: 2000,
                            });
                        }}
                    >
                        <Chip
                            height="$6"
                            borderRadius="$4"
                            backgroundColor={action === CloudAction.RESTORE_DATA ? 'darkblue' : 'white'}
                            borderStyle="solid"
                            borderColor="$gray5"
                            borderWidth={1}
                            alignItems="flex-start"
                        >
                            <Label
                                fontWeight="bold"
                                size="large"
                                color={action === CloudAction.RESTORE_DATA ? 'white' : 'black'}
                            >
                                {t('settings.restore.data.from.cloud')}
                            </Label>
                        </Chip>
                    </Pressable>
                    <Button
                        themeInverse
                        m="$4"
                        borderRadius="$8"
                        onPress={() => {
                            if (!action) {
                                handleDismissSheet();
                            } else {
                                handleBackupRestoreData();
                            }
                        }}
                    >
                        {!loading && (action ? 'OK' : t('general.shared.close'))}
                        {loading && <Spinner size="large" />}
                    </Button>
                    <Toast position="bottom" />
                </YStack>
            )}
        </>
    );
}

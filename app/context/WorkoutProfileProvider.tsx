import dayjs from 'dayjs';
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Difficulty } from '../modules/onboarding/data/entities/Difficulty';
import { Gender } from '../modules/onboarding/data/entities/Gender';
import { WorkoutProfile } from '../modules/onboarding/data/entities/WorkoutProfile';
import { WORKOUTS } from '../modules/workout/data/workouts';
import { StoragePublicRepository } from '../storage/domain/useCases/StoragePublicRepository';

interface WorkoutProfileContextValue {
    workoutProfile: WorkoutProfile & { workoutPoints: number };
    setWorkoutProfile: Dispatch<SetStateAction<WorkoutProfile>>;
}

const WorkoutProfileContext = createContext<WorkoutProfileContextValue | null>(null);

interface ComponentProps {
    children: ReactNode;
}

export function WorkoutProfileProvider({ children }: ComponentProps) {
    const [workoutProfile, setWorkoutProfile] = useState<WorkoutProfile>({
        gender: Gender.Male,
        focusAreas: [],
        difficulty: Difficulty.NONE,
        healthProblems: [],
        weight: 50,
        height: 160,
        weeklyGoal: null,
        workoutHistories: [],
    });
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const rehydrateWorkoutProfile = async () => {
            const storedWorkoutProfile = await StoragePublicRepository.instance.get({
                namespace: 'onboarding',
                key: 'workoutProfile',
            });

            if (storedWorkoutProfile) {
                setWorkoutProfile(storedWorkoutProfile);
            }
            setIsReady(true);
        };

        rehydrateWorkoutProfile();
    }, []);

    const setWorkoutProfileInternal = useCallback(
        (payload: SetStateAction<WorkoutProfile>) => {
            if (typeof payload === 'function') {
                setWorkoutProfile((prevWorkoutProfile) => {
                    const newWorkoutProfile = payload(prevWorkoutProfile);
                    StoragePublicRepository.instance.set({
                        namespace: 'onboarding',
                        key: 'workoutProfile',
                        value: newWorkoutProfile,
                    });
                    return { ...prevWorkoutProfile, ...newWorkoutProfile };
                });
            } else {
                setWorkoutProfile(payload);
                StoragePublicRepository.instance.set({
                    namespace: 'onboarding',
                    key: 'workoutProfile',
                    value: payload,
                });
            }
        },
        [setWorkoutProfile],
    );

    const getWorkoutDifficultyInPoints = (difficulty: Difficulty) => {
        switch (difficulty) {
            case Difficulty.Beginner:
                return 0;
            case Difficulty.Intermediate:
                return 15;
            case Difficulty.Advanced:
                return 30;
            default:
                return 0;
        }
    };

    const workoutHistoriesInPoints = workoutProfile.workoutHistories.reduce((acc, history) => {
        const workout = WORKOUTS[history.workoutKey];
        if (dayjs(history.timestamp).diff(dayjs(), 'days') <= 30) {
            if (workout.difficulty === 'beginner') {
                return acc + 1;
            }
            if (workout.difficulty === 'intermediate') {
                return acc + 2;
            }
            return acc + 3;
        }
        return acc;
    }, 0);

    const value: WorkoutProfileContextValue = useMemo(
        () => ({
            workoutProfile: {
                ...workoutProfile,
                workoutPoints: getWorkoutDifficultyInPoints(workoutProfile.difficulty) + workoutHistoriesInPoints,
            },
            setWorkoutProfile: setWorkoutProfileInternal,
        }),
        [workoutProfile, workoutHistoriesInPoints, setWorkoutProfileInternal],
    );

    if (!isReady) {
        return null;
    }

    return <WorkoutProfileContext.Provider value={value}>{children}</WorkoutProfileContext.Provider>;
}

export function useWorkoutProfile() {
    const context = useContext(WorkoutProfileContext);

    if (!context) {
        throw new Error('useWorkoutProfile must be used within a WorkoutProfileProvider');
    }

    const { workoutProfile, setWorkoutProfile } = context;

    const updateWorkoutProfile = useCallback(
        (update: Partial<WorkoutProfile>) => {
            setWorkoutProfile({ ...workoutProfile, ...update });
        },
        [setWorkoutProfile, workoutProfile],
    );

    return { workoutProfile, updateWorkoutProfile, setWorkoutProfile };
}

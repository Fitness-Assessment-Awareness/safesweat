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
import { WorkoutProfile } from '../modules/onboarding/data/entities/AssessmentResult';
import { Difficulty } from '../modules/onboarding/data/entities/Difficulty';
import { Gender } from '../modules/onboarding/data/entities/Gender';
import { StoragePublicRepository } from '../storage/domain/useCases/StoragePublicRepository';

const WorkoutProfileContext = createContext<{
    workoutProfile: WorkoutProfile;
    setWorkoutProfile: Dispatch<SetStateAction<WorkoutProfile>>;
} | null>(null);

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
        workoutHistories: [],
    });

    useEffect(() => {
        const rehydrateAssessmentResult = async () => {
            const storedWorkoutProfile = await StoragePublicRepository.instance.get({
                namespace: 'onboarding',
                key: 'workoutProfile',
            });

            if (storedWorkoutProfile) {
                setWorkoutProfile(storedWorkoutProfile);
            }
        };

        rehydrateAssessmentResult();
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

    const value = useMemo(
        () => ({ workoutProfile, setWorkoutProfile: setWorkoutProfileInternal }),
        [workoutProfile, setWorkoutProfileInternal],
    );

    return <WorkoutProfileContext.Provider value={value}>{children}</WorkoutProfileContext.Provider>;
}

export function useWorkoutProfile() {
    const context = useContext(WorkoutProfileContext);

    if (!context) {
        throw new Error('useWorkoutProfile must be used within a AssessmentResultProvider');
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

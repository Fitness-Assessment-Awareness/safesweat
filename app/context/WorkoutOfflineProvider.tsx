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
import { WorkoutListAllPlan } from '../modules/workout/data/entities/WorkoutListAll';
import { StoragePublicRepository } from '../storage/domain/useCases/StoragePublicRepository';

interface WorkoutOfflineContextValue {
    offlineWorkouts: WorkoutListAllPlan[];
    setOfflineWorkouts: Dispatch<SetStateAction<WorkoutListAllPlan[]>>;
}

interface ComponentProps {
    children: ReactNode;
}

const WorkoutOfflineContext = createContext<WorkoutOfflineContextValue | null>(null);

export function WorkoutOfflineProvider({ children }: ComponentProps) {
    const [offlineWorkouts, setOfflineWorkouts] = useState<WorkoutListAllPlan[]>([]);

    const setOfflineWorkoutInternal = useCallback((payload: SetStateAction<WorkoutListAllPlan[]>) => {
        if (typeof payload === 'function') {
            setOfflineWorkouts((prevOfflineWorkouts) => {
                const newOfflineWorkouts = payload(prevOfflineWorkouts);
                StoragePublicRepository.instance.set({
                    namespace: 'workout',
                    key: 'offlineWorkouts',
                    value: newOfflineWorkouts,
                });
                return newOfflineWorkouts;
            });
        } else {
            setOfflineWorkouts(payload);
            StoragePublicRepository.instance.set({
                namespace: 'workout',
                key: 'offlineWorkouts',
                value: payload,
            });
        }
    }, []);

    useEffect(() => {
        const rehydrateOfflineWorkouts = async () => {
            const storedOfflineWorkouts = await StoragePublicRepository.instance.get({
                namespace: 'workout',
                key: 'offlineWorkouts',
            });

            if (storedOfflineWorkouts) {
                setOfflineWorkouts(storedOfflineWorkouts);
            }
        };

        rehydrateOfflineWorkouts();
    }, []);

    const value = useMemo(
        () => ({
            offlineWorkouts,
            setOfflineWorkouts: setOfflineWorkoutInternal,
        }),
        [offlineWorkouts, setOfflineWorkoutInternal],
    );

    return <WorkoutOfflineContext.Provider value={value}>{children}</WorkoutOfflineContext.Provider>;
}

export function useWorkoutOffline() {
    const context = useContext(WorkoutOfflineContext);

    if (!context) {
        throw new Error('useWorkoutOffline must be used within a WorkoutOfflineProvider');
    }

    return context;
}

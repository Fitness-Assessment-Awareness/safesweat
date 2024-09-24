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
import { User } from '../modules/onboarding/data/entities/User';
import { StoragePublicRepository } from '../storage/domain/useCases/StoragePublicRepository';

const UserContext = createContext<{ user: User; setUser: Dispatch<SetStateAction<User>> } | null>(null);

interface ComponentProps {
    children: ReactNode;
}

export function UserProvider({ children }: ComponentProps) {
    const [user, setUser] = useState<User>({
        gender: Gender.Male,
        focusAreas: [],
        difficulty: Difficulty.NONE,
        healthProblems: [],
        weight: 50,
        height: 160,
        workoutHistories: [],
    });

    useEffect(() => {
        const rehydrateUser = async () => {
            const storedUser = await StoragePublicRepository.instance.get({
                namespace: 'onboarding',
                key: 'user',
            });

            if (storedUser) {
                setUser(storedUser);
            }
        };

        rehydrateUser();
    }, []);

    const setUserInternal = useCallback(
        (payload: SetStateAction<User>) => {
            if (typeof payload === 'function') {
                setUser((prevUser) => {
                    const newUser = payload(prevUser);
                    StoragePublicRepository.instance.set({
                        namespace: 'onboarding',
                        key: 'user',
                        value: newUser,
                    });
                    return { ...prevUser, ...newUser };
                });
            } else {
                setUser(payload);
                StoragePublicRepository.instance.set({ namespace: 'onboarding', key: 'user', value: payload });
            }
        },
        [setUser],
    );

    const value = useMemo(() => ({ user, setUser: setUserInternal }), [user, setUserInternal]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    const { user, setUser } = context;

    const updateUser = useCallback(
        (update: Partial<User>) => {
            setUser({ ...user, ...update });
        },
        [setUser, user],
    );

    return { user, updateUser, setUser };
}

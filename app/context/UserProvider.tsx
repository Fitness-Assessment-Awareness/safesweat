import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useMemo, useState } from 'react';
import { Difficulty } from '../modules/onboarding/data/Difficulty';
import { Gender } from '../modules/onboarding/data/Gender';
import { User } from '../modules/onboarding/data/User';

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

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

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

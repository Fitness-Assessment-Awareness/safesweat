import { createContext, ReactNode, useMemo, useState } from 'react';
import { Difficulty } from '../modules/onboarding/data/Difficulty';
import { Gender } from '../modules/onboarding/data/Gender';
import { User } from '../modules/onboarding/data/User';

const UserContext = createContext<{ user: User; setUser: (u: User) => void } | null>(null);

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
    });

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

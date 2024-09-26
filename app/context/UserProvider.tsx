import { Session } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../utils/Supabase';

const UserContext = createContext<Session | null>(null);

interface ComponentProps {
    children: ReactNode;
}

export function UserProvider({ children }: ComponentProps) {
    const [userSession, setUserSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUserSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setUserSession(session);
        });
    }, []);

    const value = useMemo(() => userSession, [userSession]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    const userSession = useContext(UserContext);
    return userSession;
}

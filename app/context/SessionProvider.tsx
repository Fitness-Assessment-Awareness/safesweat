import { useNetInfo } from '@react-native-community/netinfo';
import { Session } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../utils/Supabase';

const SessionContext = createContext<Session | null>(null);

interface ComponentProps {
    children: ReactNode;
}

export function SessionProvider({ children }: ComponentProps) {
    const [userSession, setUserSession] = useState<Session | null>(null);
    const { isConnected } = useNetInfo();

    useEffect(() => {
        if (isConnected) {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setUserSession(session);
            });

            supabase.auth.onAuthStateChange((_event, session) => {
                setUserSession(session);
            });
        }
    }, [isConnected]);

    const value = useMemo(() => userSession, [userSession]);

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
    const userSession = useContext(SessionContext);
    return userSession;
}

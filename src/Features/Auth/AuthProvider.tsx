import { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from "@/services/supabase";

type AuthCtx = { session: Session | null; isLoading: boolean };
const AuthContext = createContext<AuthCtx>({ session: null, isLoading: true });
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setIsLoading(false);
        });
        const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
        return () => sub.subscription.unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ session, isLoading }}>{children}</AuthContext.Provider>;
}
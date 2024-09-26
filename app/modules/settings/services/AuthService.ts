import { EXPO_PUBLIC_PASSWORD_RESET_REDIRECT_URL, EXPO_PUBLIC_SIGNUP_SUCCESS_REDIRECT_URL } from '@env';
import { supabase } from '../../../utils/Supabase';
import { removeAllBookmarks, removeAllLikes } from '../../explore/data/services/ExplorePublicService';

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
};
export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: EXPO_PUBLIC_SIGNUP_SUCCESS_REDIRECT_URL,
        },
    });
    return { data, error };
};

export const sendSignupEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
            emailRedirectTo: EXPO_PUBLIC_SIGNUP_SUCCESS_REDIRECT_URL,
        },
    });
    return { data, error };
};

export const sendPasswordResetEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: EXPO_PUBLIC_PASSWORD_RESET_REDIRECT_URL,
    });
    return { data, error };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};

export const deleteUserAccount = async (userId: string) => {
    const { data, error } = await supabase.auth.admin.deleteUser(userId);
    removeAllLikes(userId);
    removeAllBookmarks(userId);
    return { data, error };
};

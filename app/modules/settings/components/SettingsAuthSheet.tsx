import { Mail } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { Button, Input, Spinner, Text, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { supabase } from '../../../utils/Supabase';

export function SettingsAuthSheetContent() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        errorMsg: '',
    });
    const [isVerifyEmailPage, setIsVerifyEmailPage] = useState(false);
    const [action, setAction] = useState<'login' | 'signup'>('login');
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { email, password } = form;
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setForm({
                ...form,
                errorMsg: error.message,
            });
        }
        setLoading(false);
    }

    async function signUpWithEmail() {
        setLoading(true);
        const { email, password } = form;
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            setForm({
                ...form,
                errorMsg: error.message,
            });
        }
        if (!session) {
            setIsVerifyEmailPage(true);
        }
        setLoading(false);
    }

    return (
        <>
            {!isVerifyEmailPage && (
                <>
                    <Heading m="$4">{action === 'login' ? 'Sign in' : 'Sign up'}</Heading>
                    <YStack
                        width="85%"
                        gap="$4"
                        my="$2"
                        mx="$4"
                    >
                        <Label htmlFor="email">Email</Label>
                        <Input
                            disabled={loading}
                            id="email"
                            value={form.email}
                            onChangeText={(e) =>
                                setForm({
                                    ...form,
                                    email: e,
                                })
                            }
                            placeholder="abc@gmail.com"
                        />
                        <Label htmlFor="password">Password</Label>
                        <Input
                            disabled={loading}
                            secureTextEntry
                            id="password"
                            value={form.password}
                            onChangeText={(e) =>
                                setForm({
                                    ...form,
                                    password: e,
                                })
                            }
                            placeholder="Password"
                        />
                        {action === 'login' && <Label alignSelf="flex-end">Forgot your password?</Label>}
                        {form.errorMsg && (
                            <Text
                                backgroundColor="red"
                                color="white"
                                borderRadius="$3"
                                textAlign="center"
                                p="$2"
                            >
                                {form.errorMsg}
                            </Text>
                        )}
                        <Button
                            my="$2"
                            themeInverse
                            onPress={action === 'login' ? signInWithEmail : signUpWithEmail}
                        >
                            {loading ? <Spinner size="large" /> : 'OK'}
                        </Button>

                        <XStack
                            alignSelf="center"
                            mb="$4"
                        >
                            {action === 'login' && (
                                <>
                                    <Label>Don&#8216;t have an account? </Label>
                                    <Label
                                        textDecorationLine="underline"
                                        onPress={() => {
                                            setForm({
                                                email: '',
                                                password: '',
                                                errorMsg: '',
                                            });
                                            setAction('signup');
                                        }}
                                    >
                                        Sign Up
                                    </Label>
                                </>
                            )}
                            {action === 'signup' && (
                                <>
                                    <Label>Already have an account? </Label>
                                    <Label
                                        textDecorationLine="underline"
                                        onPress={() => {
                                            setForm({
                                                email: '',
                                                password: '',
                                                errorMsg: '',
                                            });
                                            setAction('login');
                                        }}
                                    >
                                        Sign In
                                    </Label>
                                </>
                            )}
                        </XStack>
                    </YStack>
                </>
            )}
            {isVerifyEmailPage && (
                <>
                    <Heading m="$4">Email Verification</Heading>
                    <YStack
                        my="$8"
                        alignSelf="center"
                        width="85%"
                        gap="$4"
                        mx="$4"
                        alignItems="center"
                    >
                        <Mail size="$8" />
                        <Label size="large">Please check your inbox for email verification!</Label>
                        {form.errorMsg && (
                            <Text
                                backgroundColor="red"
                                color="white"
                                borderRadius="$3"
                                textAlign="center"
                                p="$2"
                            >
                                {form.errorMsg}
                            </Text>
                        )}
                    </YStack>

                    <Button
                        themeInverse
                        m="$4"
                        borderRadius="$8"
                        onPress={() => {
                            setIsVerifyEmailPage(false);
                            setAction('login');
                            setForm({
                                email: '',
                                password: '',
                                errorMsg: '',
                            });
                        }}
                    >
                        OK
                    </Button>
                </>
            )}
        </>
    );
}

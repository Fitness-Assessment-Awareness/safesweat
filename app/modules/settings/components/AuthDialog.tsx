import { Mail } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { Adapt, Button, Dialog, Input, SheetProps, Spinner, Text, XStack, YStack } from 'tamagui';
import { HeaderTitle } from '../../../components/HeaderTitle';
import { Label } from '../../../components/Label';
import { Sheet } from '../../../components/Sheet';
import { supabase } from '../../../utils/Supabase';

interface ComponentProps extends SheetProps {}

export function AuthDialog({ ...otherProps }: ComponentProps) {
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
        <Dialog modal>
            <Dialog.Trigger asChild>
                <Button
                    backgroundColor="$green11"
                    pressStyle={{ backgroundColor: '$green10' }}
                    color="white"
                    m="$4"
                    borderRadius="$8"
                >
                    Login
                </Button>
            </Dialog.Trigger>

            <Adapt
                when="sm"
                platform="touch"
            >
                <Sheet
                    moveOnKeyboardChange
                    snapPoints={[60]}
                    {...otherProps}
                >
                    <Adapt.Contents />
                </Sheet>
            </Adapt>

            <Dialog.Portal>
                <Dialog.Overlay />

                <Dialog.Content>
                    {!isVerifyEmailPage && (
                        <>
                            <Dialog.Title m="$4">
                                <HeaderTitle>{action === 'login' ? 'Sign in' : 'Sign up'}</HeaderTitle>
                            </Dialog.Title>
                            <YStack
                                width="85%"
                                gap="$4"
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

                                <XStack alignSelf="center">
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
                            <Dialog.Title m="$4">
                                <HeaderTitle>Email Verification</HeaderTitle>
                            </Dialog.Title>
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
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}

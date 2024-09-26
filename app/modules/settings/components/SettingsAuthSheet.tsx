import { Mail } from '@tamagui/lucide-icons';
import React, { useId, useState } from 'react';
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button, Input, Spinner, Text, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { sendPasswordResetEmail, sendSignupEmail, signIn, signUp } from '../services/AuthService';

interface ComponentProps {
    handleDismissSheet: () => void;
    loading: boolean;
    setLoading: (l: boolean) => void;
}

enum AuthAction {
    SIGN_IN = 'Sign in',
    SIGN_UP = 'Sign up',
    EMAIL_VERIFICATION = 'Email Verification',
    FORGOT_PASSWORD = 'Forgot Password',
}

export function SettingsAuthSheetContent({ handleDismissSheet, loading, setLoading }: ComponentProps) {
    const [form, setForm] = useState({
        email: '',
        password: '',
        errorMsg: '',
    });
    const [authAction, setAuthAction] = useState<AuthAction>(AuthAction.SIGN_IN);
    const id = useId();

    async function handleSignin() {
        setLoading(true);
        const { error } = await signIn(form.email, form.password);
        setLoading(false);
        if (error) {
            setForm({
                ...form,
                errorMsg: error.message,
            });
            return;
        }
        handleDismissSheet();
        Toast.show({ type: 'success', text1: 'Logged in successfully!', visibilityTime: 2000 });
    }

    async function handleSignup() {
        setLoading(true);
        const { email, password } = form;
        const {
            data: { session },
            error,
        } = await signUp(email, password);
        setLoading(false);
        if (error) {
            setForm({
                ...form,
                errorMsg: error.message,
            });
            return;
        }
        if (!session) {
            setAuthAction(AuthAction.EMAIL_VERIFICATION);
            setForm({
                ...form,
                errorMsg: '',
            });
        }
    }

    async function handleResendSignupEmail() {
        setLoading(true);
        const { error } = await sendSignupEmail(form.email);
        setLoading(false);
        if (error) {
            setForm({
                ...form,
                errorMsg: error.message,
            });
            return;
        }
        Toast.show({ type: 'success', text1: 'Email sent successfully!', visibilityTime: 1000 });
        setForm({
            ...form,
            errorMsg: '',
        });
    }

    async function handleResetPassword() {
        setLoading(true);
        const { error } = await sendPasswordResetEmail(form.email);
        setLoading(false);
        if (error) {
            setForm({
                ...form,
                errorMsg: error.message,
            });
            return;
        }
        Toast.show({ type: 'success', text1: 'Check email to reset your password', visibilityTime: 1000 });
        setForm({
            ...form,
            errorMsg: '',
        });
    }

    return (
        <>
            <Heading m="$4">{authAction}</Heading>
            {authAction === AuthAction.SIGN_IN && (
                <YStack
                    width="85%"
                    gap="$4"
                    my="$2"
                    mx="$4"
                >
                    <Label htmlFor={`${id}-signin-email`}>Email</Label>
                    <Input
                        disabled={loading}
                        id={`${id}-signin-email`}
                        value={form.email}
                        onChangeText={(e) =>
                            setForm({
                                ...form,
                                email: e,
                            })
                        }
                        placeholder="abc@gmail.com"
                    />
                    <Label htmlFor={`${id}-signin-password`}>Password</Label>
                    <Input
                        disabled={loading}
                        secureTextEntry
                        id={`${id}-signin-password`}
                        value={form.password}
                        onChangeText={(e) =>
                            setForm({
                                ...form,
                                password: e,
                            })
                        }
                        placeholder="Password"
                    />
                    <Pressable
                        hitSlop={8}
                        onPress={() => {
                            setAuthAction(AuthAction.FORGOT_PASSWORD);
                            setForm({
                                email: '',
                                password: '',
                                errorMsg: '',
                            });
                        }}
                    >
                        <Label alignSelf="flex-end">Forgot your password?</Label>
                    </Pressable>
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
                        onPress={() => {
                            handleSignin();
                        }}
                    >
                        {loading ? <Spinner size="large" /> : 'OK'}
                    </Button>

                    <XStack
                        alignSelf="center"
                        mb="$4"
                    >
                        <Label>Don&#8216;t have an account? </Label>
                        <Label
                            textDecorationLine="underline"
                            onPress={() => {
                                setForm({
                                    email: '',
                                    password: '',
                                    errorMsg: '',
                                });
                                setAuthAction(AuthAction.SIGN_UP);
                            }}
                        >
                            Sign Up
                        </Label>
                    </XStack>
                </YStack>
            )}
            {authAction === AuthAction.SIGN_UP && (
                <YStack
                    width="85%"
                    gap="$4"
                    my="$2"
                    mx="$4"
                >
                    <Label htmlFor={`${id}-signup-email`}>Email</Label>
                    <Input
                        disabled={loading}
                        id={`${id}-signup-email`}
                        value={form.email}
                        onChangeText={(e) =>
                            setForm({
                                ...form,
                                email: e,
                            })
                        }
                        placeholder="abc@gmail.com"
                    />

                    <Label htmlFor={`${id}-signup-password`}>Password</Label>
                    <Input
                        disabled={loading}
                        secureTextEntry
                        id={`${id}-signup-password`}
                        value={form.password}
                        onChangeText={(e) =>
                            setForm({
                                ...form,
                                password: e,
                            })
                        }
                        placeholder="Password"
                    />
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
                        onPress={() => {
                            handleSignup();
                        }}
                    >
                        {loading ? <Spinner size="large" /> : 'OK'}
                    </Button>

                    <XStack
                        alignSelf="center"
                        mb="$4"
                    >
                        <Label>Already have an account? </Label>
                        <Label
                            textDecorationLine="underline"
                            onPress={() => {
                                setForm({
                                    email: '',
                                    password: '',
                                    errorMsg: '',
                                });
                                setAuthAction(AuthAction.SIGN_IN);
                            }}
                        >
                            Sign In
                        </Label>
                    </XStack>
                </YStack>
            )}
            {authAction === AuthAction.FORGOT_PASSWORD && (
                <>
                    <YStack
                        width="85%"
                        gap="$4"
                        my="$2"
                        mx="$4"
                    >
                        <Label htmlFor={`${id}-forgot-password-email`}>Email</Label>
                        <Input
                            disabled={loading}
                            id={`${id}-forgot-password-email`}
                            value={form.email}
                            onChangeText={(e) =>
                                setForm({
                                    ...form,
                                    email: e,
                                })
                            }
                            placeholder="abc@gmail.com"
                        />
                        <Pressable
                            hitSlop={8}
                            onPress={() => {
                                handleResetPassword();
                            }}
                        >
                            <Label alignSelf="flex-end">Send Password Reset Email</Label>
                        </Pressable>
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
                            setAuthAction(AuthAction.SIGN_IN);
                            setForm({
                                email: '',
                                password: '',
                                errorMsg: '',
                            });
                        }}
                    >
                        {loading ? <Spinner size="large" /> : 'Back to Login'}
                    </Button>
                    <Toast position="bottom" />
                </>
            )}
            {authAction === AuthAction.EMAIL_VERIFICATION && (
                <>
                    <YStack
                        my="$2"
                        alignSelf="center"
                        width="85%"
                        gap="$4"
                        mx="$4"
                        alignItems="center"
                    >
                        <Mail size="$8" />
                        <Pressable
                            hitSlop={8}
                            onPress={() => {
                                handleResendSignupEmail();
                            }}
                        >
                            <Label>Resend Email</Label>
                        </Pressable>
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
                            setAuthAction(AuthAction.SIGN_IN);
                            setForm({
                                email: '',
                                password: '',
                                errorMsg: '',
                            });
                        }}
                    >
                        {loading ? <Spinner size="large" /> : 'Back to Login'}
                    </Button>
                    <Toast position="bottom" />
                </>
            )}
        </>
    );
}

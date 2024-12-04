import { useNetInfo } from '@react-native-community/netinfo';
import { Mail, WifiOff } from '@tamagui/lucide-icons';
import React, { useEffect, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button, Input, Spinner, Text, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
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
    NO_INTERNET = 'No Internet Found',
}

export function SettingsAuthSheetContent({ handleDismissSheet, loading, setLoading }: ComponentProps) {
    const { t } = useTranslation();
    const { isConnected } = useNetInfo();
    const [form, setForm] = useState({
        email: '',
        password: '',
        errorMsg: '',
    });

    const [authAction, setAuthAction] = useState<AuthAction>(AuthAction.SIGN_IN);
    useEffect(() => {
        if (!isConnected) {
            setAuthAction(AuthAction.NO_INTERNET);
        } else {
            setAuthAction(AuthAction.SIGN_IN);
        }
    }, [isConnected]);

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
        Toast.show({ type: 'success', text1: t('settings.auth.login.success'), visibilityTime: 2000 });
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
        Toast.show({ type: 'success', text1: t('settings.auth.sent.signup.email.success'), visibilityTime: 1000 });
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
        Toast.show({
            type: 'success',
            text1: t('settings.auth.check.reset.password.email'),
            visibilityTime: 1000,
        });
        setForm({
            ...form,
            errorMsg: '',
        });
    }

    const getHeading = (a: AuthAction) => {
        switch (a) {
            case AuthAction.SIGN_IN:
                return t('settings.auth.sign.in');
            case AuthAction.SIGN_UP:
                return t('settings.auth.sign.up');
            case AuthAction.EMAIL_VERIFICATION:
                return t('settings.auth.email.verification');
            case AuthAction.FORGOT_PASSWORD:
                return t('settings.auth.forgot.password');
            case AuthAction.NO_INTERNET:
                return t('settings.auth.no.internet.found');
            default:
                return '';
        }
    };

    return (
        <>
            <Heading m="$4">{getHeading(authAction)}</Heading>
            {authAction === AuthAction.NO_INTERNET && (
                <YStack
                    my="$2"
                    alignSelf="center"
                    width="85%"
                    gap="$4"
                    mx="$4"
                    alignItems="center"
                >
                    <WifiOff size="$8" />
                    <Paragraph
                        p="$3"
                        alignSelf="center"
                    >
                        {t('settings.auth.connect.internet.to.continue')}
                    </Paragraph>
                </YStack>
            )}
            {authAction === AuthAction.SIGN_IN && (
                <YStack
                    width="85%"
                    gap="$4"
                    my="$2"
                    mx="$4"
                >
                    <Label htmlFor={`${id}-signin-email`}>{t('settings.auth.email')}</Label>
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
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                    <Label htmlFor={`${id}-signin-password`}>{t('settings.auth.password')}</Label>
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
                        placeholder={t('settings.auth.password')}
                        autoCorrect={false}
                        autoCapitalize="none"
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
                        <Label alignSelf="flex-end">{t('settings.auth.forgot.password')}</Label>
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
                        <Label>{`${t('settings.auth.no.account')} `}</Label>
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
                            {t('settings.auth.sign.up')}
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
                    <Label htmlFor={`${id}-signup-email`}>{t('settings.auth.email')}</Label>
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
                        autoCorrect={false}
                        autoCapitalize="none"
                    />

                    <Label htmlFor={`${id}-signup-password`}>{t('settings.auth.password')}</Label>
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
                        placeholder={t('settings.auth.password')}
                        autoCorrect={false}
                        autoCapitalize="none"
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
                        <Label>{`${t('settings.auth.already.have.account')} `}</Label>
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
                            {t('settings.auth.sign.in')}
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
                        <Label htmlFor={`${id}-forgot-password-email`}>{t('settings.auth.email')}</Label>
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
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                        <Pressable
                            hitSlop={8}
                            onPress={() => {
                                handleResetPassword();
                            }}
                        >
                            <Label alignSelf="flex-end">{t('settings.auth.send.password.reset.email')}</Label>
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
                        {loading ? <Spinner size="large" /> : t('settings.auth.back.to.login')}
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
                            <Label>{t('settings.auth.resend.email')}</Label>
                        </Pressable>
                        <Label size="large">{t('settings.auth.check.inbox.email.verification')}</Label>
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
                        {loading ? <Spinner size="large" /> : t('settings.auth.back.to.login')}
                    </Button>
                    <Toast position="bottom" />
                </>
            )}
        </>
    );
}

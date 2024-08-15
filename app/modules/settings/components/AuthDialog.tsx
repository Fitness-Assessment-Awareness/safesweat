import { Mail } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { Adapt, Button, Dialog, Input, SheetProps, Text, XStack, YStack } from 'tamagui';
import { HeaderTitle } from '../../../components/HeaderTitle';
import { Label } from '../../../components/Label';
import { Sheet } from '../../../components/Sheet';
import { supabase } from '../../../utils/Supabase';

interface ComponentProps extends SheetProps {}

export function AuthDialog({ ...otherProps }: ComponentProps) {
    const [email, setEmail] = useState('');
    const [isVerifyEmailPage, setIsVerifyEmailPage] = useState(false);
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [action, setAction] = useState<'login' | 'signup'>('login');

    async function signInWithEmail() {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setErrorMsg(error.message);
        }
    }

    async function signUpWithEmail() {
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            setErrorMsg(error.message);
        }
        if (!session) {
            setIsVerifyEmailPage(true);
        }
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
                                    id="email"
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="abc@gmail.com"
                                />
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    secureTextEntry
                                    id="password"
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Password"
                                />
                                {action === 'login' && <Label alignSelf="flex-end">Forgot your password?</Label>}
                                {errorMsg && (
                                    <Text
                                        backgroundColor="red"
                                        color="white"
                                        borderRadius="$3"
                                        textAlign="center"
                                        p="$2"
                                    >
                                        {errorMsg}
                                    </Text>
                                )}
                                <Button
                                    my="$2"
                                    themeInverse
                                    onPress={action === 'login' ? signInWithEmail : signUpWithEmail}
                                >
                                    OK
                                </Button>

                                <XStack alignSelf="center">
                                    {action === 'login' && (
                                        <>
                                            <Label>Don&#8216;t have an account? </Label>
                                            <Label
                                                textDecorationLine="underline"
                                                onPress={() => {
                                                    setErrorMsg('');
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
                                                    setErrorMsg('');
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
                                {errorMsg && (
                                    <Text
                                        backgroundColor="red"
                                        color="white"
                                        borderRadius="$3"
                                        textAlign="center"
                                        p="$2"
                                    >
                                        {errorMsg}
                                    </Text>
                                )}
                            </YStack>
                            <Dialog.Close
                                displayWhenAdapted
                                asChild
                                my="$2"
                            >
                                <Button
                                    themeInverse
                                    m="$4"
                                    borderRadius="$8"
                                    onPress={() => {
                                        setErrorMsg('');
                                        setIsVerifyEmailPage(false);
                                    }}
                                >
                                    OK
                                </Button>
                            </Dialog.Close>
                        </>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}

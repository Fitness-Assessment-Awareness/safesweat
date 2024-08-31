import { useContext } from 'react';
import { RulerPicker } from 'react-native-ruler-picker';
import { Button, Progress, ScrollView, View, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { UserContext } from '../../../context/UserContext';
import { useRootNavigation } from '../../../navigation/useAppNavigation';

export function OnboardingBodyInfoSelectScreen() {
    const { user, setUser } = useContext(UserContext)!;
    const { navigate } = useRootNavigation();

    return (
        <View flex={1}>
            <Progress
                m="$4"
                size="$1"
                value={100}
                alignSelf="center"
                width="30%"
            >
                <Progress.Indicator
                    backgroundColor="darkblue"
                    animation="bouncy"
                />
            </Progress>
            <ScrollView flex={1}>
                <YStack
                    alignItems="center"
                    p="$4"
                >
                    <Heading alignSelf="center">Let us know you better</Heading>
                    <Label
                        p="$2"
                        fontWeight="normal"
                        textAlign="center"
                    >
                        Let us know you better to help boost your workout results and safety
                    </Label>
                    <YStack
                        py="$8"
                        px="$5"
                        gap="$2"
                    >
                        <Heading
                            px="$4"
                            size="small"
                            fontWeight="bold"
                        >
                            Weight
                        </Heading>
                        <RulerPicker
                            height={100}
                            min={0}
                            max={700}
                            fractionDigits={0}
                            initialValue={user.weight}
                            indicatorColor="#0055D3"
                            valueTextStyle={{ color: '#0055D3' }}
                            onValueChangeEnd={(value) => {
                                setUser({ ...user, weight: +value });
                            }}
                            unit="kg"
                        />
                        <Heading
                            px="$4"
                            pt="$10"
                            size="small"
                            fontWeight="bold"
                        >
                            Height
                        </Heading>
                        <RulerPicker
                            height={100}
                            min={0}
                            max={300}
                            fractionDigits={0}
                            initialValue={user.height}
                            indicatorColor="#0055D3"
                            valueTextStyle={{ color: '#0055D3' }}
                            onValueChangeEnd={(value) => {
                                setUser({ ...user, height: +value });
                            }}
                            unit="cm"
                        />
                    </YStack>
                </YStack>
            </ScrollView>
            <Button
                backgroundColor="darkblue"
                pressStyle={{ backgroundColor: '$blue11' }}
                disabledStyle={{ backgroundColor: '$blue7' }}
                color="white"
                m="$4"
                borderRadius="$8"
                onPress={() => {
                    navigate('HomeTab', { screen: 'WorkoutStack', params: { screen: 'WorkoutLanding' } });
                }}
            >
                Get my plan
            </Button>
        </View>
    );
}

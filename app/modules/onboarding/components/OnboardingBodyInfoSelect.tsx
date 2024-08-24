import { RulerPicker } from 'react-native-ruler-picker';
import { YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';

interface ComponentProps {
    height: number;
    setHeight: (height: number) => void;
    weight: number;
    setWeight: (weight: number) => void;
}

export function OnboardingBodyInfoSelect({ height, setHeight, weight, setWeight }: ComponentProps) {
    return (
        <YStack
            alignItems="center"
            p="$4"
        >
            <Heading alignSelf="center">Let us know you better</Heading>
            <Label
                p="$2"
                fontWeight="normal"
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
                    initialValue={weight}
                    indicatorColor="#0055D3"
                    valueTextStyle={{ color: '#0055D3' }}
                    onValueChangeEnd={(value) => setWeight(+value)}
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
                    initialValue={height}
                    indicatorColor="#0055D3"
                    valueTextStyle={{ color: '#0055D3' }}
                    onValueChangeEnd={(value) => setHeight(+value)}
                    unit="cm"
                />
            </YStack>
        </YStack>
    );
}

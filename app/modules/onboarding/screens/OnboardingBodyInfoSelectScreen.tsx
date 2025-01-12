import { useTranslation } from 'react-i18next';
import { RulerPicker } from 'react-native-ruler-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Progress, ScrollView, View, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { useWorkoutProfile } from '../../../context/WorkoutProfileProvider';
import { useRootNavigation } from '../../../navigation/useAppNavigation';

export function OnboardingBodyInfoSelectScreen() {
    const { t } = useTranslation();
    const { workoutProfile, setWorkoutProfile } = useWorkoutProfile();
    const { navigate } = useRootNavigation();
    const { bottom } = useSafeAreaInsets();

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
                    <Heading alignSelf="center">{t('onboarding.shared.know.you.better')}</Heading>
                    <Label
                        p="$2"
                        fontWeight="normal"
                        textAlign="center"
                    >
                        {`${t('onboarding.shared.know.you.better')} ${t('onboarding.body.info.boost.workout.results.and.safety'.toLowerCase())}`}
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
                            {t('onboarding.body.info.weight')}
                        </Heading>
                        <RulerPicker
                            height={100}
                            min={0}
                            max={700}
                            fractionDigits={0}
                            initialValue={workoutProfile.weight}
                            indicatorColor="#0055D3"
                            valueTextStyle={{ color: '#0055D3' }}
                            onValueChangeEnd={(value) => {
                                setWorkoutProfile({ ...workoutProfile, weight: +value });
                            }}
                            unit="kg"
                        />
                        <Heading
                            px="$4"
                            pt="$10"
                            size="small"
                            fontWeight="bold"
                        >
                            {t('onboarding.body.info.height')}
                        </Heading>
                        <RulerPicker
                            height={100}
                            min={0}
                            max={300}
                            fractionDigits={0}
                            initialValue={workoutProfile.height}
                            indicatorColor="#0055D3"
                            valueTextStyle={{ color: '#0055D3' }}
                            onValueChangeEnd={(value) => {
                                setWorkoutProfile({ ...workoutProfile, height: +value });
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
                mb={bottom}
                borderRadius="$8"
                onPress={() => {
                    navigate('HomeTab', { screen: 'WorkoutStack', params: { screen: 'WorkoutLanding' } });
                }}
            >
                {t('onboarding.body.info.get.plan')}
            </Button>
        </View>
    );
}

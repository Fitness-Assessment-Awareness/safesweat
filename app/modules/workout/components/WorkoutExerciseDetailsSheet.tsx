import LottieView, { AnimationObject } from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { XStack, YStack } from 'tamagui';
import { BulletPoint } from '../../../components/BulletPoint';
import { Chip } from '../../../components/Chip';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Numbering } from '../../../components/Numbering';
import { Paragraph } from '../../../components/Paragraph';
import { Sheet } from '../../../components/Sheet';

interface CommonMistakes {
    title: string;
    description: string;
}

interface BaseComponentProps {
    title: string;
    lottieSource: AnimationObject;
    instructions: string;
    focusAreas: string[];
    commonMistakes: CommonMistakes[];
    breathingTips: string[];
}

interface DurationComponentProps extends BaseComponentProps {
    type: 'duration';
    duration: number;
}

interface RepsComponentProps extends BaseComponentProps {
    type: 'reps';
    reps: number;
}

type ComponentProps = DurationComponentProps | RepsComponentProps;

export function WorkoutExerciseDetailsSheetContent({
    title,
    lottieSource,
    instructions,
    focusAreas,
    commonMistakes,
    breathingTips,
    ...otherProps
}: ComponentProps) {
    const { t } = useTranslation();

    return (
        <>
            <Heading
                p="$4"
                pb={0}
            >
                {title}
            </Heading>
            <Sheet.ScrollView
                px="$4"
                contentContainerStyle={{ rowGap: '$4', pt: '$8', pb: '$12' }}
            >
                <LottieView
                    source={lottieSource}
                    autoPlay
                    loop
                    speed={1.5}
                    style={{ width: '100%', height: 200 }}
                />
                <XStack
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Heading
                        color="$blue11Light"
                        size="small"
                    >
                        {otherProps.type === 'reps'
                            ? t('workout.exercise.details.repetitions').toUpperCase()
                            : t('workout.exercise.details.duration').toUpperCase()}
                    </Heading>
                    <Label size="large">
                        {otherProps.type === 'reps' ? `x${otherProps.reps}` : `${otherProps.duration}s`}
                    </Label>
                </XStack>
                <Heading
                    color="$blue11Light"
                    size="small"
                >
                    {t('exercise.shared.instructions')}
                </Heading>
                <Paragraph>{instructions}</Paragraph>
                <Heading
                    color="$blue11Light"
                    size="small"
                >
                    {t('exercise.shared.focus.area')}
                </Heading>
                <XStack
                    flexWrap="wrap"
                    gap="$3"
                >
                    {focusAreas.map((focusArea) => (
                        <Chip key={focusArea}>{focusArea}</Chip>
                    ))}
                </XStack>
                <Heading
                    color="$blue11Light"
                    size="small"
                >
                    {t('exercise.shared.common.mistakes')}
                </Heading>
                {commonMistakes.map((commonMistake, index) => (
                    <Numbering
                        number={index + 1}
                        key={commonMistake.title}
                    >
                        <YStack
                            rowGap="$1"
                            flex={1}
                        >
                            <Label size="large">{commonMistake.title}</Label>
                            <Paragraph>{commonMistake.description}</Paragraph>
                        </YStack>
                    </Numbering>
                ))}
                <Heading
                    color="$blue11Light"
                    size="small"
                >
                    {t('exercise.shared.breathing.tips')}
                </Heading>
                {breathingTips.map((breathingTip) => (
                    <BulletPoint key={breathingTip}>
                        <Paragraph flex={1}>{breathingTip}</Paragraph>
                    </BulletPoint>
                ))}
            </Sheet.ScrollView>
        </>
    );
}

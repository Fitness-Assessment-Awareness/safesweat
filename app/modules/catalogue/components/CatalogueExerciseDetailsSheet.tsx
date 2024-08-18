import LottieView, { AnimationObject } from 'lottie-react-native';
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

interface ComponentProps {
    title: string;
    lottieSource: AnimationObject;
    instructions: string;
    focusAreas: string[];
    commonMistakes: CommonMistakes[];
    breathingTips: string[];
}

export function CatalogueExerciseDetailsSheetContent({
    title,
    lottieSource,
    instructions,
    focusAreas,
    commonMistakes,
    breathingTips,
}: ComponentProps) {
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
                <Heading
                    color="$blue11Light"
                    size="small"
                >
                    INSTRUCTIONS
                </Heading>
                <Paragraph>{instructions}</Paragraph>
                <Heading
                    color="$blue11Light"
                    size="small"
                >
                    FOCUS AREA
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
                    COMMON MISTAKES
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
                    BREATHING TIPS
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

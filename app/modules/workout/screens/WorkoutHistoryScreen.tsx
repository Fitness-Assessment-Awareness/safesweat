import { Image, ScrollView, View, XStack, YStack } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';
import { Paragraph } from '../../../components/Paragraph';
import { WorkoutAssets } from '../assets';

export function WorkoutHistoryScreen() {
    return (
        <ScrollView flex={1}>
            <Heading p="$3">Weekly Summary</Heading>
            <View
                flex={1}
                backgroundColor="white"
            >
                <View
                    p="$3"
                    borderBottomWidth={1}
                    borderBottomColor="$gray5"
                    rowGap="$1"
                >
                    <Label size="large">Aug 25 - Aug 31</Label>
                    <Paragraph>1 workout</Paragraph>
                </View>
                <XStack
                    p="$3"
                    columnGap="$3"
                >
                    <Image
                        source={WorkoutAssets.workoutBeginner}
                        width={64}
                        height={64}
                        borderRadius="$4"
                        objectFit="cover"
                    />
                    <YStack rowGap="$2">
                        <Paragraph>Aug 28, 11:18 PM</Paragraph>
                        <Label size="large">ABS BEGINNER</Label>
                    </YStack>
                </XStack>
            </View>
        </ScrollView>
    );
}

import { ImageSourcePropType } from 'react-native';
import { Card, CardProps, Image } from 'tamagui';
import { Heading } from '../../../components/Heading';
import { Label } from '../../../components/Label';

interface ComponentProps extends CardProps {
    title: string;
    description: string;
    imageSource: ImageSourcePropType;
}

export function WorkoutPlanCard({ title, description, imageSource, ...cardProps }: ComponentProps) {
    return (
        <Card
            borderRadius="$9"
            elevate
            overflow="hidden"
            p="$4"
            pt="$13"
            {...cardProps}
        >
            <Card.Footer flexDirection="column">
                <Heading
                    color="white"
                    textShadowRadius={1}
                    textShadowColor="black"
                >
                    {title}
                </Heading>
                <Label
                    size="large"
                    color="white"
                    textShadowRadius={1}
                    textShadowColor="black"
                >
                    {description}
                </Label>
            </Card.Footer>
            <Card.Background>
                <Image
                    objectFit="cover"
                    style={{ width: '100%', height: '100%' }}
                    source={imageSource}
                />
            </Card.Background>
        </Card>
    );
}

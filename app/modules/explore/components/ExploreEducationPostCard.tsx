import { ImageSourcePropType } from 'react-native';
import { Card, CardProps, Image } from 'tamagui';
import { Heading } from '../../../components/Heading';

interface ComponentProps extends CardProps {
    title: string;
    imageSource: ImageSourcePropType;
}

export function ExploreEducationPostCard({ title, imageSource, ...cardProps }: ComponentProps) {
    return (
        <Card
            borderRadius="$9"
            overflow="hidden"
            p="$4"
            pt="$13"
            {...cardProps}
        >
            <Card.Footer flexDirection="row">
                <Heading
                    color="white"
                    textShadowRadius={1}
                    textShadowColor="black"
                >
                    {title}
                </Heading>
            </Card.Footer>
            <Card.Background opacity={0.8}>
                <Image
                    objectFit="cover"
                    style={{ width: '100%', height: '100%' }}
                    source={imageSource}
                />
            </Card.Background>
        </Card>
    );
}

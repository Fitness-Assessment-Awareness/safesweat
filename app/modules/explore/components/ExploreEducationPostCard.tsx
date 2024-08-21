import { Heart } from '@tamagui/lucide-icons';
import { ImageSourcePropType } from 'react-native';
import { Card, CardProps, Image } from 'tamagui';
import { Label } from '../../../components/Label';

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
            <Card.Footer
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Label
                    size="large"
                    fontWeight="semibold"
                    color="white"
                    textShadowRadius={1}
                    textShadowColor="black"
                >
                    {title}
                </Label>
                <Heart color="white" />
            </Card.Footer>
            <Card.Background opacity={0.65}>
                <Image
                    objectFit="cover"
                    style={{ width: '100%', height: '100%' }}
                    source={imageSource}
                />
            </Card.Background>
        </Card>
    );
}

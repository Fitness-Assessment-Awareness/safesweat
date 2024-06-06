import { Circle, XStack, XStackProps } from 'tamagui';

export function BulletPoint({ children, ...otherProps }: XStackProps) {
    return (
        <XStack {...otherProps}>
            <Circle
                backgroundColor="black"
                size={7}
                mt={5}
                mx="$3"
            />
            {children}
        </XStack>
    );
}

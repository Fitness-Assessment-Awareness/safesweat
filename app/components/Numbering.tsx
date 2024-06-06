import { Circle, XStack, XStackProps } from 'tamagui';
import { Label } from './Label';

interface ComponentProps extends XStackProps {
    number: number;
}

export function Numbering({ children, number, ...otherProps }: ComponentProps) {
    return (
        <XStack
            columnGap="$3"
            {...otherProps}
        >
            <Circle
                size="$1"
                backgroundColor="lightgray"
                alignItems="center"
                justifyContent="center"
            >
                <Label color="$blue11Light">{number}</Label>
            </Circle>
            {children}
        </XStack>
    );
}

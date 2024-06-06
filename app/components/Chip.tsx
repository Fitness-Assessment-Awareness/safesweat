import { View, ViewProps } from 'tamagui';
import { Paragraph } from './Paragraph';

export function Chip({ children, ...otherProps }: ViewProps) {
    return (
        <View
            borderRadius="$8"
            py="$2"
            px="$4"
            backgroundColor="lightgray"
            justifyContent="center"
            alignItems="center"
            {...otherProps}
        >
            <Paragraph>{children}</Paragraph>
        </View>
    );
}

import { View, ViewProps } from 'tamagui';
import { Paragraph } from './Paragraph';

interface ComponentProps extends ViewProps {
    isSelected: boolean;
    onChange?: (isSelected: boolean) => void;
}

export function SelectableChip({ children, isSelected, onChange, ...otherProps }: ComponentProps) {
    return (
        <View
            borderRadius="$8"
            py="$2"
            px="$4"
            backgroundColor={isSelected ? '#DBE8FF' : 'lightgray'}
            borderWidth={1}
            borderColor={isSelected ? '#0000E6' : 'lightgray'}
            justifyContent="center"
            alignItems="center"
            onPress={() => onChange?.(!isSelected)}
            {...otherProps}
        >
            <Paragraph color={isSelected ? '#0000E6' : 'black'}>{children}</Paragraph>
        </View>
    );
}

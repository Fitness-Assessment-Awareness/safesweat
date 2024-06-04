import { Text, styled } from 'tamagui';

export const Label = styled(Text, {
    fontWeight: 'bold',
    color: 'black',
    variants: {
        size: {
            'xx-small': {
                fontSize: 10,
                lineHeight: 14,
                letterSpacing: -0.1,
            },
            'x-small': {
                fontSize: 11,
                lineHeight: 16,
                letterSpacing: -0.11,
            },
            small: {
                fontSize: 12,
                lineHeight: 16,
                letterSpacing: -0.12,
            },
            default: {
                fontSize: 14,
                lineHeight: 18,
                letterSpacing: -0.14,
            },
            large: {
                fontSize: 16,
                lineHeight: 20,
                letterSpacing: -0.16,
            },
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

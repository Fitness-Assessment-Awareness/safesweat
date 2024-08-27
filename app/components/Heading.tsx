import { Text, styled } from 'tamagui';

export const Heading = styled(Text, {
    color: 'black',
    fontWeight: 'bold',
    variants: {
        size: {
            'x-small': {
                fontSize: 16,
                lineHeight: 20,
                letterSpacing: -0.16,
            },
            small: {
                fontSize: 22,
                lineHeight: 28,
                letterSpacing: -0.44,
            },
            default: {
                fontSize: 26,
                lineHeight: 32,
                letterSpacing: -0.78,
            },
            large: {
                fontSize: 32,
                lineHeight: 40,
                letterSpacing: -0.96,
            },
            'x-large': {
                fontSize: 48,
                lineHeight: 48,
                letterSpacing: -0.96,
            },
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

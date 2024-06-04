import { Text, styled } from 'tamagui';

export const Paragraph = styled(Text, {
    color: 'black',
    variants: {
        size: {
            'xx-small': {
                fontSize: 10,
                lineHeight: 16,
                letterSpacing: -0.05,
            },
            'x-small': {
                fontSize: 11,
                lineHeight: 18,
                letterSpacing: -0.055,
            },
            'small-compact': {
                fontSize: 12,
                lineHeight: 16,
                letterSpacing: -0.06,
            },
            small: {
                fontSize: 12,
                lineHeight: 18,
                letterSpacing: -0.06,
            },
            default: {
                fontSize: 14,
                lineHeight: 20,
                letterSpacing: -0.07,
            },
            large: {
                fontSize: 16,
                lineHeight: 24,
                letterSpacing: -0.08,
            },
        },
    },
});

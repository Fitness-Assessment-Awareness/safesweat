import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'tamagui';

export const Screen = styled(
    SafeAreaView,
    {},
    {
        accept: {
            style: 'style',
        },
    },
);

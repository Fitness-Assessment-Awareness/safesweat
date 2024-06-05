import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { Pressable } from 'react-native';

interface ComponentProps extends HeaderBackButtonProps {
    onPress: VoidFunction;
}

export function HeaderBackButton({ canGoBack, onPress, tintColor }: ComponentProps) {
    return canGoBack ? (
        <Pressable
            onPress={onPress}
            hitSlop={8}
        >
            <ChevronLeft color={tintColor || 'black'} />
        </Pressable>
    ) : null;
}

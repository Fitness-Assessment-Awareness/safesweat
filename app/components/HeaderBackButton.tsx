import { ChevronLeft } from '@tamagui/lucide-icons';
import { Pressable } from 'react-native';

interface ComponentProps {
    canGoBack: boolean;
    onPress: VoidFunction;
}

export function HeaderBackButton({ canGoBack, onPress }: ComponentProps) {
    return canGoBack ? (
        <Pressable
            onPress={onPress}
            hitSlop={8}
        >
            <ChevronLeft color="black" />
        </Pressable>
    ) : null;
}

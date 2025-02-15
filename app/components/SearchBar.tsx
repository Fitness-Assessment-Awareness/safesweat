import { Search, XCircle } from '@tamagui/lucide-icons';
import { Pressable } from 'react-native';
import { Input, View, ViewProps } from 'tamagui';

interface ComponentProps extends ViewProps {
    searchText: string;
    onChangeText: (text: string) => void;
    inputPlaceholder?: string;
}

export function SearchBar({ searchText, onChangeText, inputPlaceholder, ...viewProps }: ComponentProps) {
    return (
        <View {...viewProps}>
            <Input
                size="$4"
                borderRadius="$8"
                value={searchText}
                onChangeText={onChangeText}
                fontSize={14}
                letterSpacing={-0.07}
                placeholder={inputPlaceholder}
                placeholderTextColor="#A0A3A8"
            />
            <View
                top={0}
                bottom={0}
                right="$3"
                left={0}
                position="absolute"
                justifyContent="center"
                alignItems="flex-end"
                pointerEvents="box-none"
            >
                {searchText ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="clear search"
                        hitSlop={8}
                        onPress={() => {
                            onChangeText('');
                        }}
                    >
                        <XCircle size="$1.5" />
                    </Pressable>
                ) : (
                    <Pressable accessibilityLabel="search icon">
                        <Search size="$1.5" />
                    </Pressable>
                )}
            </View>
        </View>
    );
}

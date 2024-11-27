import { Search, XCircle } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { Input, View, ViewProps } from 'tamagui';

interface ComponentProps extends ViewProps {
    searchText: string;
    onChangeText: (text: string) => void;
    inputPlaceholder?: string;
}

export function SearchBar({ searchText, onChangeText, inputPlaceholder, ...viewProps }: ComponentProps) {
    const { t } = useTranslation();
    return (
        <View
            width="100%"
            {...viewProps}
        >
            <Input
                size="$4"
                borderRadius="$8"
                value={searchText}
                onChangeText={onChangeText}
                fontSize={14}
                letterSpacing={-0.07}
                placeholder={inputPlaceholder || t('exercise.shared.name')}
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
                        hitSlop={8}
                        onPress={() => {
                            onChangeText('');
                        }}
                    >
                        <XCircle size="$1.5" />
                    </Pressable>
                ) : (
                    <Pressable>
                        <Search size="$1.5" />
                    </Pressable>
                )}
            </View>
        </View>
    );
}

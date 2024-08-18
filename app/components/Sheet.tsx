import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetModalProps,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { ComponentProps, forwardRef, useCallback } from 'react';
import { getToken, styled } from 'tamagui';

const SheetInternal = forwardRef<BottomSheetModal, BottomSheetModalProps>(({ children, ...otherProps }, ref) => {
    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                pressBehavior="close"
                enableTouchThrough={false}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        ),
        [],
    );

    return (
        <BottomSheetModal
            ref={ref}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#DFE2E6', width: 44, height: 4, borderRadius: getToken('$8') }}
            backgroundStyle={{ borderTopLeftRadius: getToken('$8'), borderTopRightRadius: getToken('$8') }}
            {...otherProps}
        >
            {children}
        </BottomSheetModal>
    );
});

const SheetNamespace = Object.assign(SheetInternal, {
    ScrollView: styled(
        BottomSheetScrollView,
        {},
        {
            accept: {
                contentContainerStyle: 'style',
            },
        },
    ),
});

export type SheetProps = ComponentProps<typeof SheetInternal>;
export const Sheet = SheetNamespace;

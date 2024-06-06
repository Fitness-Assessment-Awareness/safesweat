import { Sheet, SheetProps } from 'tamagui';

function SheetInternal({ children, ...otherProps }: SheetProps) {
    return (
        <Sheet
            zIndex={100_000}
            animation="quick"
            dismissOnSnapToBottom
            snapPointsMode="percent"
            snapPoints={[50]}
            modal
            {...otherProps}
        >
            <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
            />

            <Sheet.Frame
                borderTopLeftRadius="$8"
                borderTopRightRadius="$8"
            >
                <Sheet.Handle
                    mt="$2"
                    width="$6"
                    alignSelf="center"
                    height={6}
                    opacity={0.3}
                    backgroundColor="black"
                />
                {children}
            </Sheet.Frame>
        </Sheet>
    );
}

SheetInternal.ScrollView = Sheet.ScrollView;

export { SheetInternal as Sheet };

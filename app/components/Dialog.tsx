import Dialog from 'react-native-dialog';

interface ComponentProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    description: string;
    onPressOk: () => void;
}

function CustomDialog({ open, setOpen, title, description, onPressOk }: ComponentProps) {
    return (
        <Dialog.Container
            visible={open}
            onBackdropPress={() => {
                setOpen(false);
            }}
        >
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
            <Dialog.Button
                label="Cancel"
                onPress={() => {
                    setOpen(false);
                }}
            />
            <Dialog.Button
                label="Ok"
                onPress={() => {
                    onPressOk();
                    setOpen(false);
                }}
            />
        </Dialog.Container>
    );
}

export { CustomDialog as Dialog };

import {
    AlertDialog as ChakraAlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/react";
import { useRef } from "react";

function AlertDialog({
                         isOpen,
                         onClose,
                         onConfirm,
                         title = "확인",
                         body = "정말로 진행하시겠습니까?",
                         cancelText = "취소",
                         confirmText = "확인",
                         confirmColorScheme = "red"
                     }) {
    const cancelRef = useRef();

    return (
        <ChakraAlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {title}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {body}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            {cancelText}
                        </Button>
                        <Button colorScheme={confirmColorScheme} onClick={onConfirm} ml={3}>
                            {confirmText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </ChakraAlertDialog>
    );
}

export default AlertDialog;

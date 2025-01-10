import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    Button, useDisclosure
} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {callCancelFriendApplyAPI, callDeleteFriendAPI, callRequestFriendAPI} from "../../apis/FriendAPICalls";
import {SmallCloseIcon} from "@chakra-ui/icons";
import {useRef} from "react";

function CancelApplyButton({apply}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const dispatch = useDispatch();

    const handleDeleteFriend = () => {
        dispatch(callCancelFriendApplyAPI(apply.friendId));
        onClose();
    }

    return (
        <>
            <SmallCloseIcon
                mr={2}
                mt={2}
                color='gray.300'
                cursor='pointer'
                onClick={onOpen}
            />
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                size='xs'
            >
                <AlertDialogContent borderRadius='xl' bg='gray.50' border='1px solid #78909C'>

                    <AlertDialogHeader textAlign='center' pb={0} pt={5} fontWeight={800}>
                        친구 신청 취소
                    </AlertDialogHeader>

                    <AlertDialogBody textAlign='center'>
                        {apply.nickname} 님에게 보낸 친구 신청을 취소하시겠어요?
                    </AlertDialogBody>

                    <AlertDialogFooter borderTop='1px solid #B0BEC5' p={0} mt={3}>
                        <Button width='50%' size='md' ref={cancelRef} onClick={onClose} borderRadius='0 0 0 10px'>
                            취소
                        </Button>
                        <Button width='50%' size='md' colorScheme='red' onClick={handleDeleteFriend} borderRadius='0 0 10px 0' >
                            삭제
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default CancelApplyButton;
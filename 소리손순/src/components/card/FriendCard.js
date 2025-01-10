import {
    AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
    Avatar,
    Badge,
    Box, Button,
    Card,
    Flex,
    Heading,
    useDisclosure
} from "@chakra-ui/react";
import {SmallCloseIcon} from "@chakra-ui/icons";
import {useRef} from "react";
import {callDeleteFriendAPI} from "../../apis/FriendAPICalls";
import {useDispatch} from "react-redux";

function FriendCard({friend}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const dispatch = useDispatch();

    const handleDeleteFriend = () => {
        dispatch(callDeleteFriendAPI(friend.friendId));
        onClose();
    }

    return (
        friend &&
            <>
                <Card maxW='sm'>
                    <Flex spacing='4'>
                        <Flex p={4} flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={friend.nickname} src={friend.profileImage} />

                            <Box>
                                <Heading size='sm'>{friend.nickname}</Heading>
                                <Badge variant='outline' colorScheme='teal'>LEVEL {friend.level}</Badge>
                            </Box>
                        </Flex>

                        <SmallCloseIcon
                            mr={2}
                            mt={2}
                            color='gray.300'
                            cursor='pointer'
                            onClick={onOpen}
                        />
                    </Flex>
                </Card>

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    size='xs'
                >
                    <AlertDialogContent borderRadius='xl' bg='gray.50' border='1px solid #78909C'>

                        <AlertDialogHeader textAlign='center' pb={0} pt={5} fontWeight={800}>
                            친구 삭제
                        </AlertDialogHeader>

                        <AlertDialogBody textAlign='center'>
                            {friend.nickname} 님을 친구에서 삭제하시겠어요?
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

export default FriendCard;
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
import RequestFriendButton from "../button/RequestFriendButton";

function RecommendFriendCard({friend}) {

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

                            <RequestFriendButton userId={friend.userId}/>
                        </Flex>
                    </Flex>
                </Card>
            </>

    );
}

export default RecommendFriendCard;
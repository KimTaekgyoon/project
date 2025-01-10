import {
    Avatar, Text, Box, Card, Flex, Heading, useDisclosure, Button, VStack
} from "@chakra-ui/react";
import {SmallCloseIcon} from "@chakra-ui/icons";
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {callHandleFriendRequestAPI} from "../../apis/FriendAPICalls";
import CancelApplyButton from "../button/CancelApplyButton";

function FriendApplyCard({apply, isFromMe}) {

    const dispatch = useDispatch();
    const acceptRequest = () => {
        dispatch(callHandleFriendRequestAPI(apply.friendId, 'ACCEPTED'));
    }

    const rejectRequest = () => {
        dispatch(callHandleFriendRequestAPI(apply.friendId, 'REJECTED'));
    }

    return (
        apply &&
            <>
                <Card maxW='xs'>
                    <Flex spacing='4'>
                        <Flex p={4} flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={apply.nickname} src={apply.profileImage} />

                            <Box>
                                <Heading size='sm'>{apply.nickname}</Heading>
                                <Text fontSize='12px'>{apply.applyDate}</Text>
                            </Box>
                            {
                                !isFromMe &&
                                    <VStack>
                                        <Button colorScheme='mint' size='xs' borderRadius='full' onClick={acceptRequest}>
                                            수락
                                        </Button>
                                        <Button colorScheme='gray' size='xs' borderRadius='full' onClick={rejectRequest}>
                                            거절
                                        </Button>
                                    </VStack>
                            }
                        </Flex>
                        {
                            isFromMe && <CancelApplyButton apply={apply}/>
                        }
                    </Flex>
                </Card>
            </>

    );
}

export default FriendApplyCard;
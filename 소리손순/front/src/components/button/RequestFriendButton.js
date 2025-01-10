import {Button} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {callRequestFriendAPI} from "../../apis/FriendAPICalls";

function RequestFriendButton({userId}) {
    const dispatch = useDispatch();

    // TODO: 해당 유저에게 apply 보낸 기록 조회해서 있으면 친구 신청 버튼 비활성화해도 좋겠다.

    const handleRequestFriend = () => {
        dispatch(callRequestFriendAPI(userId));
    }

    return (
        <>
            <Button variant='outline' colorScheme='teal' borderRadius='full' onClick={handleRequestFriend}>
                친구 신청
            </Button>
        </>
    );
}

export default RequestFriendButton;
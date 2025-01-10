import { Box, HStack, Switch, Text, VStack } from "@chakra-ui/react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callGetFriendsAPI} from "../../../apis/FriendAPICalls";
import FriendCard from "../../../components/card/FriendCard";

function QuestSection({ questVisible, setQuestVisible }) {

    const dispatch = useDispatch();

    const { friends } = useSelector(state => state.friendReducer);

    useEffect(() => {
        dispatch(callGetFriendsAPI());
    }, []);

    return (
        <Box
            border="1px solid"
            borderColor="gray.300"
            p={5}
            borderRadius="md"
            boxShadow="sm"
            minW="250px"
            minH="300px" // Ensure the same height
        >
            <HStack justifyContent="space-between" mb={3}>
                <Text fontWeight="bold" fontSize="lg">
                    🔥 불타오르는 우정
                </Text>
                <Switch
                    colorScheme="teal"
                    isChecked={questVisible}
                    onChange={() => setQuestVisible(!questVisible)}
                />
            </HStack>
            {questVisible ? (
                <VStack align="stretch" spacing={2}>
                    {
                        friends &&
                        friends.map((friend, index) => (
                            <FriendCard key={index} friend={friend}/>
                    ))}
                </VStack>
            ) : (
                <Text color="gray.500" fontStyle="italic">
                    비공개입니다.
                </Text>
            )}
        </Box>
    );
}

export default QuestSection;

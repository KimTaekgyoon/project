import {Badge, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callTodayMyRanksAPI} from "../../apis/RankAPICalls";
import {isLogin} from "../../utils/TokenUtils";

function MyPageRanking() {

    const dispatch = useDispatch();
    const [todayMyRankings, setTodayMyRankings] = useState(null);
    const { myRanks } = useSelector(state => state.rankReducer);

    useEffect(() => {
        dispatch(callTodayMyRanksAPI());
    }, [dispatch]);

    useEffect(() => {
        if (myRanks) {
            setTodayMyRankings(myRanks);
        }
    }, [myRanks]);

    const getCategoryName = (category) => {
        switch (category) {
            case "VOICE":
                return "너목보";
            case "CHALLENGE":
                return "도소탐";
            case "RIDDLE":
                return "맞수수";
            default:
                return category;
        }
    };

    return (
        <>
            { isLogin() ?
                <>
                    <HStack justifyContent="space-between" spacing={10}>
                        { todayMyRankings && todayMyRankings.length !== 0 ?
                            todayMyRankings.map((data, index) =>
                                <VStack key={index} px={4}>
                                    <Text fontWeight="bold">{getCategoryName(data.category)}</Text>
                                    <Flex alignItems="center">
                                        <Text mr={2}>🏅 {data.score}점</Text>
                                        <Badge display="flex" justifyContent="center" borderRadius="4px" fontSize="10px" variant='outline' colorScheme='blue'>{data.myRank}등</Badge>
                                    </Flex>
                                </VStack>
                            ) : <Text>랭킹 데이터가 없습니다.</Text>
                        }
                    </HStack>
                </> : <>
                    <VStack display="flex" px={4}>
                        로그인 해 주세요.
                    </VStack>
                </>
            }
        </>
    );
}

export default MyPageRanking;
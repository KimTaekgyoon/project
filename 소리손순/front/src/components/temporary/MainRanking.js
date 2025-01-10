import {Badge, Card, Flex, Heading, Table, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callTodayMyRanksAPI, callTodayRanksAPI} from "../../apis/RankAPICalls";
import {isLogin} from "../../utils/TokenUtils";

function MainRanking() {

    const dispatch = useDispatch();
    const [todayRankings, setTodayRankings] = useState(null);
    const [todayMyRankings, setTodayMyRankings] = useState(null);
    const { today, myRanks } = useSelector(state => state.rankReducer);
    const limit = 3;

    useEffect(() => {
        // 처음 렌더링 시 랭킹 API 호출
        dispatch(callTodayRanksAPI({limit}));
        dispatch(callTodayMyRanksAPI());
    }, [dispatch]);


    useEffect(() => {
        if (today) {
            setTodayRankings(today);
        }
    }, [today]);

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
                    <Card w="100%" minH="90px" border="1px solid #E2E8F0" boxShadow="none" borderRadius="8px" backgroundColor="#F7FAFC" py={4}>
                        <Flex w="100%" h="100%" flexDirection="column" justifyContent="center" alignItems="center">
                            <Heading fontSize="14px" color="#4F4F4F" mb="10px">🏆 오늘 나의 랭킹</Heading>
                            <Flex justifyContent="space-around" w="100%">
                                { todayMyRankings && todayMyRankings.length !== 0 ?
                                    todayMyRankings.map((data, index) =>
                                        <Flex key={index} flexDirection="column" justifyContent="center" alignItems="center" px="40px">
                                            <Heading fontSize="14px" color="#4F4F4">{getCategoryName(data.category)}</Heading>
                                            <Flex alignItems="center" mt={2}>
                                                <Text fontSize="12px" mr={2}>{data.score}점</Text>
                                                <Badge display="flex" justifyContent="center" borderRadius="4px" fontSize="10px" variant='outline' colorScheme='blue'>{data.myRank}등</Badge>
                                            </Flex>

                                        </Flex>
                                    ) : <Text>랭킹 데이터가 없습니다.</Text>
                                }
                            </Flex>
                        </Flex>
                    </Card>
                </> : <>
                    <Card w="100%" minH="90px" border="1px solid #E2E8F0" boxShadow="none" borderRadius="8px" backgroundColor="#F7FAFC" p={5}>
                        <Flex w="100%" h="100%" flexDirection="column" justifyContent="center" alignItems="center">
                            <Heading fontSize="14px" color="#4F4F4F" mt={2} mb={5} ml={4}>🏆 오늘의 랭킹</Heading>
                            <Table variant="simple" w="100%">
                                <Thead>
                                    <Tr>
                                        <Th textAlign="center" fontSize="14px" color="#4F4F4F" border="none" p="0 0 15px 0">
                                            NO
                                        </Th>
                                        {/* todayRankings가 null인지 확인하고 처리 */}
                                        {todayRankings &&
                                            Object.keys(todayRankings).map((category, index) => (
                                                <Th key={index} textAlign="center" fontSize="14px" color="#4F4F4" border="none" p="0 0 15px 0">
                                                    {getCategoryName(category)}
                                                </Th>
                                            ))}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {/* todayRankings가 null인지 확인하고 처리 */}
                                    {todayRankings &&
                                        Array.from({ length: Math.max(...Object.values(todayRankings).map(ranks => ranks.length)) }).map(
                                            (_, rankIndex) => (
                                                <Tr key={rankIndex}>
                                                    <Td textAlign="center" fontSize="12px" border="none" p={2}>
                                                        <Flex mt={2}>
                                                            {rankIndex + 1 === 1
                                                                ? "🥇"
                                                                : rankIndex + 1 === 2
                                                                    ? "🥈"
                                                                    : rankIndex + 1 === 3
                                                                        ? "🥉"
                                                                        : rankIndex + 1}
                                                        </Flex>
                                                    </Td>
                                                    {Object.entries(todayRankings).map(([category, ranks], index) => (
                                                        <Td key={index} textAlign="center" fontSize="12px" border="none" py={2} px={10}>
                                                            {ranks[rankIndex] ?
                                                                <Flex justifyContent="center" alignItems="center" mt={2}>
                                                                    <Text fontSize="12px" mr={2}>{ranks[rankIndex].nickname}</Text>
                                                                    <Text fontSize="10px" color='mint.600'>{ranks[rankIndex].score}점</Text>
                                                                </Flex>
                                                                  : "-"}
                                                        </Td>
                                                    ))}
                                                </Tr>
                                            )
                                        )}
                                </Tbody>
                            </Table>
                        </Flex>
                    </Card>
                </>
            }
        </>
    );
}

export default MainRanking;
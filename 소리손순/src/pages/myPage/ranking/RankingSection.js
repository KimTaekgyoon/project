// import { Box, HStack, Switch, Text, VStack } from "@chakra-ui/react";

// function RankingSection({ rankingVisible, setRankingVisible }) {
//     return (
//         <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="md" boxShadow="sm">
//             <HStack justifyContent="space-between" mb={3}>
//                 <Text fontWeight="bold" fontSize="lg">
//                     🏆 오늘 나의 랭킹
//                 </Text>
//                 <Switch
//                     colorScheme="teal"
//                     isChecked={rankingVisible}
//                     onChange={() => setRankingVisible(!rankingVisible)}
//                 />
//             </HStack>
//             {rankingVisible ? (
//                 <HStack justifyContent="space-between" spacing={10}>
//                     <VStack>
//                         <Text fontWeight="bold">맞.수.수</Text>
//                         <Text>🥇 80점</Text>
//                     </VStack>
//                     <VStack>
//                         <Text fontWeight="bold">도.소.탐</Text>
//                         <Text>🥈 95점</Text>
//                     </VStack>
//                     <VStack>
//                         <Text fontWeight="bold">너.목.보</Text>
//                         <Text>4등 60점</Text>
//                     </VStack>
//                     <VStack>
//                         <Text fontWeight="bold">고요 속의 외침</Text>
//                         <Text>오늘 기록이 없어요.</Text>
//                     </VStack>
//                 </HStack>
//             ) : (
//                 <Text color="gray.500" fontStyle="italic">
//                     비공개입니다.
//                 </Text>
//             )}
//         </Box>
//     );
// }

// export default RankingSection;
import React, { useState, useEffect } from 'react';
import { Box, HStack, Switch, Text, VStack } from "@chakra-ui/react";
import {authRequest} from "../../../apis/api";
import MyPageRanking from "../../../components/temporary/MyPageRanking";

function RankingSection({ rankingVisible, setRankingVisible, userId }) {
    const [scores, setScores] = useState({
        challenge: { score: "오늘 기록이 없어요.", rank: "" },
        riddle: { score: "오늘 기록이 없어요.", rank: "" },
        voice: { score: "오늘 기록이 없어요.", rank: "" }
    });

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const categories = ['challenge', 'riddle', 'voice'];

                // Fetch scores for each category
                const responses = await Promise.all(categories.map(category =>
                    authRequest.get(`/api/rankings/category/${category}`)
                ));

                // Extract highest score and rank for each category
                const scoresData = {
                    challenge: extractScoreAndRank(responses[0].data, userId),
                    riddle: extractScoreAndRank(responses[1].data, userId),
                    voice: extractScoreAndRank(responses[2].data, userId)
                };

                setScores(scoresData);
            } catch (error) {
                console.error('점수를 불러오는 데 실패했습니다:', error);
            }
        };

        if (rankingVisible) {
            fetchScores();
        }
    }, [rankingVisible, userId]);

    // Function to extract the highest score and rank for the user from rankings
    const extractScoreAndRank = (rankings, userId) => {
        // Filter scores for the user
        const userScores = rankings
            .filter(ranking => ranking.userId === 1)
            .map(ranking => ranking.score);

        if (userScores.length === 0) {
            return { score: "오늘 기록이 없어요.", rank: "" };
        }

        // Calculate highest score and its rank
        const highestScore = Math.max(...userScores);
        const userRank = rankings
            .filter(ranking => ranking.score > highestScore)
            .length + 1; // Rank calculation

        return { score: `${highestScore}점`, rank: `전체 ${userRank}등` };
    };

    return (
        <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="md" boxShadow="sm">
            <HStack justifyContent="space-between" mb={3}>
                <Text fontWeight="bold" fontSize="lg">
                    🏆 오늘 나의 랭킹
                </Text>
                <Switch
                    colorScheme="teal"
                    isChecked={rankingVisible}
                    onChange={() => setRankingVisible(!rankingVisible)}
                />
            </HStack>
            {rankingVisible ? (
                <MyPageRanking/>
            ) : (
                <Text color="gray.500" fontStyle="italic">
                    비공개입니다.
                </Text>
            )}
        </Box>
    );
}

export default RankingSection;
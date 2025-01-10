import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import React, { useState } from 'react';
import DashBoardSection from "./dashboard/DashBoardSection";
import QuestSection from "./friend/FriendSection";
import GuestBookSection from "./guestBook/GuestBookSection";
import MedalSection from "./medal/MedalSection";
import ProfileSection from "./profile/ProfileSection";
import RankingSection from "./ranking/RankingSection";
import WordCloudSection from "./wordCloud/WordCloudSection";

function MypageHomePage() {
    const [questVisible, setQuestVisible] = useState(true);
    const [guestBookVisible, setGuestBookVisible] = useState(true);
    const [rankingVisible, setRankingVisible] = useState(true);
    const [medalVisible, setMedalVisible] = useState(true);
    const [wordCloudVisible, setWordCloudVisible] = useState(false);
    const [dashBordVisible, setDashBordVisible] = useState(false);


    return (
        <Box bg="gray.100" p={5} minH="100vh" borderRadius="lg">
            <Text
                fontWeight="bold"
                fontSize="2xl"
                color="blue.600"
                mb={6}
            >
                마이페이지
            </Text>
            <Box bg="white" borderRadius="lg" p={5} boxShadow="md">
                <ProfileSection />

                <Divider my={6} /> 

                <HStack spacing={5} mb={6}> 
                    <QuestSection
                        questVisible={questVisible}
                        setQuestVisible={setQuestVisible}
                    />
                    <GuestBookSection
                        guestBookVisible={guestBookVisible}
                        setGuestBookVisible={setGuestBookVisible}
                    />
                </HStack>

                <Divider my={6} /> {}


                    <RankingSection
                        rankingVisible={rankingVisible}
                        setRankingVisible={setRankingVisible}
                    />
                    
                    <Divider my={6} />

                    <MedalSection
                        medalVisible={medalVisible}
                        setMedalVisible={setMedalVisible}
                    />


                <WordCloudSection
                    wordCloudVisible={wordCloudVisible}
                    setWordCloudVisible={setWordCloudVisible}
                    mb={6} 
                />

                <DashBoardSection
                    dashBordVisible={dashBordVisible}
                    setDashBordVisible={setDashBordVisible}
                />
            </Box>

            
        </Box>
    );
}

export default MypageHomePage;

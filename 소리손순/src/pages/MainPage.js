import {
    Badge,
    Box,
    Card,
    Divider,
    Flex,
    Heading,
    Img,
    Text,
    Link as ChakraLink
} from "@chakra-ui/react";
import GameCard from "../components/card/GameCard";
import Banner from "../components/temporary/Banner";
import {isLogin} from "../utils/TokenUtils";
import React from "react";
import {Link as ReactRouterLink} from "react-router-dom";
import MainUserInfo from "../components/temporary/MainUserInfo";
import MainRanking from "../components/temporary/MainRanking";
import MainTableList from "../components/temporary/MainTableList";

function MainPage() {

    const handGame = {
        title: '맞혀라! 수수께끼',
        desc: '포인트 동작으로 가볍게 배우는 수어',
        img: '/images/main_hand.png',
        url: '/game/hand'
    }
    const soundGame = {
        title: '도전! 소리 탐정',
        desc: '발음이 조금 달라도 소리 탐정에겐 문제 없다',
        img: '/images/main_sound.png',
        url: '/game/sound'
    }
    const lipGame = {
        title: '너의 목소리가 보여',
        desc: '들리지 않아도 알 수 있어요',
        img: '/images/main_lip.png',
        url: '/game/lip'
    }

    return (
        <Box>
            <Banner/>
            <Divider my="35px"/>
            <Flex justifyContent="space-between">
                {isLogin() ?
                    <>
                        <MainUserInfo/>
                        <MainRanking w="420px"/>
                    </>
                    :
                        <MainRanking/>
                }
            </Flex>
            <Heading fontSize="28px" color="#4F4F4F" mb="16px" mt="35px">소리손글로 통하는 우리 대화</Heading>
            <Flex justifyContent="space-between">
                <GameCard game={handGame} />
                <GameCard game={soundGame} />
                <GameCard game={lipGame} />
            </Flex>
            <Divider my="35px" />
            <Flex justifyContent="space-between">
                <Flex flexDirection="column" borderRight="1px solid #E2E8F0" py={5} pr={6}>
                    <Heading fontSize="28px" color="#4F4F4F" mb="16px">공지사항</Heading>
                    <MainTableList/>
                </Flex>
                <Flex flexDirection="column" py={5}>
                    <Heading fontSize="28px" color="#4F4F4F" mb="16px">커뮤니티 최신 글</Heading>
                    <MainTableList/>
                </Flex>
            </Flex>
        </Box>
    );
}

export default MainPage;
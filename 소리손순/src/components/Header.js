import { Button, Center, Link as ChakraLink, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useState } from 'react';
import { Lock, PersonCircle, PersonPlus, Unlock } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { callLogoutAPI } from "../apis/AuthAPICalls";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/users/SignUpPage";
import { isLogin } from "../utils/TokenUtils";

function Header() {
    const dispatch = useDispatch();
    const loginStatus = isLogin();
    const navigate = useNavigate(); 

    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);

    const openLoginModal = () => setLoginModalOpen(true);
    const closeLoginModal = () => setLoginModalOpen(false);

    const openSignupModal = () => setSignupModalOpen(true);
    const closeSignupModal = () => setSignupModalOpen(false);

    const handleMyPageClick = () => {
        navigate('/mypage/mypageHome'); 
    };

    return (
        <>
            <Center w="100vw" h={100} className="Header" borderBottom="1px solid #e2e8f0">
                <Flex w="100vw" maxW="800px" justifyContent="space-between" alignItems="center">
                    <Heading>
                        <ChakraLink as={ReactRouterLink} to='/'>
                            <Image src="/images/logo.png" alt="소리손순 로고 이미지"/>
                        </ChakraLink>
                    </Heading>
                    <Flex alignItems="center" fontSize="14px" fontWeight="600">
                        <ChakraLink as={ReactRouterLink} to='/'>소리손순 소개</ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='/pricing' ml="35px">요금제</ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='/' ml="35px">수어 찾기</ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='/' ml="35px">커뮤니티</ChakraLink>
                        <Flex ml="35px" alignItems="center">
                            {loginStatus ? (
                                <>
                                    <Button height="30px" fontSize="12px" px={3} onClick={handleMyPageClick}>
                                        <PersonCircle /><Text ml={1}>마이 페이지</Text>
                                    </Button>
                                    <Button height="30px" fontSize="12px" px={3} ml={3} onClick={() => dispatch(callLogoutAPI())}>
                                        <ChakraLink display="flex" as={ReactRouterLink} to='/'><Lock mr={1}/><Text ml={1}>로그아웃</Text></ChakraLink>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button height="30px" fontSize="12px" px={3} onClick={openLoginModal}>
                                        <Unlock /><Text ml={1}>로그인</Text>
                                    </Button>
                                    <Button height="30px" fontSize="12px" px={3} ml={3} onClick={openSignupModal}>
                                        <PersonPlus /><Text ml={1}>회원가입</Text>
                                    </Button>
                                </>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Center>
            <LoginPage isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            <SignUpPage isOpen={isSignupModalOpen} onClose={closeSignupModal} />
        </>
    );
}

export default Header;

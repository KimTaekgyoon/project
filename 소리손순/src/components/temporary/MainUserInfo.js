import {Badge, Card, Flex, Image, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {getUserId, isLogin} from "../../utils/TokenUtils";
import {authRequest} from "../../apis/api";

function MainUserInfo() {
    const defaultProfileImage = "https://sorisonsoon.vercel.app/images/icon_user.png";
    const [nickname, setNickname] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [userId, setUserId] = useState(null);
    const [id, setId] = useState(null);
    const [email, setEmail] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await authRequest.get(`/api/v1/users/profile`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    const data = response.data;
                    console.log("Fetched user data:", data);
                    setId(data.id);
                    setUserId(data.userId);
                    setNickname(data.nickname);
                    setEmail(data.email);
                    setProfileImage(data.profileImage || defaultProfileImage);

                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert("사용자 정보를 가져오는 중 오류가 발생했습니다.");
            }
        };

        fetchUserData();
    }, []);


    return(
        <>
            <Card w="200px" minH="90px" flexShrink="0" border="1px solid #E2E8F0" boxShadow="none" backgroundColor="#F7FAFC" borderRadius="8px" mr={5} py={4}>
                <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
                    <Image
                        boxSize="100px"
                        borderRadius="full"
                        src={profileImage}
                        alt="Profile Picture"
                        border="2px solid"
                        borderColor="gray.200"
                        w="50px"
                        h="50px"
                        mr={4}
                    />

                    <Flex flexDirection="column" justifyContent="center" alignItems="center">
                        <Badge display="flex" justifyContent="center" borderRadius="4px" fontSize="8px" variant='outline' colorScheme='green'>{id}</Badge>
                        <Text fontSize="14px" fontWeight="500">{nickname}</Text>
                    </Flex>
                </Flex>
            </Card>
        </>
    );
}

export default MainUserInfo;
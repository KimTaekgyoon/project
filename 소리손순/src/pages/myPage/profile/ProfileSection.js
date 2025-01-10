import { Badge, Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {authRequest} from '../../../apis/api';

function ProfileSection() {
    const [nickname, setNickname] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [userId, setUserId] = useState(null); 
    const [id, setId] = useState(null);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

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
                    setProfileImage(data.profileImage);

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

    const handleDeleteClick = () => {
        navigate("/users/delete");
    };

    const handleEditClick = () => {
        navigate("/users/edit");
    };

    // if (!user) {
    //     return <Text>Loading...</Text>; // 로딩 중 표시
    // }

    return (
        <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="md" boxShadow="sm">
            <HStack spacing={5} align="center">
                <Box position="relative">
                <Image
                    boxSize="100px"
                    borderRadius="full"
                    src={profileImage}
                    alt="Profile Picture"
                    border="2px solid"
                    borderColor="gray.200"
                />
                    <Button
                        size="xs"
                        position="absolute"
                        bottom="-5px"
                        right="-5px"
                        bg="gray.200"
                        color="gray.600"
                        fontSize="xs"
                        _hover={{ bg: "gray.300" }}
                        onClick={handleEditClick}
                    >
                        회원정보 수정
                    </Button>
                </Box>

                <VStack align="flex-start" spacing={1}>
                    <HStack spacing={2} align="center">
                        <Badge colorScheme="orange" px={2} py={1} borderRadius="md">
                            레벨
                        </Badge>
                        <HStack spacing={2} align="center">
                            <Badge colorScheme="blue" px={2} py={1} borderRadius="md">
                                🔑 인증 완료
                            </Badge>
                            <Button
                                size="sm" 
                                colorScheme="red" 
                                variant="solid" 
                                onClick={handleDeleteClick}
                                px={2} 
                                py={1.5} 
                                fontSize="xs" 
                                fontWeight="normal" 
                                borderRadius="md" 
                                minWidth="auto" 
                                height="auto"
                            >
                                회원탈퇴
                            </Button>
                        </HStack>
                    </HStack>
                    <Text fontWeight="bold" fontSize="md">
                        아이디:{" "}
                        <Text as="span" color="gray.700">
                            {id}
                        </Text>
                    </Text>
                    <Text fontWeight="bold" fontSize="md">
                        닉네임:{" "}
                        <Text as="span" color="gray.700">
                            {nickname}
                        </Text>
                    </Text>
                    <Text fontWeight="bold" fontSize="md">
                        이메일:{" "}
                        <Text as="span" color="gray.700">
                            {email}
                        </Text>
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
}

export default ProfileSection;

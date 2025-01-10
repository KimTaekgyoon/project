import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Textarea,
    useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRequest } from '../../apis/api';

function EditUsersInfo() {
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [keyword, setkeyword] = useState("");
    const [userId, setUserId] = useState(null); 
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await authRequest.get("/api/v1/users/me", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    const data = response.data;
                    console.log("Fetched user data:", data);
                    setUserId(data.userId);  // userId를 설정합니다.
                    setNickname(data.nickname);
                    setkeyword(data.keyword);  // 변수명 일치시킴
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast({
                    title: '사용자 정보 가져오기 실패',
                    description: '사용자 정보를 가져오는 중 오류가 발생했습니다.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchUserData();
    }, [toast]);

    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            toast({
                title: '사용자 ID 없음',
                description: '사용자 ID를 찾을 수 없습니다.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const formData = new FormData();
        formData.append("userId", userId);  // userId를 FormData에 추가합니다.
        formData.append("password", password);
        formData.append("nickname", nickname);

        if (keyword) {
            formData.append("keyword", keyword);  // 키워드가 있을 때만 추가
        }

        if (profileImage) {
            formData.append("profileImage", profileImage);  // 프로필 이미지가 있을 때만 추가
        }

        try {
            const response = await authRequest.put(`/api/v1/users/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status === 200) {
                toast({
                    title: '회원정보 수정 완료',
                    description: '회원정보가 성공적으로 수정되었습니다.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate("/mypage/mypageHome");
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error:", error);
            toast({
                title: '회원정보 수정 실패',
                description: '회원정보 수정 중 오류가 발생했습니다.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex w="100%" maxW="350px" mx="auto" mt="10px">
            <Box w="100%" p={4}>
                <Heading textAlign="center" color="#90CDF4">회원정보 수정</Heading>
                <Text textAlign="center" fontSize="12px" color="#828282" mt={2}>
                    회원님의 정보를 수정하려면 아래 폼을 작성해 주세요.
                </Text>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4} mt={6}>
                        <FormControl isRequired>
                            <FormLabel fontSize="12px" color="#333">닉네임</FormLabel>
                            <Input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="닉네임을 입력하세요"
                                fontSize="12px"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel fontSize="12px" color="#333">비밀번호</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요"
                                fontSize="12px"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize="12px" color="#333">프로필 이미지</FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                fontSize="12px"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize="12px" color="#333">관심사 키워드</FormLabel>
                            <Textarea
                                value={keyword}
                                onChange={(e) => setkeyword(e.target.value)}
                                placeholder="관심사 키워드를 입력하세요"
                                fontSize="12px"
                            />
                        </FormControl>

                        <Button
                            mt={6}
                            w="100%"
                            variant='gradient'
                            color="white"
                            fontSize="12px"
                            type="submit"
                        >
                            수정 저장
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Flex>
    );
}

export default EditUsersInfo;

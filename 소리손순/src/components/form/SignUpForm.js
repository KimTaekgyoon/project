import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Text,
    useToast
} from "@chakra-ui/react";
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {DEFAULT_URL} from "../../apis/api";

const SignUpForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        id: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        email: '',
        verificationCode: '', // 이메일 인증 코드
        type: 'PERSONAL'
    });

    const [formErrors, setFormErrors] = useState({
        passwordMismatch: false,
        emailInvalid: false,
        emailNotVerified: false
    });

    const [isEmailSent, setIsEmailSent] = useState(false); 
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const errors = {
            passwordMismatch: formData.password !== formData.confirmPassword,
            emailInvalid: !/\S+@\S+\.\S+/.test(formData.email),
            emailNotVerified: !isEmailSent 
        };

        setFormErrors(errors);
        return !errors.passwordMismatch && !errors.emailInvalid && !errors.emailNotVerified;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const updatedFormData = {
            ...formData,
            type: 'PERSONAL'
        };

        try {
            console.log('Sending data to backend:', formData);
            const response = await axios.post(`${DEFAULT_URL}/api/v1/users/new`, formData, {
                withCredentials: true
            });
            console.log('Response:', response.data);
            toast({
                title: '회원 가입 성공',
                description: '회원가입이 완료되었습니다.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            if (onSuccess) {
                onSuccess(); // 회원가입 성공 시 onSuccess 호출
            }
        } catch (error) {
            const errorMessage = error.response 
                ? error.response.data 
                : error.request 
                ? '서버 응답이 없습니다.' 
                : error.message;
        
            console.error('Error:', errorMessage);
            toast({
                title: '회원 가입 실패',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        
    };

    const handleSendVerificationEmail = async () => {
        try {
            const { data, status } = await axios.post(
                `${DEFAULT_URL}/api/v1/users/mailConfirm`,
                { email: formData.email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    withCredentials: true
                }
            );
    
            if (status >= 200 && status < 300) {
                setIsEmailSent(true);
                toast({
                    title: data.success ? '인증 메일 발송' : '메일 발송 실패',
                    description: data.success
                        ? '메일을 확인하여 인증 코드를 입력해 주세요.'
                        : data.message || '예상치 못한 오류가 발생했습니다.',
                    status: data.success ? 'success' : 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: '메일 발송 실패',
                    description: `서버 응답 상태 코드: ${status}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            const errorMessage = error.response 
                ? error.response.status === 403 
                    ? '권한이 없습니다.' 
                    : error.response.data?.message || '예상치 못한 오류가 발생했습니다.'
                : '서버 응답이 없습니다.';
    
            console.error('Error:', errorMessage);
            toast({
                title: '메일 발송 실패',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    

    const handleVerifyCode = async () => {
        try {
            const { data } = await axios.post(
                `${DEFAULT_URL}/api/v1/users/verifyCode`,
                { code: formData.verificationCode },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
    
            const { success, data: responseData } = data;
    
            if (success && responseData.valid) {
                setFormErrors({ ...formErrors, emailNotVerified: false });
                toast({
                    title: '이메일 인증 완료',
                    description: '이메일 인증이 완료되었습니다.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                setFormErrors({ ...formErrors, emailNotVerified: true });
                toast({
                    title: '인증 코드 오류',
                    description: '인증 코드가 유효하지 않습니다.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.errorMessage || error.response.data
                : error.message;
    
            console.error('Error:', errorMessage);
            toast({
                title: '인증 코드 확인 실패',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    

    return (
        <Flex w="100%" maxW="350px" mx="auto" mt="10px">
            <Box w="100%" p={4}>
                <Heading textAlign="center" color="#90CDF4">회원가입</Heading>
                <Text textAlign="center" fontSize="12px" color="#828282" mt={2}>
                    소리손순의 다양한 기능을 사용하려면 회원가입을 해주세요.
                </Text>
                <form onSubmit={handleSubmit}>
                    <FormControl mt={9} mb={4} isRequired>
                        <FormLabel fontSize="12px" color="#333">아이디</FormLabel>
                        <Input
                            type="text"
                            name="id"
                            placeholder="아이디를 입력하세요"
                            value={formData.id}
                            onChange={handleChange}
                            fontSize="12px"
                        />
                    </FormControl>
                    <FormControl mb={4} isRequired>
                        <FormLabel fontSize="12px" color="#333">닉네임</FormLabel>
                        <Input
                            type="text"
                            name="nickname"
                            placeholder="닉네임을 입력하세요"
                            value={formData.nickname}
                            onChange={handleChange}
                            fontSize="12px"
                        />
                    </FormControl>
                    <FormControl mb={4} isRequired isInvalid={formErrors.emailInvalid || formErrors.emailNotVerified}>
                        <FormLabel fontSize="12px" color="#333">이메일</FormLabel>
                        <HStack>
                            <Input
                                type="email"
                                name="email"
                                placeholder="이메일을 입력하세요"
                                value={formData.email}
                                onChange={handleChange}
                                fontSize="12px"
                            />
                            <Button
                                onClick={handleSendVerificationEmail}
                                variant='outline'
                                background="#FFFFFF"
                                fontWeight="normal"
                                fontSize="12px"
                                color="#333"
                            >
                                이메일 발송
                            </Button>
                        </HStack>
                        {formErrors.emailInvalid && (
                            <FormErrorMessage>이메일 형식이 올바르지 않습니다.</FormErrorMessage>
                        )}
                        {formErrors.emailNotVerified && (
                            <FormErrorMessage>이메일 인증이 필요합니다.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mb={4} isRequired>
                        <HStack>
                            <Input
                                type="text"
                                name="verificationCode"
                                placeholder="인증 코드를 입력하세요"
                                value={formData.verificationCode}
                                onChange={handleChange}
                                fontSize="12px"
                            />
                            <Button
                                onClick={handleVerifyCode}
                                variant='outline'
                                background="#FFFFFF"
                                fontWeight="normal"
                                fontSize="12px"
                                color="#333"
                            >
                                인증 코드 확인
                            </Button>
                        </HStack>
                    </FormControl>
                    <FormControl mb={4} isRequired isInvalid={formErrors.passwordMismatch}>
                        <FormLabel fontSize="12px" color="#333">비밀번호</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={handleChange}
                            fontSize="12px"
                        />
                    </FormControl>
                    <FormControl mb={4} isRequired isInvalid={formErrors.passwordMismatch}>
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="비밀번호를 다시 입력하세요"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            fontSize="12px"
                        />
                        {formErrors.passwordMismatch && (
                            <FormErrorMessage>비밀번호가 일치하지 않습니다.</FormErrorMessage>
                        )}
                    </FormControl>
                    <Button
                        mt={9}
                        w="100%"
                        variant='gradient'
                        color="white"
                        fontSize="12px"
                        onClick={handleSubmit}
                    >
                        회원가입
                    </Button>
                    <Text textAlign="center" fontSize="12px" color="#4F4F4F" mt={5}>
                        이미 계정이 있으신가요? <Link to='/login' style={{ color: '#90CDF4' }}> 로그인</Link>.
                    </Text>
                </form>
            </Box>
        </Flex>
    );
};

export default SignUpForm;

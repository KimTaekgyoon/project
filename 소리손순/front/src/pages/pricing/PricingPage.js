import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Text,
    Heading,
    HStack,
    Container,
    Center,
    Stack,
    Divider,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    TableContainer,
    Table, Image
} from "@chakra-ui/react";
import {CheckCircleIcon, CheckIcon} from "@chakra-ui/icons";
import IonIcon from "@reacticons/ionicons";
import {isLogin} from "../../utils/TokenUtils";

function PricingPage({openLogin}) {
    return (
        <>
            <Box
                bgImage="url('/images/pricing-bg.jpg')"
                bgSize="cover"
                bgPos="center"
                bgRepeat="no-repeat"
                pt={300}
            >
                <Box
                    bgSize="cover"
                    bgPos="center"
                    bgRepeat="no-repeat"
                    bgGradient="linear(to-b, rgba(255,255,255,0) 0%, white 60%)"
                    textAlign='center'
                    pt={150}
                    pb={75}
                >
                    <Heading fontSize="42px" color="gray.700" fontWeight={700}>
                        합리적인 요금으로<br/>모든 기능을 즐기세요.
                    </Heading>
                </Box>
            </Box>

            <Container maxW='xl' p={0}>
                <HStack spacing={4} justify="center" w="100%">
                    <Card w="50%" h="350px" p='35px'>
                        <CardHeader p='unset' h='95px'>
                            <Text fontWeight={600}>무료</Text>
                            <Text fontSize="32px" fontWeight={700}>￦0</Text>
                        </CardHeader>
                        <CardBody p='unset'>
                            <Stack spacing='1'>
                                <Text><CheckIcon color="red.400" mb={1} mr={1}/> 랭킹 집계</Text>
                                <Text><CheckIcon color="red.400" mb={1} mr={1}/> 맞춰라! 수수께끼 플레이</Text>
                                <Text><CheckIcon color="red.400" mb={1} mr={1}/> 도전! 소리 탐정 맛보기</Text>
                                <Text><CheckIcon color="red.400" mb={1} mr={1}/> 너의 목소리가 보여 맛보기</Text>
                            </Stack>
                        </CardBody>
                        <CardFooter p='unset'>
                            {
                                !isLogin() ?
                                    <Button bg="red.100" borderRadius='full' w='100%'
                                            onClick={openLogin}
                                    >무료로 시작하기
                                    </Button>
                                    :
                                    <Button bg="red.100" borderRadius='full' w='100%'
                                    >적용 중!
                                    </Button>
                            }

                        </CardFooter>
                    </Card>
                    <Center w="50%" h="350px"
                        borderRadius='8px'
                        border='2px'
                        borderColor='transparent'
                        bg='linear-gradient(270deg, #9AE6B4 0%, #90CDF4 100%) padding-box,
                            linear-gradient(270deg, #9AE6B4 0%, #90CDF4 100%) border-box'
                    >
                        <Card w="100%" h="100%" p='35px'>
                            <CardHeader p='unset'  h='95px'>
                                <HStack>
                                    <Box color='yellow.400'>
                                        <IonIcon name={"diamond"}/>
                                    </Box>
                                    <Text fontWeight={600}>Pro</Text>
                                </HStack>
                                <HStack align='baseline'>
                                    <Text fontSize="32px" fontWeight={700}>￦2,200</Text>
                                    <Text fontWeight={600}>/월</Text>
                                </HStack>
                            </CardHeader>
                            <CardBody p='unset'>
                                <Stack spacing='1'>
                                    <Text><CheckIcon color="teal.400" mb={1} mr={1}/> 무제한 게임 플레이</Text>
                                    <Text><CheckIcon color="teal.400" mb={1} mr={1}/> 게임 내 AI 힌트 제공</Text>
                                </Stack>
                            </CardBody>
                            <CardFooter p='unset'>
                                <Button variant='gradient' borderRadius='full' w='100%'>플랜 시작하기</Button>
                            </CardFooter>
                        </Card>
                    </Center>
                </HStack>
                <Box mt={5}>
                    <Text fontSize="sm" color="gray.500">
                        * VAT가 포함된 가격입니다. <br />
                        * 수익금의 10%는 장애인 단체에 기부됩니다.
                    </Text>
                </Box>

            </Container>
            <Divider my={20}/>

            <Container maxW='xl' p={0}>
                <Heading textAlign='center' fontSize='2xl'>요금제 비교</Heading>

                <TableContainer my={20}>
                    <Table variant='simple' >
                        <Thead>
                            <Tr>
                                <Th/>
                                <Th>무료</Th>
                                <Th>Pro</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Th>랭킹 집계</Th>
                                <Td><CheckCircleIcon color='teal.400'/></Td>
                                <Td><CheckCircleIcon color='teal.400'/></Td>
                            </Tr>
                            <Tr>
                                <Th>맞혀라! 수수께끼</Th>
                                <Td>기초 단어 플레이 가능</Td>
                                <Td>무제한 플레이</Td>
                            </Tr>
                            <Tr>
                                <Th>도전! 소리 탐정</Th>
                                <Td>맛보기 게임 플레이 가능</Td>
                                <Td>데일리 문제 플레이 가능</Td>
                            </Tr>
                            <Tr>
                                <Th>너의 목소리가 보여</Th>
                                <Td>맛보기 게임 플레이 가능</Td>
                                <Td>데일리 문제 플레이 가능</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>

                <Box borderRadius='xl' bg='linear-gradient(90deg, #9AE6B4 0%, #90CDF4 100%)'
                     px={10} py={6} position='relative'
                >
                    <HStack>
                        <Box>
                            <Text color='white' fontWeight={700} fontSize='18px' mb={1}>
                                기업 제휴를 검토중이신가요?
                            </Text>
                            <Button colorScheme='whiteAlpha' color='white' bg='none'
                                    border='1px solid white' borderRadius='full' size='sm'
                            >
                                문의 남기기
                            </Button>
                        </Box>
                        <Image src='/images/highfive.png' boxSize='100px' position='absolute' right={20} bottom={0}/>
                    </HStack>

                </Box>
            </Container>

        </>

    );
}

export default PricingPage;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     Box,
//     Button,
//     Card,
//     CardBody,
//     CardFooter,
//     CardHeader,
//     Text,
//     Heading,
//     HStack,
//     Container,
//     Center,
//     Stack,
//     Divider,
//     Table,
//     Thead,
//     Tr,
//     Th,
//     Td,
//     Tbody,
//     TableContainer,
//     useToast,
//     VStack,
// } 
// from "@chakra-ui/react";
// import { CheckIcon } from "@chakra-ui/icons";
// import IonIcon from "@reacticons/ionicons";

// function PricingPage() {
//     const [isLoading, setIsLoading] = useState(false);
//     const [userPayments, setUserPayments] = useState([]);
//     const [user, setUser] = useState(null);
//     const toast = useToast();

//     // 테스트용 ID (숫자로 변경)
//     const tempUserId = 1;

//     useEffect(() => {
//         fetchUserPayments(tempUserId);
//     }, []);

//     const fetchUserPayments = async (userId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/api/payments/user/${userId}`);
//             setUserPayments(response.data);
//             // 사용자 정보는 별도로 설정해야 할 수 있습니다.
//             // 여기서는 임시로 하드코딩된 사용자 정보를 사용합니다.
//             setUser({
//                 userId: userId,
//                 nickname: "테스트 사용자",
//                 email: "test@example.com",
//                 role: "FREE_USER",
//                 status: "ACTIVATE"
//             });
//         } catch (error) {
//             console.error('Failed to fetch user payments:', error);
//             toast({
//                 title: "결제 내역 조회 실패",
//                 description: "결제 내역을 불러오는데 실패했습니다.",
//                 status: "error",
//                 duration: 5000,
//                 isClosable: true,
//             });
//         }
//     };

//     const handlePayment = async (planType, amount) => {
//         setIsLoading(true);
//         try {
//           await axios.post('http://localhost:8080/api/payments', null, {
//                 params: {
//                     payerId: tempUserId,
//                     amount: amount,
//                     payedAt: new Date().toISOString()
//                 }
//             });

//             toast({
//                 title: "결제 성공",
//                 description: `${planType} 플랜 구독에 성공했습니다.`,
//                 status: "success",
//                 duration: 5000,
//                 isClosable: true,
//             });

//             fetchUserPayments(tempUserId);
//         } catch (error) {
//             console.error('Payment failed:', error);
//             toast({
//                 title: "결제 실패",
//                 description: "결제 처리 중 오류가 발생했습니다. 다시 시도해 주세요.",
//                 status: "error",
//                 duration: 5000,
//                 isClosable: true,
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (!user) {
//         return <Box>Loading...</Box>;
//     }

//     return (
//         <Container maxW='xl' p={0}>
//             <VStack spacing={8} align="stretch">
//                 <Box>
//                     <Heading size="lg" mb={4}>환영합니다, {user.nickname}님</Heading>
//                     <Text>이메일: {user.email}</Text>
//                     <Text>회원 등급: {user.role}</Text>
//                     <Text>계정 상태: {user.status}</Text>
//                 </Box>

//                 {user.status === 'ACTIVATE' && (
//                     <HStack spacing={4} justify="center" w="100%">
//                         <Card w="50%" h="350px" p='35px'>
//                             <CardHeader p='unset' h='95px'>
//                                 <Text fontWeight={600}>무료</Text>
//                                 <Text fontSize="32px" fontWeight={700}>￦0</Text>
//                             </CardHeader>
//                             <CardBody p='unset'>
//                                 <Stack spacing='1'>
//                                     <Text><CheckIcon color="red.400" mb={1} mr={1}/> 기본 기능</Text>
//                                 </Stack>
//                             </CardBody>
//                             <CardFooter p='unset'>
//                                 <Button 
//                                     bg="red.100" 
//                                     borderRadius='full' 
//                                     w='100%'
//                                     onClick={() => handlePayment('FREE', 0)}
//                                     isLoading={isLoading}
//                                     isDisabled={user.role === 'FREE_USER'}
//                                 >
//                                     {user.role === 'FREE_USER' ? '현재 플랜' : '무료로 시작하기'}
//                                 </Button>
//                             </CardFooter>
//                         </Card>
//                         <Center w="50%" h="350px" borderRadius='8px' border='2px' borderColor='transparent' bg='linear-gradient(270deg, #9AE6B4 0%, #90CDF4 100%) padding-box, linear-gradient(270deg, #9AE6B4 0%, #90CDF4 100%) border-box'>
//                             <Card w="100%" h="100%" p='35px'>
//                                 <CardHeader p='unset'  h='95px'>
//                                     <HStack>
//                                         <Box color='yellow.400'>
//                                             <IonIcon name={"diamond"}/>
//                                         </Box>
//                                         <Text fontWeight={600}>Pro</Text>
//                                     </HStack>
//                                     <HStack align='baseline'>
//                                         <Text fontSize="32px" fontWeight={700}>￦2,200</Text>
//                                         <Text fontWeight={600}>/월</Text>
//                                     </HStack>
//                                 </CardHeader>
//                                 <CardBody p='unset'>
//                                     <Stack spacing='1'>
//                                         <Text><CheckIcon color="teal.400" mb={1} mr={1}/> 무제한 기능</Text>
//                                         <Text><CheckIcon color="teal.400" mb={1} mr={1}/> 프리미엄 지원</Text>
//                                     </Stack>
//                                 </CardBody>
//                                 <CardFooter p='unset'>
//                                     <Button 
//                                         variant='gradient' 
//                                         borderRadius='full' 
//                                         w='100%'
//                                         onClick={() => handlePayment('PREMIUM', 2200)}
//                                         isLoading={isLoading}
//                                         isDisabled={user.role === 'PREMIUM_USER'}
//                                     >
//                                         {user.role === 'PREMIUM_USER' ? '현재 플랜' : '플랜 시작하기'}
//                                     </Button>
//                                 </CardFooter>
//                             </Card>
//                         </Center>
//                     </HStack>
//                 )}
                
//                 {userPayments.length > 0 && (
//                     <Box mt={10}>
//                         <Heading size="md" mb={4}>결제 내역</Heading>
//                         <TableContainer>
//                             <Table variant="simple">
//                                 <Thead>
//                                     <Tr>
//                                         <Th>결제 ID</Th>
//                                         <Th>금액</Th>
//                                         <Th>결제일</Th>
//                                     </Tr>
//                                 </Thead>
//                                 <Tbody>
//                                     {userPayments.map((payment) => (
//                                         <Tr key={payment.paymentId}>
//                                             <Td>{payment.paymentId}</Td>
//                                             <Td>{payment.amount}원</Td>
//                                             <Td>{new Date(payment.payedAt).toLocaleDateString()}</Td>
//                                         </Tr>
//                                     ))}
//                                 </Tbody>
//                             </Table>
//                         </TableContainer>
//                     </Box>
//                 )}
//             </VStack>
//         </Container>
//     );
// }

// export default PricingPage;
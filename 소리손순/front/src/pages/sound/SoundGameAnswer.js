import { Badge, Box, Button, HStack, Input, InputGroup, InputRightElement, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IonIcon from "@reacticons/ionicons";
import { callGetRecordsAPI, callRegisterAnswerAPI } from "../../apis/SoundGameAPICalls";
import { resetCorrect } from "../../modules/SoundGameReducer";

function SoundGameAnswer({ sound, isCorrect }) {
    const dispatch = useDispatch();
    const [answer, setAnswer] = useState('');
    const { records } = useSelector(state => state.soundGameReducer);

    useEffect(() => {
        dispatch(callGetRecordsAPI(sound.challengeId));
        dispatch(resetCorrect());
    }, [isCorrect, dispatch]);

    const onChangeHandler = e => setAnswer(e.target.value);

    const submitAnswer = () => {
        if (answer.trim() !== '' && !sound.isCorrect) {
            const answerRequest = {
                challengeId: sound.challengeId,
                inputText: answer
            };
            dispatch(callRegisterAnswerAPI(answerRequest));
            setAnswer(''); // 입력 필드 초기화
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    };

    const formatSimilarity = (similarity) => {
        if (similarity === 0) {
            return "정답";
        }
        return Number(similarity).toFixed(2);
    };

    const handleAIHint = (inputText) => {
        // AI 힌트 로직 구현
        console.log("AI 힌트 요청:", inputText);
    };

    return (
        <Box>
            <Box mb={2}>
                <Text fontSize='13px'>내 도전 횟수: {records.length}회</Text>
                <Text fontSize='13px'>
                    내 최대 유사도: {records.length > 0 ?
                        Math.max(...records.map(item => item.similarity.toFixed(2))) : '-'}
                </Text>
            </Box>
            <InputGroup size='md' mb={4}>
                <Input
                    pr='4.5rem'
                    placeholder={sound.isCorrect ? '이미 맞힌 문제예요🥳' : '추측한 답안을 작성하세요.'}
                    fontSize='15px'
                    onChange={onChangeHandler}
                    onKeyPress={handleKeyPress}
                    value={answer}
                />
                <InputRightElement width='5.25rem'>
                    <Button h='1.75rem' size='sm' onClick={submitAnswer} isDisabled={sound.isCorrect}>
                        제출하기
                    </Button>
                </InputRightElement>
            </InputGroup>

            <Box border='1px' borderColor='gray.200' borderRadius='md'>
                <TableContainer>
                    <Table variant="simple" size="sm">
                        <Thead>
                            <Tr fontWeight={600} color='gray.700'>
                                <Td>제출한 답안</Td>
                                <Td>유사도</Td>
                                <Td>
                                    <HStack>
                                        <Box color='yellow.400'>
                                            <IonIcon name={"diamond"} />
                                        </Box>
                                        <Text>AI 힌트</Text>
                                        <Badge colorScheme='orange'>PREMIUM</Badge>
                                    </HStack>
                                </Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                records && records.length !== 0  ?
                                    records.map((record, index) => (
                                    <Tr key={index}>
                                        <Td maxW="300px" whiteSpace="normal" wordBreak="break-all">{record.inputText}</Td>
                                        <Td>{formatSimilarity(record.similarity)}</Td>
                                        <Td>
                                            <Button size="sm" onClick={() => handleAIHint(record.inputText)}>AI 힌트</Button>
                                        </Td>
                                    </Tr>
                                    ))
                                        :
                                    <Tr>
                                        <Td colSpan={3}>
                                            아직 제출한 답안이 없습니다.
                                        </Td>
                                    </Tr>
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default SoundGameAnswer;



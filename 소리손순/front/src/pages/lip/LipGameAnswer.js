import {Box, Button, Input, InputGroup, InputRightElement, Text} from "@chakra-ui/react";
import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callGetVoiceAnswerCheck} from "../../apis/lipGameAPICalls";
import {getUserId, isLogin} from "../../utils/TokenUtils";

function LipGameAnswer({ voiceQuestion , setAnswerData, setAttemptCount }) {
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState("");
    const { getVoiceAnswerCheck } = useSelector(state => state.lipGameReducer)
    const [attemptCount, updateAttemptCount] = useState(0);
    const [maxSimilarity, setMaxSimilarity] = useState(0);

    const playerId = isLogin() ? getUserId() : null;
    const voiceId = voiceQuestion?.voiceId;
    console.log("현재 로그인 되어 있어?? 로그인 되어 있는 사람은 몇번 이닝? : ", playerId);
    const onChangeHandler = e => setInputText(e.target.value);

    function handleKeyPress(e) {
        if (e.isComposing || e.keyCode === 229) return;

        if (e.key === 'Enter') {
            e.preventDefault(); // 폼 제출 방지
            handleSubmit();
        }
    }

    const handleClearInput = () => {
        setInputText("")
    }

    const handleSubmit = useCallback(() => {
        if(!voiceId) { //  voiceId 없을 때
            return;
        }
        const formData = { playerId, voiceId, inputText };

        dispatch(callGetVoiceAnswerCheck(formData)).then(result => {
            setAnswerData(result);
            //setAttemptCount(prev => prev + 1);
            const newAttemptCount = attemptCount + 1;
            updateAttemptCount(newAttemptCount);
            setAttemptCount(newAttemptCount);

            const similarity = result.payload?.getVoiceAnswerCheck.similarity;
            if (similarity > maxSimilarity) {
                setMaxSimilarity(similarity.toFixed(2));
            }
        });

        handleClearInput();
    }, [dispatch, inputText, playerId, voiceId, attemptCount, setAnswerData, maxSimilarity, setAttemptCount]);


    return (
        <>
            <Box mb={2}>
                <Text fontSize='13px'>내 도전 횟수: {attemptCount}</Text>
                <Text fontSize='13px'>내 최대 유사도: {maxSimilarity}</Text>
            </Box>
            <InputGroup size='md' mb={4}>
                <Input
                    pr='4.5rem'
                    placeholder='추측한 답안을 작성하세요.'
                    fontSize='15px'
                    value={inputText}
                    onChange={onChangeHandler}
                    onKeyDown={handleKeyPress}
                />
                <InputRightElement width='5.25rem'>
                    <Button onClick={handleSubmit} h='1.75rem' size='sm' >제출하기</Button>
                </InputRightElement>
            </InputGroup>
        </>
    );
}


export default LipGameAnswer;

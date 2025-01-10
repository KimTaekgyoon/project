import React, { useEffect, useRef, useState } from "react";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Confetti from 'react-confetti';

import QuitGame from "../../components/button/QuitGame";
import SkipButton from "../../components/button/SkipButton";
import GameHeader from "../../components/game/GameHeader";
import HandGameHint from "./HandGameHint";
import HandGameQuestion from "./HandGameQuestion";
import SuccessModal from "./SuccessModal";
import HandGameFinish from "./HandGameFinish";

import { callCheckCorrect, callGetWordsAPI, callGetWordImageAPI } from "../../apis/HandGameAPICalls";
import { statusToastAlert } from "../../utils/ToastUtils";
import { resetCorrect, updateCorrect, resetAll } from "../../modules/HandGameReducer";

function HandGamePage({difficulty, onQuitGame}) {
    const [gameInfo, setGameInfo] = useState({
        totalQuestion: 3, // 총 문제 개수
        currentQuestion: 0,  // 현재 문제 순번
        currentStep: 1,  // 현재 문제의 Step
        correctedAnswer: 0,  // 정답 개수
        skipCount: 0,  // 건너 뛴 횟수
    });

    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [capturedImage, setCapturedImage] = useState(null);
    const [countdown, setCountdown] = useState(3000);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const {questionList, isCorrect} = useSelector(state => state.handGameReducer);

    useEffect(() => {
        dispatch(resetAll());
        setGameInfo({
            totalQuestion: 3,
            currentQuestion: 0,
            currentStep: 1,
            correctedAnswer: 0,
            skipCount: 0,
        });
        dispatch(callGetWordsAPI(difficulty, 3));
    }, [difficulty, dispatch]);

    useEffect(() => {
        if (questionList.length > 0) {
            dispatch(callGetWordImageAPI(questionList[gameInfo.currentQuestion].riddleId, gameInfo.currentStep));
        }
    }, [questionList, gameInfo.currentQuestion, gameInfo.currentStep, dispatch]);

    useEffect(() => {
        if (isCorrect !== null && isCorrect) {
            if(gameInfo.currentStep === questionList[gameInfo.currentQuestion].totalStep)
                onOpen();
            else
                nextStep();
        } else if(isCorrect !== null) {
            statusToastAlert(
                "틀렸습니다!",
                "정답과 일치하지 않습니다. 다시 시도해 보세요.",
                "error"
            );
            reset();
        }
    }, [isCorrect, gameInfo.currentStep, gameInfo.currentQuestion, questionList, onOpen]);

    const nextStep = () => {
        setGameInfo(prev => ({
            ...prev,
            currentStep: prev.currentStep + 1
        }));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        reset();
    }

    const nextQuestion = (correctValue) => {
        dispatch(updateCorrect(gameInfo.currentQuestion, correctValue));

        if(gameInfo.currentQuestion === gameInfo.totalQuestion - 1) {
            setIsGameFinished(true);
        } else {
            setGameInfo(prev => ({
                ...prev,
                currentQuestion: prev.currentQuestion + 1,
                currentStep: 1,
                correctedAnswer: correctValue ? prev.correctedAnswer + 1 : prev.correctedAnswer
            }));
        }
        reset();
    }

    const reset = () => {
        setCapturedImage(null);
        setCountdown(3000);
        dispatch(resetCorrect());
    }

    const startCountdown = () => {
        setCountdown(3000);
        const timer = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 10) {
                    clearInterval(timer);
                    captureImage();
                    return null;
                }
                return prevCount - 10;
            });
        }, 10);
    };

    const captureImage = async () => {
        try {
            // 웹캠에서 스크린샷을 캡처
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc);

            // Data URL을 Blob으로 변환
            const base64Data = imageSrc.split(',')[1];
            const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());

            // FormData에 이미지와 추가 데이터 추가
            const formData = new FormData();
            formData.append('file', blob, 'capture.jpg');
            formData.append('riddle_id', questionList[gameInfo.currentQuestion].riddleId);
            formData.append('current_step', gameInfo.currentStep);

            // 서버로 데이터 전송
            dispatch(callCheckCorrect(formData));
        } catch (error) {
            console.error('Error capturing image or sending data:', error);
        }
    }

    const increaseSkipCount = (count) => {
        setGameInfo(prev => ({
            ...prev,
            skipCount: count
        }));
        nextQuestion(false);
    };

    if (!questionList || questionList.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {isGameFinished ? <HandGameFinish questionList={questionList} difficulty={difficulty}/>
            :
                <>
                    <QuitGame onQuitGame={onQuitGame} reset={reset}/>
                    <GameHeader title='맞혀라! 수수께끼' difficulty={difficulty}
                                gameInfo={gameInfo}/>
                    <HandGameQuestion gameInfo={gameInfo} questionList={questionList}
                                      webcam={webcamRef} capturedImage={capturedImage}
                                      countdown={countdown}
                    />
                    <HandGameHint/>
                    <Flex mt={4} justifyContent='space-between'>
                        <SkipButton gameInfo={gameInfo} increaseSkipCount={increaseSkipCount}/>
                        <Button colorScheme='teal' variant='outline' size='sm' onClick={startCountdown}
                                isDisabled={(countdown !== 3000) || !!capturedImage}>
                            사진 찍기
                        </Button>
                    </Flex>

                    <SuccessModal nextQuestion={nextQuestion} isOpen={isOpen} onClose={onClose}
                                  riddleId={questionList[gameInfo.currentQuestion].riddleId}/>
                    {showConfetti &&
                        <Confetti width={window.innerWidth} height={window.innerHeight}
                                  recycle={false}/>
                    }
                </>
            }
        </>
    );
}

export default HandGamePage;
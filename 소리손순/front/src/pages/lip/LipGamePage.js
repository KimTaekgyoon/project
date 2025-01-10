import {useMemo, useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import GameHeader from "../../components/game/GameHeader";
import LipGameAnswer from "./LipGameAnswer";
import LipGameQuestion from "./LipGameQuestion";
import LipSimilarityTable from "../../components/table/LipSimilarityTable";
import QuitGame from "../../components/button/QuitGame";
import SuccessModal from "./SuccessModal";
import Confetti from "react-confetti";
import {callRegisterRankAPI} from "../../apis/RankAPICalls";
import {getUserId, isLogin} from "../../utils/TokenUtils";
import {callGetVoiceAnswerCheck} from "../../apis/lipGameAPICalls";

function LipGamePage({ onQuitGame , setIsTodayCompleted}) {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { voiceQuestion } = useSelector(state => state.lipGameReducer);
    const [currentVoiceQuestion, setCurrentVoiceQuestion] = useState(null);
    const [answerData, setAnswerData] = useState(null);
    const [showConfetti, setShowConfetti] = useState(null);
    const attemptCountRef = useRef(0); // 도전 횟수 참조를 위한 useRef
    const memoizedAnswerData = useMemo(() => answerData, [answerData]);
    const userId = isLogin() ? getUserId() : null;
    const category = "VOICE";
    let score =  null;

    useEffect(() => {
        console.log("정답 : ", memoizedAnswerData);
        if (memoizedAnswerData !== null && memoizedAnswerData.payload?.getVoiceAnswerCheck.similarity === 0) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
            onOpen();
            handleCorrectAnswer(attemptCountRef.current); // 정답이 맞았을 때 현재 도전 횟수를 이용
        }
    }, [memoizedAnswerData]);

    useEffect(() => {
        if (voiceQuestion) {
            setCurrentVoiceQuestion(voiceQuestion);
        }
    }, [voiceQuestion]);

    const handleCorrectAnswer = (attemptCount) => {
        console.log("정답 처리, 도전 횟수:", attemptCount);
        // 백단 로직에 맞추려고 ㅠㅠㅠ 계산이 좀 이상함 소숫점으로 보내야함
        score = 100 / (100 * attemptCount);

        dispatch(callRegisterRankAPI({userId, category, score}));
    };

    const handleModalClose = () => {
        onClose();
        onQuitGame();
    };

    return (
        <>
            {currentVoiceQuestion && (
                <>
                    <QuitGame onQuitGame={onQuitGame} />
                    <GameHeader title='너의 목소리가 보여' />
                    <LipGameQuestion voiceQuestion={currentVoiceQuestion} />
                    <LipGameAnswer voiceQuestion={currentVoiceQuestion} setAnswerData={setAnswerData} setAttemptCount={(count) => attemptCountRef.current = count} />
                    <LipSimilarityTable dataList={memoizedAnswerData} />
                    {showConfetti && (
                        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
                    )}
                    <SuccessModal isOpen={isOpen} onClose={handleModalClose} currentVoiceQuestion={currentVoiceQuestion} setIsTodayCompleted={setIsTodayCompleted} />
                </>
            )}
        </>
    );
}

export default LipGamePage;

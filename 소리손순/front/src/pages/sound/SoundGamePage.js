import QuitGame from "../../components/button/QuitGame";
import GameHeader from "../../components/game/GameHeader";
import {useEffect, useState} from "react";
import Confetti from "react-confetti";
import SoundGameQuestion from "./SoundGameQuestion";
import SoundGameAnswer from "./SoundGameAnswer";
import {callGetSoundAPI, callResetAnswerAPI} from "../../apis/SoundGameAPICalls";
import {useDispatch, useSelector} from "react-redux";
import SoundSuccessModal from "./SoundSuccessModal";
import {useDisclosure} from "@chakra-ui/react";

function SoundGamePage({onQuitGame}) {

    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [showConfetti, setShowConfetti] = useState(false);

    const {sound, isCorrect} = useSelector(state => state.soundGameReducer);

    useEffect(() => {
        dispatch(callGetSoundAPI());

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';

            // 비동기 작업을 동기적으로 처리하기 위해 fetch를 사용
            fetch('/api/v1/challenge/reset-answer', { method: 'POST' })
                .then(response => console.log('Answer reset successfully'))
                .catch(error => console.error('Failed to reset answer:', error));
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            // 컴포넌트가 언마운트될 때도 답변을 초기화합니다.
            dispatch(callResetAnswerAPI());
        };
    }, [dispatch]);

    useEffect(() => {
        if(isCorrect) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
            onOpen();
        }
    }, [isCorrect, onOpen]);

    const handleModalClose = () => {
        onClose();
        onQuitGame();
    }

    return (
        sound &&
        <>
            <QuitGame onQuitGame={onQuitGame}/>
            <GameHeader title='도전! 소리 탐정'/>
            <SoundGameQuestion url={sound.url}/>
            <SoundGameAnswer sound={sound} isCorrect={isCorrect}/>
            {showConfetti &&
                <Confetti width={window.innerWidth} height={window.innerHeight}
                          recycle={false}/>
            }
            <SoundSuccessModal isOpen={isOpen} onClose={handleModalClose}/>
        </>
    );
}

export default SoundGamePage;








import {useEffect, useState} from "react";
import {Box, Button, Card, Divider, HStack, Image, Text} from "@chakra-ui/react";
import SoundGamePage from "./SoundGamePage";
import {useDispatch, useSelector} from "react-redux";
import {callCheckCorrectAPI} from "../../apis/SoundGameAPICalls";
import CountdownButton from "../../components/button/CountdownButton";
import {isLogin} from "../../utils/TokenUtils";
import {useNavigate} from "react-router-dom";

function SoundGameInfo() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [todayDate, setTodayDate] = useState(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {checkPlay} = useSelector(state => state.soundGameReducer);

    useEffect(() => {
        dispatch(callCheckCorrectAPI());
    }, [todayDate, isGameStarted, dispatch]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            if (now.getDate() !== todayDate.getDate()) {
                setTodayDate(new Date(now.setHours(0, 0, 0, 0)));
            }
        }, 60000);

        return () => clearInterval(intervalId);
    }, [todayDate]);


    const handleStartGame = () => {
        setIsGameStarted(true);
    };

    const handleQuitGame = () => {
        setIsGameStarted(false);
    };


    return (
        isGameStarted ?
            <SoundGamePage onQuitGame={handleQuitGame}/>
            :
            <>
                <Card p={4} mb={5}>
                    <HStack>
                        <Box>
                            <Image src='/images/main_sound.png' w='300px'/>
                        </Box>
                        <Box>
                            <Text fontWeight={600}>발음이 조금 달라도 소리 탐정에겐 문제 없다</Text>
                            <Text fontWeight={800} fontSize='20px'>
                                도전! 소리 탐정
                            </Text>
                            <Text>
                                도전! 소리 탐정은 하루에 한 문제씩 오늘의 문제가 출제됩니다. AI로 생성된 농인의 말소리를 듣고, 문장을 맞히는 게임으로,
                                농인의 발음도 한 번에 알아 맞히는 소리 탐정이 되어 보세요.
                            </Text>
                        </Box>
                    </HStack>
                </Card>

                {
                    isLogin() ?
                        checkPlay &&
                            checkPlay.isCorrect ?
                                <CountdownButton today={todayDate}/>
                                :
                                <Button variant='gradient' w="100%" minH="80px" onClick={handleStartGame}>
                                    🔊👂게임 시작!
                                </Button>
                        :
                        <Button variant='gradient' w="100%" minH="80px">
                            지금 로그인 해서 도전! 소리 탐정을 플레이 하세요.
                        </Button>
                }

                <Divider my={5}/>
            </>
    );
}

export default SoundGameInfo
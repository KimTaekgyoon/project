import { Box, Button, Card, HStack, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LipGamePage from "./LipGamePage";
import { callGetVoiceQuestionAPI } from "../../apis/lipGameAPICalls";
import { statusToastAlert } from "../../utils/ToastUtils";
import CountdownButton from "../../components/button/CountdownButton";

function LipGameInfo() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isTodayCompleted, setIsTodayCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [todayDate, setTodayDate] = useState(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            if (now.getDate() !== todayDate.getDate()) {
                setTodayDate(new Date(now.setHours(0, 0, 0, 0)));
            }
        }, 60000);

        return () => clearInterval(intervalId);
    }, [todayDate]);

    useEffect(() => {
        const checkTodayQuestion = async () => {
            try {
                await dispatch(callGetVoiceQuestionAPI());
                setLoading(false); // 게임 로딩 완료
            } catch (error) {
                if (error.response.status === 409) {
                    setIsTodayCompleted(true);
                    setLoading(false); // 게임 로딩 완료
                } else {
                    statusToastAlert(
                        "문제 조회 실패",
                        "문제를 가져오는데 실패했습니다.",
                        "error"
                    );
                    setLoading(false); // 에러 발생 시에도 로딩 완료로 설정
                }
            }
        };

        checkTodayQuestion();
    }, [dispatch]);

    const handleStartGame = () => {
        if (!isTodayCompleted) {
            setIsGameStarted(true);
        }
    };

    const handleQuitGame = () => {
        setIsGameStarted(false);
        // setIsTodayCompleted(true);
    };

    return (
        isGameStarted ? (
            <LipGamePage onQuitGame={handleQuitGame} setIsTodayCompleted={setIsTodayCompleted} />
        ) : (
            <>
                <Card p={4} mb={5}>
                    <HStack>
                        <Box>
                            <Image src='/images/main_lip.png' w='300px'/>
                        </Box>
                        <Box>
                            <Text fontWeight={600}>들리지 않아도 알 수 있어요</Text>
                            <Text fontWeight={800} fontSize='20px'>
                                너의 목소리가 보여
                            </Text>
                            <Text>
                                너의 목소리가 보여는 하루에 한 문제씩 오늘의 문제가 제시됩니다.
                                소리가 없는 입모양 영상이 제시되고 입모양을 읽어 정답의 문장이 무엇인지 맞추는 게임입니다.
                            </Text>
                        </Box>
                    </HStack>
                </Card>

                {!loading && (
                    isTodayCompleted ?
                        <CountdownButton today={todayDate}/>
                        :
                    <Button
                        variant='gradient'
                        w="100%"
                        minH="80px"
                        onClick={handleStartGame}
                        disabled={isTodayCompleted} // 이미 오늘의 문제를 풀었다면 버튼 비활성화
                    >
                        🙏🤲 게임 시작!
                    </Button>
                )}
            </>
        )
    );
}

export default LipGameInfo;

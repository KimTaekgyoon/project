import {Box, Button, Card, Divider, HStack, Image, Text} from "@chakra-ui/react";
import DifficultyButton from "../../components/button/DifficultyButton";
import {useState} from "react";
import HandGamePage from "./HandGamePage";

function HandGameInfo() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [difficulty, setDifficulty] = useState("LEVEL_1");

    const descriptionText = [
        "쉬움은 1~2단계, 보통은 3~4단계, 어려움은 5~6단계로",
        "이루어진 수어가 출제됩니다."
    ].join('\n');

    const handleStartGame = () => {
        setIsGameStarted(true);
    };

    const handleQuitGame = () => {
        setIsGameStarted(false);
    };

    const handleDifficulty = (e) => {
        setDifficulty(e.target.value);
    }

    return (
        isGameStarted ?
            <HandGamePage difficulty={difficulty} onQuitGame={handleQuitGame}/>
            :
            <>
                <Card p={4} mb={5}>
                    <HStack>
                        <Box>
                            <Image src='/images/main_hand.png' w='300px'/>
                        </Box>
                        <Box>
                            <Text fontWeight={600}>포인트 동작으로 가볍게 배우는 수어</Text>
                            <Text fontWeight={800} fontSize='20px'>
                                맞혀라! 수수께끼
                            </Text>
                            <Text>
                                맞혀라! 수수께끼는 화면의 손모양에 맞게 수어의 각 단계를 동작하여
                                정답을 맞히는 수어 학습 퀴즈입니다.
                            </Text>
                        </Box>
                    </HStack>
                </Card>
                <Button variant='gradient' w="100%" minH="80px" onClick={handleStartGame}>
                    🙏🤲 게임 시작!
                </Button>

                <DifficultyButton difficulty={difficulty} handleDifficulty={handleDifficulty} description={descriptionText}/>

                <Divider my={5}/>
            </>
    );
}

export default HandGameInfo;
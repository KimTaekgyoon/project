import {Box, Flex, Text, Image, Skeleton, Progress} from "@chakra-ui/react";
import Webcam from "react-webcam";
import {useEffect, useRef, useState} from "react";
import WordStepper from "./WordStepper";
import {useDispatch, useSelector} from "react-redux";
import {callGetWordImageAPI} from "../../apis/HandGameAPICalls";

function HandGameQuestion({gameInfo, questionList, webcam, capturedImage, countdown}) {

    const [loading, setLoading] = useState(true);
    const canvasRef = useRef(null);
    const dispatch = useDispatch();

    const {wordImage} = useSelector(state => state.handGameReducer);

    const handleUserMedia =  () => setLoading(false);

    useEffect(() => {
        dispatch(callGetWordImageAPI(questionList[gameInfo.currentQuestion].riddleId, gameInfo.currentStep));
    }, [gameInfo.currentStep, gameInfo.currentQuestion, dispatch]);

    return (
        <Box borderWidth='1px' borderRadius='lg' overflow='visible' position='relative' mt={4}>
            <Box p='4' borderBottom='1px solid' borderColor='gray.200'
                 fontWeight={600} color='gray.600'
            >
                <Flex justifyContent='space-between' alignItems='center'>
                    <Text>
                        문제 {gameInfo.currentQuestion + 1}. {questionList[gameInfo.currentQuestion].question}
                    </Text>

                    <Text fontSize='13px'>
                        맞춘 문제 수 {gameInfo.correctedAnswer}/{gameInfo.currentQuestion}
                        ({gameInfo.correctedAnswer === 0 ? 0
                        : Math.round(gameInfo.correctedAnswer/(gameInfo.currentQuestion) * 100)}%)
                    </Text>
                </Flex>
            </Box>

            <WordStepper gameInfo={gameInfo} questionList={questionList}/>

            {countdown !== 3000 && <Progress value={(countdown) / 3000 * 100} size='sm' colorScheme='cyan'/>}

            <Box position='relative' overflow='hidden'
                 borderBottomLeftRadius='lg' borderBottomRightRadius='lg'
            >
                {loading && <Skeleton height="400px"/>}
                {!capturedImage ?
                    <>
                        <Webcam ref={webcam} screenshotFormat="image/jpeg"
                                onUserMedia={handleUserMedia}
                                style={{
                                    display: loading ? 'none' : 'block',
                                    width: '100%', height: '400px',
                                    objectFit: 'cover'
                                }}
                        />
                        <canvas ref={canvasRef}
                                style={{ position: "absolute" }}
                        />
                    </>
                    : <Image src={capturedImage} w='100%' h='400px' objectFit='cover'/>
                }
                {!loading && !capturedImage && wordImage &&
                    <Image src={wordImage} alt="Guide"
                           position="absolute"
                           top={0}
                           left={0}
                           opacity={0.3}
                           width="100%"
                           height="100%"
                    />
                }
            </Box>
        </Box>
    );
}

export default HandGameQuestion;
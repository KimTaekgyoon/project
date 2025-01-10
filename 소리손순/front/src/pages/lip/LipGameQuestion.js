import {Box, Button, Flex, Text} from '@chakra-ui/react'; // @chakra-ui/react 사용 예시
import IonIcon from "@reacticons/ionicons";
import React, {useRef, useState, useEffect} from 'react';

function LipGameQuestion({voiceQuestion}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [iconOpacity, setIconOpacity] = useState(1);
    const videoRef = useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
        setIconOpacity(isPlaying ? 1 : 0);
    };

    useEffect(() => {
        const video = videoRef.current;
        video.playbackRate = 0.5;

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        const handleVideoEnd = () => {
            setIsPlaying(false);
            setIconOpacity(1);
        };
        if(video) {
            video.addEventListener('timeupdate', handleTimeUpdate);
            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            video.addEventListener('ended', handleVideoEnd);
        }
        return () => {
            if(video) {
                video.removeEventListener('timeupdate', handleTimeUpdate);
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
                video.removeEventListener('ended', handleVideoEnd);
            }
        };
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const progressBarWidth = duration ? (currentTime / duration) * 100 : 0;


    //console.log("문제 컴포넌트에서 문제가 잘 조회되고 있는가? : ",voiceQuestion.answer)

    return (
        <Box borderWidth='1px' borderRadius='lg' my={4} p={4}>
            { voiceQuestion ? (
                <Box position="relative">
                    <video
                        ref={videoRef}
                        src={voiceQuestion.question}
                        muted
                        style={{width: '100%', height: 'auto'}}
                    />
                    <Flex position="absolute" top={0} left={0} w="100%" height="100%" flexDirection="column" justifyContent="center" alignItems="center">
                        <Button p={0} w="64px" h="64px" borderRadius="50%" opacity={iconOpacity} transition="ease .3s">
                            <IonIcon
                                name={isPlaying ? 'pause-circle' : 'play-circle'}
                                style={{ width: 64, height: 64, fontSize: 64, color: '#A3D8F4'}}
                                onClick={handlePlayPause}
                            />
                        </Button>
                        <Flex w="100%" p={4} justifyContent="space-between" alignItems="center" position="absolute" bottom={0} left={0}>
                            <Text color="mint.300">{formatTime(currentTime)}</Text>
                            <Box flex="1" mx={2} height="4px" bg="gray.200" borderRadius="2px" position="relative">
                                <Box width={`${progressBarWidth}%`} height="100%" bg="mint.300" borderRadius="2px" />
                            </Box>
                            <Text color="mint.300"> {formatTime(duration)}</Text>
                        </Flex>
                    </Flex>
                </Box>
            ) : (
                <Text>비디오를 로드할 수 없습니다.</Text>
            )}
        </Box>
    );
}

export default LipGameQuestion;

import {Box, Center, Text} from "@chakra-ui/react";
import IonIcon from "@reacticons/ionicons";
import {useEffect, useRef, useState} from "react";

function SoundGameQuestion({url}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const onLoadedMetadata = () => {
                setDuration(audio.duration);
            };

            const onTimeUpdate = () => {
                setCurrentTime(audio.currentTime);
            };

            audio.addEventListener('loadedmetadata', onLoadedMetadata);
            audio.addEventListener('timeupdate', onTimeUpdate);

            return () => {
                audio.removeEventListener('loadedmetadata', onLoadedMetadata);
                audio.removeEventListener('timeupdate', onTimeUpdate);
            };
        }
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const onEnded = () => {
        setIsPlaying(false);
    };


    return (
        <Box borderWidth='1px' borderRadius='lg' my={4}>
            <Center color='red.400' pt={10} onClick={togglePlay} cursor="pointer">
                <IonIcon name={isPlaying ? 'pause-circle' : 'play-circle'} style={{fontSize: 64}}/>
                <audio ref={audioRef} src={url} onEnded={onEnded}/>
            </Center>
            <Center pb={10}>
                {duration > 0 && (
                    <Text>
                        {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
                    </Text>
                )}
            </Center>

        </Box>
    );
}

export default SoundGameQuestion;
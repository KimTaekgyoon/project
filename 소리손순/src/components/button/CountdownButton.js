import {Box, Button, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";

function CountdownButton({today}) {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + 1);
        targetDate.setHours(0, 0, 0, 0);

        const updateCountdown = () => {
            const now = new Date();
            const timeDiff = targetDate - now;

            if (timeDiff <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const totalSeconds = Math.floor(timeDiff / 1000);
            const hours = Math.floor(totalSeconds / 3600) % 24;
            const minutes = Math.floor(totalSeconds / 60) % 60;
            const seconds = totalSeconds % 60;

            setTimeLeft({ hours, minutes, seconds });
        };

        updateCountdown();
        const id = setInterval(updateCountdown, 1000);

        return () => clearInterval(id);
    }, [today]);


    return (
        <>
            <Button variant='gradient' w="100%" minH="80px" cursor='unset'>
                다음 게임 시작까지, {timeLeft.hours}시간 {timeLeft.minutes}분 {timeLeft.seconds}초
            </Button>

            <Box textAlign='right' mt={2}>
                <Text fontSize='14px' >🥳 이미 오늘 게임을 성공하셨어요.</Text>
                <Text fontSize='14px' >문제가 초기화 되는 00시에 다시 만나요!</Text>
            </Box>
        </>
    );
}

export default CountdownButton;
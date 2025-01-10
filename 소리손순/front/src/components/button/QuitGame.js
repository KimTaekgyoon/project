import {HStack, Text} from "@chakra-ui/react";
import {ChevronLeftIcon} from "@chakra-ui/icons";

function QuitGame({onQuitGame, reset}) {

    const onClickHandler = () => {
        if(reset)
            reset();
        onQuitGame();
    }

    return (
        <HStack gap={0} color='gray.600' mb={2}>
            <ChevronLeftIcon onClick={onClickHandler} cursor='pointer'/>
            <Text fontSize='15px' fontWeight={500} cursor='pointer' onClick={onClickHandler}>
                그만하기
            </Text>
        </HStack>
    );
}

export default QuitGame;
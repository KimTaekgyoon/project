import {Badge, Box, HStack, Text} from "@chakra-ui/react";
import {getDifficultyKor} from "../../utils/DifficultyUtils";

function GameHeader({title, difficulty, gameInfo}) {
    return (
        <Box borderRadius='full' px={4} w='100%'
             bg="linear-gradient(270deg, #9AE6B4 0%, #90CDF4 100%)"
        >
            <HStack color='white' fontWeight={600} gap={0}>
                <Box py={2} px={4}>
                    <Text>{title}</Text>
                </Box>

                {
                    difficulty &&
                    <Box borderLeft='1px solid white' px={4}>
                        <HStack gap={2}>
                            <Text>난이도</Text>
                            <Badge variant='outline' colorScheme='gray'>
                                {getDifficultyKor(difficulty)}
                            </Badge>
                        </HStack>
                    </Box>
                }

                {
                    gameInfo &&
                    <Box borderLeft='1px solid white' px={3}>
                        <Text>총 {gameInfo.totalQuestion}문제 중 {gameInfo.currentQuestion + 1}문제 공부 중</Text>
                    </Box>
                }
            </HStack>
        </Box>
    );
}

export default GameHeader;
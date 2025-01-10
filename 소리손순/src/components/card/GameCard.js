import {Box, Card, Text, Link as ChakraLink, Image, Divider} from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'

function GameCard({game}) {
    return (
        <ChakraLink as={ReactRouterLink} to={game.url}>
            <Card w={200} h={270} p={6}>
                <Box p={2}>
                    <Image src={game.img}/>
                </Box>
                <Text fontWeight={700} fontSize='20px' pt={2} color='gray.700'>{game.title}</Text>
                <Text color='gray.700'>{game.desc}</Text>
            </Card>
        </ChakraLink>
    );
}

export default GameCard;
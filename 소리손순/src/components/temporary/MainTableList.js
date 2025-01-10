import {Box, Flex, Heading, Img, Text, Link as ChakraLink} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";
import React from "react";

function MainTableList () {
    return (
        <Box w="300px">
            <Box w="100%" borderRadius="8px" border="1px solid #E2E8F0" p={4}>
                <ChakraLink cursor="pointer" display="flex" alignItems="center" justifyContent="space-between" pb={3} borderBottom="1px solid #E2E8F0">
                    <Flex flexDirection="column">
                        <Heading fontSize="14px" color="#718096">고객센터 운영시간 안내</Heading>
                        <Text fontSize="12px" color="#A0AEC0">2024-07-18 14:32</Text>
                    </Flex>
                    <Img src="/images/icon_more_btn.png"/>
                </ChakraLink>
                <ChakraLink cursor="pointer" display="flex" alignItems="center" justifyContent="space-between" py={3} borderBottom="1px solid #E2E8F0">
                    <Flex flexDirection="column">
                        <Heading fontSize="14px" color="#718096">고객센터 운영시간 안내</Heading>
                        <Text fontSize="12px" color="#A0AEC0">2024-07-18 14:32</Text>
                    </Flex>
                    <Img src="/images/icon_more_btn.png"/>
                </ChakraLink>
                <ChakraLink cursor="pointer" display="flex" alignItems="center" justifyContent="space-between" py={3} borderBottom="1px solid #E2E8F0">
                    <Flex flexDirection="column">
                        <Heading fontSize="14px" color="#718096">고객센터 운영시간 안내</Heading>
                        <Text fontSize="12px" color="#A0AEC0">2024-07-18 14:32</Text>
                    </Flex>
                    <Img src="/images/icon_more_btn.png"/>
                </ChakraLink>
                <ChakraLink cursor="pointer" display="flex" alignItems="center" justifyContent="space-between" pt={3}>
                    <Flex flexDirection="column">
                        <Heading fontSize="14px" color="#718096">고객센터 운영시간 안내</Heading>
                        <Text fontSize="12px" color="#A0AEC0">2024-07-18 14:32</Text>
                    </Flex>
                    <Img src="/images/icon_more_btn.png"/>
                </ChakraLink>
            </Box>
        </Box>
    );
}

export default MainTableList;
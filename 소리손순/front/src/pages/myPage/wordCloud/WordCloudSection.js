import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Collapse, Flex, IconButton, Image, Switch, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import {authRequest} from '../../../apis/api';

function WordCloudSection({ wordCloudVisible, setWordCloudVisible, keywords }) {
    const [wordCloudUrl, setWordCloudUrl] = useState('');
    const [wordCloudPublic, setWordCloudPublic] = useState(true);

    useEffect(() => {
        const fetchWordCloud = async () => {
            try {
                const response = await authRequest.get(`/api/v1/page/wordcloud`);
                setWordCloudUrl(response.data);
            } catch (error) {
                console.error('Error fetching word cloud:', error);
            }
        };

        fetchWordCloud();
    }, []);

    const handleSwitchChange = () => {
        setWordCloudPublic(prev => !prev);
    };

    return (
        <Box
            bg="gray.50"
            p={5}
            borderRadius="md"
            boxShadow="sm"
            mt={5}
            border="1px solid"
            borderColor="gray.200"
        >
            <Flex justify="space-between" align="center" mb={3}>
                <Flex align="center">
                    <Text fontWeight="bold" fontSize="lg" mr={4}>
                        관심 키워드
                    </Text>
                    <Switch
                        colorScheme="teal"
                        isChecked={wordCloudPublic}
                        onChange={handleSwitchChange}
                    />
                </Flex>
                <IconButton
                    aria-label="Toggle word cloud"
                    icon={wordCloudVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={() => setWordCloudVisible(prev => !prev)}
                />
            </Flex>
            <Collapse in={wordCloudVisible}>
                {wordCloudPublic ? (
                    <Box
                        h="300px"
                        bg="white"
                        borderRadius="md"
                        boxShadow="sm"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p={4}
                    >
                        {wordCloudUrl ? (
                            <Image
                                src={wordCloudUrl}
                                alt="워드 클라우드 이미지"
                                objectFit="contain"
                                maxW="100%"  // 최대 너비 100%
                                maxH="100%"  // 최대 높이 100%
                            />
                        ) : (
                            <Text color="gray.500" fontStyle="italic">
                                관심사를 입력하면 워드 클라우드가 생성됩니다.
                            </Text>
                        )}
                    </Box>
                ) : (
                    <Box
                        h="150px"
                        bg="white"
                        borderRadius="md"
                        boxShadow="sm"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text color="gray.500" fontStyle="italic" p={5}>
                            비공개입니다.
                        </Text>
                    </Box>
                )}
            </Collapse>
        </Box>
    );
}

export default WordCloudSection;

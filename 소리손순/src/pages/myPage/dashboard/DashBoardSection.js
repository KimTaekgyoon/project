import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Collapse, Flex, IconButton, Switch, Text } from "@chakra-ui/react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashBoardGraph from "./DashBoardGraph";

const DashBoardSection = () => {
    const [dashBordVisible, setDashBordVisible] = useState(true);
    const [dashboardPublic, setDashboardPublic] = useState(true);

    const toggleDashboardVisibility = () => {
        setDashBordVisible(!dashBordVisible);
    };

    const navigate = useNavigate();

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
                        대시보드
                    </Text>
                    <Switch
                        colorScheme="teal"
                        isChecked={dashboardPublic}
                        onChange={() => setDashboardPublic(!dashboardPublic)}
                    />
                </Flex>
                <IconButton
                    aria-label="Toggle dashboard"
                    icon={dashBordVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={toggleDashboardVisibility}
                />
            </Flex>
            <Collapse in={dashBordVisible}>
                {dashboardPublic ? (
                    <Box
                        h="150px"
                        bg="white"
                        borderRadius="md"
                        boxShadow="sm"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <DashBoardGraph />
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

export default DashBoardSection;

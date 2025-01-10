import { Box, HStack, Switch, Text, VStack } from "@chakra-ui/react";

function MedalSection({ medalVisible, setMedalVisible }) {
    return (
        <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="md" boxShadow="sm">
            <HStack justifyContent="space-between" mb={3}>
                <Text fontWeight="bold" fontSize="lg">
                    🥇 일일 매달 수집 현황
                </Text>
                <Switch
                    colorScheme="teal"
                    isChecked={medalVisible}
                    onChange={() => setMedalVisible(!medalVisible)}
                />
            </HStack>
            {medalVisible ? (
                <HStack justifyContent="space-between" spacing={10}>
                    <VStack>
                        <Text fontWeight="bold">최근 수집 매달</Text>
                        <Text>도전! 10연승!</Text>
                    </VStack>
                    <VStack>
                        <Text fontWeight="bold">수집 매달</Text>
                        <Text>5개</Text>
                    </VStack>
                    <VStack>
                        <Text fontWeight="bold">미수집 매달</Text>
                        <Text>45개</Text>
                    </VStack>
                </HStack>
            ) : (
                <Text color="gray.500" fontStyle="italic">
                    비공개입니다.
                </Text>
            )}
        </Box>
    );
}

export default MedalSection;

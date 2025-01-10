import {Badge, Box, Flex, HStack, Table, TableContainer, Tbody, Td, Text, Thead, Tr} from "@chakra-ui/react";
import IonIcon from "@reacticons/ionicons";
import React, { useEffect, useState } from 'react';
import LipSimilarityTableItem from "../item/LipSimilarityTableItem";
import {InfoOutlineIcon} from "@chakra-ui/icons";

function LipSimilarityTable({ dataList }) {
    const [recordGameVoiceResponseList, setRecordGameVoiceResponseList] = useState([]);

    useEffect(() => {
        if (dataList) {
            const newRecord = dataList?.payload?.getVoiceAnswerCheck;
            setRecordGameVoiceResponseList(prevList => [newRecord, ...prevList]);
        }
    }, [dataList]);

    return (
        <>
            <Box border='1px' borderColor='gray.200' borderRadius='md' mt={4}>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr fontWeight={600} color='gray.700'>
                                <Td>제출한 답안</Td>
                                <Td>유사도</Td>
                                <Td>
                                    <HStack>
                                        <Box color='yellow.400'>
                                            <IonIcon name={"diamond"} />
                                        </Box>
                                        <Text>AI 힌트</Text>
                                        <Badge colorScheme='orange'>PREMIUM</Badge>
                                    </HStack>
                                </Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {recordGameVoiceResponseList.length > 0 ? (
                                recordGameVoiceResponseList.map((data, index) => (
                                    <LipSimilarityTableItem key={index} data={data} id={index + 1} />
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan={3}>아직 제출한 답안이 없습니다.</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <Flex alignItems="center" fontSize="12px" mt={5}><InfoOutlineIcon color="red" mr={2}/> 페이지를 벗어날시, 제출한 답안의 내용은 저장 되지 않습니다.</Flex>
        </>
    );
}

export default LipSimilarityTable;

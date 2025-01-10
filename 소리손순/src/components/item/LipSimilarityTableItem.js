import { Button, Td, Tr } from "@chakra-ui/react";
import {useEffect, useState} from "react";
import SuccessModal from "../../pages/lip/SuccessModal";

// function LipSimilarityTableItem({data, id}) {
function LipSimilarityTableItem({data}) {

    console.log("여기는 아이템!!!! 값 응답하라 오바1! : ", data)

    const formatSimilarity = (similarity) => {
        if (similarity === 0) {
            return "정답";
        }
        return Number(similarity).toFixed(2);
    };

    return (
        <>
            <Tr>
                <Td maxW="195px" overflow="hidden" textOverflow="ellipsis">{data.inputText}</Td>
                <Td>{formatSimilarity(data.similarity)}</Td>
                <Td>
                    <Button size="sm">AI 힌트</Button>
                </Td>
            </Tr>

        </>
    );
}

export default LipSimilarityTableItem;
import {Td, Tr} from "@chakra-ui/react";

function SimilarityTableItem({data, id}) {

    return (
        <Tr>
            <Td>{id}</Td>
            <Td maxW="195px" overflow="scroll">
                {data.inputText}
            </Td>
            <Td>
                {data.similarity.toFixed(2)}
            </Td>
        </Tr>
    );
}

export default SimilarityTableItem;
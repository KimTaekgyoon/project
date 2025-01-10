import {Flex, Text, HStack, VStack} from "@chakra-ui/react";
import React from "react";
import IonIcon from "@reacticons/ionicons";

function Footer() {
    return (
        <Flex w="100%" justifyContent="space-between" mt={10} p={5}
              borderTop='1px solid' borderColor='gray.200'
              position="relative"
        >
            <VStack align='left'>
                <Text color="gray.400" fontSize='12px'>
                    (주) 소리손순
                    <IonIcon name="logo-github"/>
                </Text>
                <Text color="gray.400" fontSize='10px'>
                    Copyrightⓒ2024 SIGN MUSCAT All Rights Reserved.
                </Text>
            </VStack>
            <HStack spacing={8} mb={8}>
                <Text color="gray.400" fontSize='12px'>이용약관</Text>
                <Text color="gray.400" fontSize='12px'>개인정보처리방침</Text>
                <Text color="gray.400" fontSize='12px'>고객센터</Text>
                <Text color="gray.400" fontSize='12px'>B2B문의</Text>
                <Text color="gray.400" fontSize='12px'>회사소개</Text>
            </HStack>
        </Flex>
    )
}

export default Footer;
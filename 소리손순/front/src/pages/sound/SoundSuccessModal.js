import {
    Button, Center, Heading, Text, Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function SuccessModal({isOpen, onClose}) {

    const navigate = useNavigate();
    const onClickHandler = () => {
        onClose();
        navigate('/game/sound');
    }

    return(
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered size='lg'
                   closeOnOverlayClick={false} closeOnEsc={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody mt={10} mx={5}>
                        <Center>
                            <Image boxSize='80px' objectFit='cover' src='/images/birthday-emoji.png'/>
                        </Center>
                        <Heading textAlign='center' my={4}>축하합니다!</Heading>
                        <Text textAlign='center' fontWeight='semibold'>
                            오늘 도소탐의 정답을 맞혔어요.
                        </Text>
                    </ModalBody>
                    <ModalFooter justifyContent='center' my={5}>
                        <Button colorScheme='yellow' onClick={onClickHandler}>확인</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
}
export default SuccessModal;
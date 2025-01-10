import {
    Button, Center, Heading, Text, Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {isLogin} from "../../utils/TokenUtils";

function SuccessModal({isOpen, onClose,  currentVoiceQuestion, setIsTodayCompleted}) {

    const navigate = useNavigate();
    const onClickHandler = () => {
        onClose();
        navigate('/game/lip');
        window.location.reload();
        if(isLogin()) {
            setIsTodayCompleted(true);
        }
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
                        <Text textAlign='center' fontWeight='semibold' mb={2}>
                            너의 목소리가 보여, 오늘의 문제를 맞혔어요! 대단해요!
                        </Text>
                        <Text textAlign='center' color='gray.500' fontSize='sm'>
                            오늘의 문제를 성공적으로 풀었어요. 입모양 읽기 실력이 점점 늘고 있어요!
                        </Text>
                        <Text textAlign='center' fontWeight='semibold' mt={4}>
                            새로운 문제는 자정에 업데이트돼요. 내일 다시 도전하세요!
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
import {
    Flex,
    Modal,
    ModalContent,
    ModalOverlay,
    Image,
    ModalHeader,
    Button, ModalFooter
} from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";
import FindPasswordForm from "../../components/form/FindPasswordForm";

function FindPasswordPage({isOpen, onClose, openLoginModal}) {
    const handleSuccess = () => {
        onClose();
        openLoginModal();
    };
    return(
        <>
            <Modal trapFocus={false} onClose={onClose} isOpen={isOpen} closeOnOverlayClick={false} closeOnEsc={false} className="findPasswordPage" >
                <ModalOverlay />
                <ModalContent maxW="1125px" maxH="800px"  width="1125px" height="800px" borderRadius="25px" overflow="hidden" position="relative">
                    <Flex w="1125px" h="800px" justifyContent="space-between">
                        <Flex w="595px" flexDirection="column" px="40px" py="30px" alignItems="center">
                            <ModalHeader w="100%" p={0}><Image src="/images/logo.png" alt="소리손순 로고 이미지"/></ModalHeader>
                            <FindPasswordForm onSuccess={handleSuccess}/>
                        </Flex>
                        <Flex w="530px" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" backgroundImage="/images/img_login_banner.png">
                        </Flex>
                    </Flex>
                    <ModalFooter position="absolute" right="10px" top="10px">
                        <Button background="transparent" onClick={onClose} p={0}><CloseIcon color="white"/></Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default FindPasswordPage;




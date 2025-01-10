import {Box, Container, Flex} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import {useState} from "react";
import LoginPage from "../pages/auth/LoginPage";
import FindPasswordPage from "../pages/auth/FindPasswordPage";

function MainLayout() {

    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const openLoginModal = () => {
        setPasswordModalOpen(false);
        setLoginModalOpen(true);
    };
    const closeLoginModal = () => setLoginModalOpen(false);

    const openPasswordModal = () => {
        setLoginModalOpen(false);
        setPasswordModalOpen(true);
    };

    const closePasswordModal = () => setPasswordModalOpen(false);

    return (
        <>
            <Header onOpenLoginModal={openLoginModal} />
            <Flex direction="column" minHeight="100vh">
                <Container maxW='750px' display="flex" p={0} pt="60px">
                    <Box flex="1" width>
                        <Outlet/>
                    </Box>
                    <Sidebar/>
                </Container>
            </Flex>
            <Box mt="auto">
                <Footer/>
            </Box>
            {isLoginModalOpen && (
                <LoginPage isOpen={isLoginModalOpen} onClose={closeLoginModal} onForgotPassword={openPasswordModal} />
            )}
            {isPasswordModalOpen && (
                <FindPasswordPage isOpen={isPasswordModalOpen} onClose={closePasswordModal} openLoginModal={openLoginModal}/>
            )}
        </>

    );
}

export default MainLayout;
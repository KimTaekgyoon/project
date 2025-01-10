import {Box, Container, Flex} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function WideLayout() {

    return (
        <>
            <Header/>
            <Flex direction="column" minHeight="100vh">
                <Outlet/>
            </Flex>
            <Box mt="auto">
                <Footer/>
            </Box>
        </>

    );
}

export default WideLayout;
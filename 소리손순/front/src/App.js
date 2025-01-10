import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "./components/router/ProtectedRoute";
import MainLayout from './layouts/MainLayout';
import WideLayout from "./layouts/WideLayout";
import FindPasswordPage from "./pages/auth/FindPasswordPage";
import LoginPage from './pages/auth/LoginPage';
import HandGameInfo from "./pages/hand/HandGameInfo";
import LipGameInfo from "./pages/lip/LipGameInfo";
import MainPage from "./pages/MainPage";
import GestBookList from "./pages/myPage/guestBook/GuestBookList.js";
import MypageHomePage from "./pages/myPage/MypageHomePage.js";
import PricingPage from "./pages/pricing/PricingPage";
import SoundGameInfo from "./pages/sound/SoundGameInfo";
import EditUsersInfo from "./pages/users/EditUsersInfo.js";
import SignUpPage from "./pages/users/SignUpPage.js";
import SuccessPage from "./pages/users/SuccessPage.js";
import Withdraw from "./pages/users/Withdraw.js";

function App() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);

    const openLoginModal = () => setLoginModalOpen(true);
    const closeLoginModal = () => setLoginModalOpen(false);

    const openSignupModal = () => setSignupModalOpen(true);
    const closeSignupModal = () => setSignupModalOpen(false);

    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<MainPage/>}/>
                    <Route
                        path='/find/password'
                        element={
                            <ProtectedRoute isAuthenticated={false} onRequireLogin={openLoginModal}>
                                <FindPasswordPage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="game">
                        <Route path="hand" element={<HandGameInfo/>}/>
                        <Route path="sound" element={<SoundGameInfo/>}/>
                        <Route path="lip" element={<LipGameInfo/>}/>
                    </Route>
                    <Route path="mypage">
                        <Route path="mypageHome" element={<MypageHomePage />} />
                        <Route path="gestBookList" element={<GestBookList />} />
                    </Route>
                    <Route path="users">
                        <Route path="success" element={<SuccessPage />} />
                        <Route path="delete" element={<Withdraw />} />
                        <Route path="edit" element={<EditUsersInfo />} />
                    </Route>
                </Route>
                <Route path="/pricing" element={<WideLayout/>}>
                    <Route index element={<PricingPage openLogin={openLoginModal}/>}/>
                </Route>
            </Routes>
            <LoginPage isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            <SignUpPage isOpen={isSignupModalOpen} onClose={closeSignupModal} />
        </>
    );
}

export default App;
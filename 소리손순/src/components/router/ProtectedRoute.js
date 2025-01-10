import { useEffect } from 'react';
import { isLogin, isAdmin, isFreeUser, isPremiumUser } from '../../utils/TokenUtils';

function ProtectedRoute({ isAuthenticated, isAdminOnly, role, onRequireLogin, children }) {

    useEffect(() => {
        if (isAdminOnly && !isAdmin()) {
            onRequireLogin();
        } else if (isAuthenticated && !isLogin()) {
            onRequireLogin();
        } else if (role === 'FREE_USER' && !isFreeUser()) {
            onRequireLogin();
        } else if (role === 'PREMIUM_USER' && !isPremiumUser()) {
            onRequireLogin();
        }
    }, [isAuthenticated, isAdminOnly, role, onRequireLogin]);

    if (!isLogin()) {
        return null; // 로그인되지 않았으면 아무 것도 렌더링하지 않음
    }

    return children;
}

export default ProtectedRoute;


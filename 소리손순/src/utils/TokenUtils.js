import {jwtDecode} from "jwt-decode";

const BEARER = 'Bearer ';

export const saveToken = (headers) => {
    localStorage.setItem("access-token", headers['access-token']);
    localStorage.setItem("refresh-token", headers['refresh-token']);
};

export const removeToken = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
};

const getAccessToken = () => localStorage.getItem('access-token');
const getRefreshToken = () => localStorage.getItem('refresh-token');

export const getAccessTokenHeader = () => BEARER + getAccessToken();
export const getRefreshTokenHeader = () => BEARER + getRefreshToken();

const getDecodeAccessToken = () => jwtDecode(getAccessToken());
const getDecodeRefreshToken = () => jwtDecode(getRefreshToken());

// 로그인 되었나?
export const isLogin = () => {
    return getAccessToken() && getRefreshToken() && (Date.now() < getDecodeRefreshToken().exp * 1000);
};

// 일반회원 인가?
export const isFreeUser = () => {
    return isLogin() && getDecodeAccessToken().role === 'FREE_USER';
};

// 유료회원 인가?
export const isPremiumUser = () => {
    return isLogin() && getDecodeAccessToken().role === 'PREMIUM_USER';
};

// 관리자 인가?
export const isAdmin = () => {
    return isLogin() && getDecodeAccessToken().role === 'ADMIN';
};

// 게스트 인가?
export const isGest = () => {
    return !isLogin();
};

export const getId = () => {
    return getDecodeAccessToken().id;
};

export const getUserId = () => {
    const accessToken = getDecodeAccessToken();
    return accessToken ? accessToken.userId : null;
};








import {authRequest, request} from "./api";
import {success} from "../modules/AuthModules";
import {removeToken, saveToken} from "../utils/TokenUtils";

// 로그인 요청 API
export const callLoginAPI = ({ loginRequest, toast }) => {
    return async (dispatch, getState) => {
        const response = await request(
            'POST',
            '/api/v1/login',
            { 'Content-Type': 'application/json' },
            JSON.stringify(loginRequest),
        );
        console.log('Response status:', response?.status);
        console.log('Response data:', response?.data);
        console.log('Response:', response);
        if (response?.status === 200) {
            saveToken(response.headers);
            dispatch(success());
            return response;
        } else if (response?.status === 401) {
            toast({
                title: "로그인 실패",
                description: "로그인 정보가 올바르지 않습니다.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top", // toast가 표시될 위치
            });
            // toast.error("로그인 정보가 올바르지 않습니다.", { toastId: 'login' });
        } else {
            console.log(`Unexpected status: ${response?.status}`);
            toast({
                title: "오류 발생",
                description: "오류가 발생하였습니다.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top", // toast가 표시될 위치
            });
            // toast.error("오류가 발생하였습니다.", { toastId: 'login' });
        }
    };
}

// 이메일 인증 코드 요청 API
export const callSendVerificationCodeAPI = (email) => {
    return async (dispatch, getState) => {
        const response = await request(
            'POST',
            `/api/v1/email/send`,
            { 'Content-Type': 'application/x-www-form-urlencoded' },
            { email: email }
        );

        return response.data;
    };
};

// 이메일 인증 코드 검증 API
export const callCheckVerificationCodeAPI = (verifyToken, codeValue, emailValue) => {
    return async (dispatch, getState) => {

        const response = await request(
            'POST',
            `/api/v1/email/verify`,
            { 'Content-Type': 'application/x-www-form-urlencoded' },
            new URLSearchParams({ token: verifyToken, code: codeValue, email: emailValue })
        );

        if(response.status !== 200) {
            const error = new Error (`에러 상태코드 : ${response.status}`)
            error.response = response;
            throw error;
        }

        return response;

    };
};



// 비밀번호 재설정 요청 API
export const callResetPasswordAPI = (email, passwordRequest) => {
    return async (dispatch, getState) => {
        const response = await request(
            'POST',
            `/api/v1/verify/password?email=${encodeURIComponent(email)}`,
            { 'Content-Type': 'application/json' },
            JSON.stringify(passwordRequest)
        );

        return response.data;
    };
};


// 로그아웃 요청 API
export const callLogoutAPI = () => {
    return async (dispatch, getState) => {
        return await authRequest
            .post(`/api/v1/logout`)
            .then(result => {
                removeToken();
                dispatch(success());
            })
            .catch(error => {
                removeToken();
                window.location.replace('/');
            });
    };
};
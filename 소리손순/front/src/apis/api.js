import axios from "axios";
import {getAccessTokenHeader, getRefreshTokenHeader, saveToken} from "../utils/TokenUtils";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
export const DEFAULT_URL = `${SERVER_IP}:${SERVER_PORT}`;

export const request = async (method, url, headers, data) => {
    return await axios({
        method,
        url : `${DEFAULT_URL}${url}`,
        headers,
        data
    })
        .then(response => {return response;})
        .catch(error => {
            console.error("request 에러 : ", error);
            if (error.response) {
                // 서버에서 401이나 500 등 오류 응답이 왔을 경우
                return error.response;  // 응답 객체 반환
            } else {
                // 서버에 도달하지 못한 경우 (네트워크 오류 등)
                return {
                    status: 500,  // 서버에 도달하지 못한 경우 상태 코드 500 반환
                    data: null,
                };
            }
        });
}

// 인증 요청
export const authRequest = axios.create({
    baseURL: DEFAULT_URL
});

authRequest.interceptors.request.use(config => {
    console.log("Authorization 헤더: ", config.headers['Authorization']);
    config.headers['Authorization'] = getAccessTokenHeader();
    return config;
});

authRequest.interceptors.response.use(
    /* SUCCESS */
    response => {
        return response;
    },
    /* ERROR */
    async error => {
        const {config, response} = error;

        if (response?.status === 401) {
            const originRequest = config;
            const response = await postRefreshToken();

            if (response?.status === 200) {
                // 토큰 재발급에 성공했을 때
                saveToken(response.headers);
                // 실패했던 요청을 다시 요청
                originRequest.headers['Authorization'] = getAccessTokenHeader();
                return axios(originRequest);
            }
        }
        return Promise.reject(error);
    }
);

// 재발급 요청
export async function postRefreshToken() {
    return await request('POST', '/api/v1/token/issue', {
        'Refresh-Token': getRefreshTokenHeader(),
    });
}

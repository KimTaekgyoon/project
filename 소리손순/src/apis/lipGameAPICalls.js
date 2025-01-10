import {authRequest, request} from "./api";
import {getVoiceAnswerCheck, getVoiceQuestion} from "../modules/LipGameReducer";

export const callGetVoiceQuestionAPI = () => {
    return async (dispatch) => {
        try {
            const result = await authRequest.get(`/api/v1/voice/question`)

            if (result.status === 200) {
                return dispatch(getVoiceQuestion(result))
            } else {
                const error = new Error(`에러 상태코드 : ${result.status}`)
                error.response = result;
                throw error;
            }
        }catch (error) {
            const customError = new Error(`에러 상태코드 : ${error.response?.status || "알 수 없는 오류"}`);
            customError.response = error.response;
            throw customError;
        }
    }
}

export const callGetVoiceAnswerCheck = (recordGameVoiceRequest) => {
    return async (dispatch) => {
        const result = await authRequest.post(
            `/api/v1/voice/check`,
            recordGameVoiceRequest
        )
        console.log("callGetVoiceAnswerCheck 응답 결과 : ", result);

        if(result.status === 200) {
            return dispatch(getVoiceAnswerCheck(result))
        } else {
            throw new Error("문제를 가져 오는데 실패 했습니다.");
        }
    }
}

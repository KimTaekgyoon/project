import {authRequest, request} from "./api";
import {statusToastAlert} from "../utils/ToastUtils";
import {checkCorrect, getSoundQuestion, getSoundRecords, isAlreadyCorrect} from "../modules/SoundGameReducer";

export const callCheckCorrectAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.get(
                `/api/v1/challenge/check-correct`
            );

            console.log('callCheckCorrectAPI result : ', result.data);

            if(result.status === 200) {
                dispatch(isAlreadyCorrect(result));
            }

        } catch {
            const title = '문제가 발생했어요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callGetSoundAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request(
                'GET',
                `/api/v1/challenge/game-start`
            );

            console.log('callGetSoundAPI result : ', result.data);

            if(result.status === 200) {
                dispatch(getSoundQuestion(result));
            }

        } catch {
            const title = '문제가 발생했어요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callGetRecordsAPI = (challengeId) => {
    return async (dispatch, getState) => {
        try {
            const queryString = `challengeId=${challengeId}`;

            const result = await authRequest.get(
                `/api/v1/challenge/records?${queryString}`
            );

            console.log('callGetRecordsAPI result : ', result.data);

            if(result.status === 200) {
                dispatch(getSoundRecords(result));
            }

        } catch {
            const title = '문제가 발생했어요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callRegisterAnswerAPI = (answerRequest) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(
                '/api/v1/challenge/result',
                answerRequest
            );

            console.log('callRegisterAnswerAPI result : ', result.data);

            if(result.status === 200) {
                dispatch(checkCorrect(result));
            }

        } catch {
            const title = '문제가 발생했어요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callResetAnswerAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(
                `/api/v1/challenge/reset-answer`
            );

            console.log('callResetAnswerAPI result : ', result);

            if(result.status === 200) {
                console.log('Answer reset successfully');
                // 필요한 경우 여기에 추가적인 디스패치 로직을 넣을 수 있습니다.
            }

        } catch (error) {
            console.error('Failed to reset answer:', error);
            // 에러 처리를 조용히 하고 싶다면 아래 코드는 주석 처리하거나 제거할 수 있습니다.
            const title = '답변 초기화 중 문제가 발생했어요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}
import {authRequest, request} from "./api";
import {getRanks, getTodayMyRanks, getTodayRanks, success} from "../modules/RankReducer";
import {statusToastAlert} from "../utils/ToastUtils";

export const callRanksAPI = () => {
    return async (dispatch, getState) => {

        const result = await request(
            'GET',
            '/ranking'
        );
        console.log('callRanksAPI result : ', result);

        if(result.status === 200) {
            dispatch(getRanks(result));
        }
    }
}

export const callRegisterRankAPI = ({userId, category, score}) => {
    return async (dispatch, getState) => {
        try {
            //console.log("rankRequest: ", rankRequest);
            console.log("값 잘 넘어옴?? userId: ", userId + ", category: ", category + ", score: " + score);
            const result = await authRequest.post(
                `/api/rankings?category=${category}&score=${score}`,
                {'Content-Type' : 'application/json'}
            );
            console.log('callRegisterRankAPI result : ', result);

            if(result.status === 201) {
                const title = '성공적으로 처리되었어요.';
                statusToastAlert(title, null, 'success');
                dispatch(success());
            }
        } catch {
            const title = '문제가 발생했어요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}


export const callTodayRanksAPI = ({limit}) => {
    return async (dispatch, getState) => {
        const result = await request('GET', `/api/rankings/today?limit=${limit}`);
        console.log('callTodayRanksAPI [오늘의 랭킹] result:', result.data);

        if (result.status === 200) {
            dispatch(getTodayRanks(result));
        }
    };
};

export const callTodayMyRanksAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/rankings/myRank`);
        console.log('callTodayMyRanksAPI [오늘 나의 랭킹] result:', result.data);

        if (result.status === 200) {
            dispatch(getTodayMyRanks(result));
        }
    };
};
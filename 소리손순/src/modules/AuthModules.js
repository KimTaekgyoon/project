import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    success: false,
    currentUser: null,
};

/* 액션 타입 */
const RESET = 'auth/RESET';
const SUCCESS = 'auth/SUCCESS';
const GET_USER = 'auth/GET_USER';

/* 액션 함수 */
export const { auth: { reset, success, getUser } } = createActions({
    [RESET]: () => {},
    [SUCCESS]: () => ({ success: true }),
    [GET_USER]: (result) => ({ currentUser: result }),
});

/* 리듀서 함수 */
const authReducer = handleActions({
    [RESET]: () => initialState,
    [SUCCESS]: (state, { payload }) => payload,
    [GET_USER]: (state, { payload }) => payload,
}, initialState);

export default authReducer;

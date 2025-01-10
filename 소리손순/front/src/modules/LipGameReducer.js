import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_VOICE_QUESTION = 'game/GET_VOICE_QUESTION';
const GET_VOICE_ANSWER_CHECK = 'game/GET_VOICE_ANSWER_CHECK';

/* 액션 생성자 */
export const { game: {getVoiceQuestion, getVoiceAnswerCheck}  } = createActions({
    [GET_VOICE_QUESTION]: result => ({ voiceQuestion: result.data.result }),
    [GET_VOICE_ANSWER_CHECK]: result => ({ getVoiceAnswerCheck: result.data.result })
});

/* 리듀서 */
const lipGameReducer = handleActions({
    [GET_VOICE_QUESTION]: (state, { payload }) => payload,
    [GET_VOICE_ANSWER_CHECK]: (state, { payload }) => payload

}, initialState);

export default lipGameReducer;

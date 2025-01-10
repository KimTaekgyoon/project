import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {
    question: '',
    records: [],
    isCorrect: null,
    isAlreadyCorrect: null,
    difficulty: ''
};

/* 액션 */
const GET_SOUND_QUESTION = 'game/GET_SOUND_QUESTION';
const GET_SOUND_RECORDS = 'game/GET_SOUND_RECORDS';
const CHECK_CORRECT = 'game/CHECK_CORRECT';
const RESET_CORRECT = 'game/RESET_CORRECT';
const IS_ALREADY_CORRECT = 'game/IS_ALREADY_CORRECT'

export const { game : {getSoundQuestion, getSoundRecords, checkCorrect, resetCorrect, isAlreadyCorrect}} = createActions({
    [GET_SOUND_QUESTION] : result => ({ sound : result.data }),
    [GET_SOUND_RECORDS] : result => ({ records : result.data }),
    [CHECK_CORRECT] : result => ({ isCorrect : result.data.isCorrect }),
    [RESET_CORRECT] : result => ({ isCorrect : null }),
    [IS_ALREADY_CORRECT] : result => ({ checkPlay : result.data }),
});

/* 리듀서 */
const soundGameReducer = handleActions({
    [GET_SOUND_QUESTION] : (state, {payload}) => ({...state, sound: payload.sound}),
    [GET_SOUND_RECORDS] : (state, {payload}) => ({...state, records: payload.records}),
    [CHECK_CORRECT] : (state, {payload}) => ({...state, isCorrect: payload.isCorrect}),
    [RESET_CORRECT] : (state, {payload}) => ({...state, isCorrect: null}),
    [IS_ALREADY_CORRECT] : (state, {payload}) => ({...state, checkPlay: payload.checkPlay})
}, initialState);

export default soundGameReducer;








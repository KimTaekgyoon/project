import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {
    questionList: [],
    wordImage: null,
    wordVideo: null,
    isCorrect: null,
    currentStep: null,
    totalSteps: null,
    feedback: null
};

/* 액션 */
const GET_WORDS = 'game/GET_WORDS';
const GET_WORD_IMAGE = 'game/GET_WORD_IMAGE';
const GET_WORD_VIDEO = 'game/GET_WORD_VIDEO';
const CHECK_CORRECT = 'game/CHECK_CORRECT';
const RESET_CORRECT = 'game/RESET_CORRECT';
const UPDATE_CORRECT = 'game/UPDATE_CORRECT';
const RESET_ALL = 'game/RESET_ALL';

export const { game : {getWords, getWordImage, getWordVideo, checkCorrect, resetCorrect, updateCorrect, resetAll}} = createActions({
    [GET_WORDS] : result => ({ questionList : result.data }),
    [GET_WORD_IMAGE] : result => ({ wordImage : result.data }),
    [GET_WORD_VIDEO] : result => ({ wordVideo : result.data }),
    [CHECK_CORRECT] : result => ({
        isCorrect: result.data.is_correct,
        currentStep: result.data.current_step,
        totalSteps: result.data.total_steps,
        feedback: result.data.feedback
    }),
    [RESET_CORRECT] : () => ({ isCorrect: null, currentStep: null, totalSteps: null, feedback: null }),
    [UPDATE_CORRECT] : (index, isCorrect) => ({ index, isCorrect }),
    [RESET_ALL]: () => initialState,
});

/* 리듀서 */
const handGameReducer = handleActions({
    [GET_WORDS] : (state, {payload}) => ({...state, questionList: payload.questionList}),
    [GET_WORD_IMAGE] : (state, {payload}) => ({...state, wordImage: payload.wordImage}),
    [GET_WORD_VIDEO] : (state, {payload}) => ({...state, wordVideo: payload.wordVideo}),
    [CHECK_CORRECT] : (state, {payload}) => ({
        ...state,
        isCorrect: payload.isCorrect,
        currentStep: payload.currentStep,
        totalSteps: payload.totalSteps,
        feedback: payload.feedback
    }),
    [RESET_CORRECT] : (state, {payload}) => ({
        ...state,
        isCorrect: null,
        currentStep: null,
        totalSteps: null,
        feedback: null
    }),
    [UPDATE_CORRECT] : (state, {payload}) => ({
        ...state,
        questionList: state.questionList.map((item, index) =>
            index === payload.index
                ? { ...item, isCorrect: payload.isCorrect }
                : item
        )
    }),
    [RESET_ALL]: () => initialState,
}, initialState);

export default handGameReducer;
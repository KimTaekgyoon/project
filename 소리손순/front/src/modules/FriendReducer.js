import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_FRIENDS = 'friend/GET_FRIENDS';
const GET_FRIEND_APPLIES = 'friend/GET_FRIEND_APPLIES';
const SUCCESS = 'friend/SUCCESS';

export const { friend : {getFriends, getFriendApplies, success}} = createActions({
    [GET_FRIENDS] : result => ({ friends : result.data }),
    [GET_FRIEND_APPLIES] : result => ({ friendApplies : result.data }),
    [SUCCESS] : () => ({success : true})
});

/* 리듀서 */
const friendReducer = handleActions({
    [GET_FRIENDS] : (state, {payload}) => payload,
    [GET_FRIEND_APPLIES] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload
}, initialState);

export default friendReducer;
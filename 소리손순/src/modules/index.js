import {combineReducers} from "redux";
import handGameReducer from "./HandGameReducer";
import rankReducer from "./RankReducer";
import soundGameReducer from "./SoundGameReducer";
import lipGameReducer from "./LipGameReducer";
import friendReducer from "./FriendReducer";
import authReducer from "./AuthModules";

const rootReducer = combineReducers({
    authReducer, handGameReducer, soundGameReducer, rankReducer, lipGameReducer, friendReducer
});

export default rootReducer;
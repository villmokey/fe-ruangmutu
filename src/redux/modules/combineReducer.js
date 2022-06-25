import { combineReducers } from "redux";
import { authReducer } from '../modules/auth/reducer';
import { fileReducer } from "./file/reducer";
import { profileQualityIndicatorReducer } from "./profileQualityIndicator/reducer";
import { programReducer } from "./program/reducer";
import { qualityIndicatorReducer } from "./qualityIndicator/reducer";
import { subProgramReducer } from "./subProgram/reducer";
import { userReducer } from "./user/reducer";

const reducers = combineReducers({
  auth: authReducer,
  program: programReducer,
  subProgram: subProgramReducer,
  file: fileReducer,
  user: userReducer,
  profileQualityIndicator: profileQualityIndicatorReducer,
  qualityIndicator: qualityIndicatorReducer
});

export default reducers;


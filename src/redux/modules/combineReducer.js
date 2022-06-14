import { combineReducers } from "redux";
import { authReducer } from '../modules/auth/reducer';
import { fileReducer } from "./file/reducer";
import { programReducer } from "./program/reducer";
import { subProgramReducer } from "./subProgram/reducer";

const reducers = combineReducers({
  auth: authReducer,
  program: programReducer,
  subProgram: subProgramReducer,
  file: fileReducer
});

export default reducers;


import { combineReducers } from "redux";
import { authReducer } from '../modules/auth/reducer';
import { programReducer } from "./program/reducer";

const reducers = combineReducers({
  auth: authReducer,
  program: programReducer
});

export default reducers;


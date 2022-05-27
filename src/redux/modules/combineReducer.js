import { combineReducers } from "redux";
import { authReducer } from '../modules/auth/reducer';

const reducers = combineReducers({
  auth: authReducer
});

export default reducers;


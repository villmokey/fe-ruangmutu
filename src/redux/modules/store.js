import { applyMiddleware, legacy_createStore as createStore } from 'redux';  
import reducers from "./combineReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { api } from '../middleware/api';

const composedEnhancer = composeWithDevTools(applyMiddleware(api));

export const store = createStore(
  reducers,
  composedEnhancer
)
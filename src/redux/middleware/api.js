import axios from 'axios';
import { URL_CONFIG } from '../../globals/urlConfig';

export const api = ({ dispatch, getState }) => (next) => {
  
  return (action) => {

    if (action.type !== 'API') return next(action);
    const { startNetwork, endNetwork, success, error } = action;
    const { url, requestParams } = action.payload;

    if (startNetwork) {
      dispatch(startNetwork());
    }

    return axios.request({
      baseURL: URL_CONFIG.BASE_URL,
      url, 
      ...requestParams 
    })
    .then(res => {
      (URL_CONFIG.ENV === 'development') && console.log(res);
        
      if (success) {
        dispatch(success(res.data, res));
      }

      if (endNetwork) {
        dispatch(endNetwork());
      }
      
    })
    .catch(err => {
      (URL_CONFIG.ENV === 'development') && console.log('Err: ' + err);
      if (error) {
        dispatch(error(err.response));
      }
    })
  }
}
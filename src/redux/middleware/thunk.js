import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_CONFIG } from "../../globals/urlConfig";

export const fetchAPI = ({
  action,
  url,
  method,
  param,
  accessToken
}) => {
  createAsyncThunk(action, async(param) => {
    try {
      const response = await axios({
        url: `${URL_CONFIG.BASE_URL}${url}`,
        method,
        data: param,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response;
    } catch (error) {
      return error.message;
    }
  })
}
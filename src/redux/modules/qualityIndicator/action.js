import { apiMethod } from "../../../globals/apiMethod";
import { URL_CONFIG } from "../../../globals/urlConfig";
import { convertToParams } from "../../../globals/fetchApi";

export const qualityIndicatorActionType = {
  FETCHING: "qualityIndicator/FETCH_PROCESS",
  ERROR: "qualityIndicator/FETCHING_ERROR",
  SET_ALL_QUALITY_INDICATOR: "qualityIndicator/SET_ALL_QUALITY_INDICATOR",
  SET_ALL_APPROVAL_QUALITY_INDICATOR:
    "qualityIndicator/SET_ALL_APPROVAL_QUALITY_INDICATOR",
  SET_SINGLE_QUALITY_INDICATOR: "qualityIndicator/SET_SINGLE_QUALITY_INDICATOR",
  CREATE_QUALITY_INDICATOR: "qualityIndicator/CREATE_QUALITY_INDICATOR",
  UPDATE_STATUS_QUALITY_INDICATOR:
    "qualityIndicator/UPDATE_STATUS_QUALITY_INDICATOR",
  SET_FILE: "qualityIndicator/UPLOAD_FILE",
};

const fetchDataProcess = (value) => {
  return {
    type: qualityIndicatorActionType.FETCHING,
    payload: {
      loading: value,
    },
  };
};

const fetchDataError = (value) => {
  return {
    type: qualityIndicatorActionType.ERROR,
    payload: {
      error: value,
      loading: value,
    },
  };
};

const setAllQualityIndicator = (data, total) => {
  return {
    type: qualityIndicatorActionType.SET_ALL_QUALITY_INDICATOR,
    payload: { data },
  };
};

const setSingleQualityIndicator = (data) => {
  return {
    type: qualityIndicatorActionType.SET_SINGLE_QUALITY_INDICATOR,
    payload: data,
  };
};

const setAddQualityIndicator = (response) => {
  return {
    type: qualityIndicatorActionType.CREATE_QUALITY_INDICATOR,
    payload: { response },
  };
};

const setUpdateStatusQualityIndicator = (response) => {
  return {
    type: qualityIndicatorActionType.UPDATE_STATUS_QUALITY_INDICATOR,
    payload: { response },
  };
};

const setFile = (data) => {
  return {
    type: qualityIndicatorActionType.SET_FILE,
    payload: {
      successUpload: true,
      upload: data,
    },
  };
};

const setAllApprovalQualityIndicator = (data, total) => {
  return {
    type: qualityIndicatorActionType.SET_ALL_APPROVAL_QUALITY_INDICATOR,
    payload: { data },
  };
};

export const getAllQualityIndicator = (bodyData) => {
  return {
    type: "API",
    payload: {
      url: `${URL_CONFIG.DASHBOARD_QUALITY_INDICATOR}${
        bodyData.filter ? `` : ""
      }?year=${
        bodyData.filter && bodyData.filter.year ? bodyData.filter.year : ""
      }&type=${
        bodyData.filter && bodyData.filter.type ? bodyData.filter.type : ""
      }&program_id=${
        bodyData.filter && bodyData.filter.program_id
          ? bodyData.filter.program_id
          : ""
      }&page=${
        bodyData.filter && bodyData.filter.page
          ? bodyData.filter.page
          : 1
      }&per_page=${
        bodyData.filter && bodyData.filter.per_page
          ? bodyData.filter.per_page
          : 20
      }&search=${
        bodyData.filter && bodyData.filter.search
          ? bodyData.filter.search
          : ""}`,
      requestParams: {
        method: apiMethod.GET,
        data: bodyData?.param ?? {},
        headers: {
          Authorization: "Bearer " + bodyData?.accessToken,
          "Content-Type": "application/json",
        },
      },
    },
    startNetwork: () => {
      return fetchDataProcess(true);
    },
    endNetwork: () => {
      return fetchDataProcess(false);
    },
    success: (data, response) => {
      return setAllQualityIndicator(data);
    },
    error: (err) => {
      const error = err.errorCode ? err.errorCode : err.message;
      return fetchDataError(error);
    },
  };
};

export const getSingleQualityIndicator = (id, bodyData) => {
  return {
    type: "API",
    payload: {
      url: URL_CONFIG.QUALITY_INDICATOR_BASE_URL + id,
      requestParams: {
        method: apiMethod.GET,
        data: bodyData.param ?? {},
        headers: {
          Authorization: "Bearer " + bodyData.accessToken,
          "Content-Type": "application/json",
        },
      },
    },
    startNetwork: () => {
      return fetchDataProcess(true);
    },
    endNetwork: () => {
      return fetchDataProcess(false);
    },
    success: (data, response) => {
      return setSingleQualityIndicator(data);
    },
    error: (err) => {
      const error = err.errorCode ? err.errorCode : err.message;
      return fetchDataError(error);
    },
  };
};

export const addQualityIndicator = (bodyData) => {
  return {
    type: "API",
    payload: {
      url: URL_CONFIG.QUALITY_INDICATOR_BASE_URL,
      requestParams: {
        method: apiMethod.POST,
        data: bodyData.param ?? {},
        headers: {
          Authorization: "Bearer " + bodyData.accessToken,
          "Content-Type": "application/json",
        },
      },
    },
    startNetwork: () => {
      return fetchDataProcess(true);
    },
    endNetwork: () => {
      return fetchDataProcess(false);
    },
    success: (data, response) => {
      return setAddQualityIndicator(data);
    },
    error: (err) => {
      console.log('ERR', err)
      const error = err.data ?? err;
      return fetchDataError(error);
    },
  };
};

export const uploadFileAPIQualityIndicator = async (bodyData) => {
  return {
    type: "API",
    payload: {
      url: `${URL_CONFIG.UPLOAD_FILE_URL}`,
      requestParams: {
        method: apiMethod.POST,
        data: bodyData?.param ?? {},
        headers: {
          Authorization: "Bearer " + bodyData?.accessToken,
          "Content-Type": "application/json",
        },
      },
    },
    startNetwork: () => {
      return fetchDataProcess(true);
    },
    endNetwork: () => {
      return fetchDataProcess(false);
    },
    success: (data, response) => {
      return setFile(data);
    },
    error: (err) => {
      const error = err.errorCode ? err.errorCode : err.message;
      return fetchDataError(error);
    },
  };
};

export const getAllApprovalQualityIndicator = (userID, bodyData) => {
  return {
    type: "API",
    payload: {
      url: `${URL_CONFIG.QUALITY_INDICATOR_BASE_URL}/${userID}/signature${
        bodyData?.param ? "?" + convertToParams(bodyData.param) : ""
      }`,
      requestParams: {
        method: apiMethod.GET,
        data: {},
        headers: {
          Authorization: "Bearer " + bodyData?.accessToken,
          "Content-Type": "application/json",
        },
      },
    },
    startNetwork: () => {
      return fetchDataProcess(true);
    },
    endNetwork: () => {
      return fetchDataProcess(false);
    },
    success: (data, response) => {
      return setAllApprovalQualityIndicator(data);
    },
    error: (err) => {
      const error = err.errorCode ? err.errorCode : err.message;
      return fetchDataError(error);
    },
  };
};

export const updateStatusQualityIndicator = async (id, bodyData) => {
  return {
    type: "API",
    payload: {
      url: `${URL_CONFIG.QUALITY_INDICATOR_BASE_URL}/${id}/status`,
      requestParams: {
        method: apiMethod.POST,
        data: bodyData.param ?? {},
        headers: {
          Authorization: "Bearer " + bodyData.accessToken,
          "Content-Type": "application/json",
        },
      },
    },
    startNetwork: () => {
      return fetchDataProcess(true);
    },
    endNetwork: () => {
      return fetchDataProcess(false);
    },
    success: (data, response) => {
      return setUpdateStatusQualityIndicator(data);
    },
    error: (err) => {
      const error = err.errorCode ? err.errorCode : err.message;
      return fetchDataError(error);
    },
  };
};

export const qualityIndicatorSelector = ({ qualityIndicator }) => {
  return {
    loading: qualityIndicator.loading,
    error: qualityIndicator.error,
    called: qualityIndicator.called,
    success: qualityIndicator.success,
    data: {
      ...qualityIndicator.data,
    },
  };
};

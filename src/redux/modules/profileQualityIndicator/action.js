import { apiMethod } from "../../../globals/apiMethod";
import { URL_CONFIG } from "../../../globals/urlConfig";

export const profileQualityIndicatorActionType = {
	FETCHING: "profileQualityIndicator/FETCH_PROCESS",
	ERROR: "profileQualityIndicator/FETCHING_ERROR",
	SET_ALL_PROFILE_QUALITY_INDICATOR: "profileQualityIndicator/SET_ALL_PROFILE_QUALITY_INDICATOR",
	SET_SINGLE_PROFILE_QUALITY_INDICATOR: "profileQualityIndicator/SET_SINGLE_PROFILE_QUALITY_INDICATOR",
	CREATE_PROFILE_QUALITY_INDICATOR: "profileQualityIndicator/CREATE_PROFILE_QUALITY_INDICATOR",
	UPDATE_PROFILE_QUALITY_INDICATOR: "profileQualityIndicator/EDIT_PROFILE_QUALITY_INDICATOR",
	SET_FILE: "profileQualityIndicator/UPLOAD_FILE",
};


const fetchDataProcess = (value) => {
	return {
		type: profileQualityIndicatorActionType.FETCHING,
		payload: {
			loading: value
		}
	}
}
  
const fetchDataError = (value) => {
	return {
		type: profileQualityIndicatorActionType.ERROR,
		payload: {
			error: value,
			loading: value
		}
	}
}

const setAllProfileQualityIndicator = (data, total) => {
	return {
		type: profileQualityIndicatorActionType.SET_ALL_PROFILE_QUALITY_INDICATOR,
		payload: data
	}
}

const setSingleProfileQualityIndicator = (data) => {
	return {
		type: profileQualityIndicatorActionType.SET_SINGLE_PROFILE_QUALITY_INDICATOR,
		payload: data
	}
}

const setAddProfileQualityIndicator = (response) => {
	return {
		type: profileQualityIndicatorActionType.CREATE_PROFILE_QUALITY_INDICATOR,
		payload: { response },  
	}
};

const setFile = (data) => {
	return {
		type: profileQualityIndicatorActionType.SET_FILE,
		payload: {
			successUpload: true,
			upload: data
		}
	}
}


export const getAllProfileQualityIndicator = (bodyData) => {
	return {
		type: 'API',
		payload: {
			url: `${URL_CONFIG.PROFILE_QUALITY_INDICATOR_BASE_URL}?paginate=false`,
			requestParams: {
				method: apiMethod.GET,
				data: bodyData?.param ?? {},
				headers: {
          'Authorization': 'Bearer ' + bodyData?.accessToken,
					'Content-Type': 'application/json'
				}
			},
		},
		startNetwork: () => {
			return fetchDataProcess(true);
		},
		endNetwork: () => {
			return fetchDataProcess(false);
		},
		success: (data, response) => {
			return setAllProfileQualityIndicator(data);
		},
		error: (err) => {
			const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(error);
		},
	}
}

export const getSingleProfileQualityIndicator = (id, bodyData) => {
	return {
		type: 'API',
		payload: {
			url: URL_CONFIG.PROFILE_QUALITY_INDICATOR_BASE_URL + id,
			requestParams: {
				method: apiMethod.GET,
				data: bodyData.param ?? {},
				headers: {
          'Authorization': 'Bearer ' + bodyData.accessToken,
					'Content-Type': 'application/json'
				}
			}
		},
		startNetwork: () => {
			return fetchDataProcess(true);
		},
		endNetwork: () => {
			return fetchDataProcess(false);
		},
		success: (data, response) => {
			return setSingleProfileQualityIndicator(data);
		},
		error: (err) => {
			const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(error);
		}
	}
}

export const addProfileQualityIndicator = (bodyData) => {
	return {
		type: 'API',
		payload: {
			url: URL_CONFIG.PROFILE_QUALITY_INDICATOR_BASE_URL,
			requestParams: {
				method: apiMethod.POST,
				data: bodyData.param ?? {},
				headers: {
          'Authorization': 'Bearer ' + bodyData.accessToken,
					'Content-Type': 'application/json'
				}
			}
		},
		startNetwork: () => {
			return fetchDataProcess(true);
		},
		endNetwork: () => {
			return fetchDataProcess(false);
		},
		success: (data, response) => {
			return setAddProfileQualityIndicator(data);
		},
		error: (err) => {
			const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(error);
		}
	}
}

export const uploadFileAPIProfileQualityIndicator = (bodyData) => {
	return {
		type: 'API',
		payload: {
			url: `${URL_CONFIG.UPLOAD_FILE_URL}`,
			requestParams: {
				method: apiMethod.POST,
				data: bodyData?.param ?? {},
				headers: {
          'Authorization': 'Bearer ' + bodyData?.accessToken,
					'Content-Type': 'application/json'
				}
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
	}
}


export const profileQualityIndicatorSelector = ({ profileQualityIndicator }) => {
	return {
		loading: profileQualityIndicator.loading,
		error: profileQualityIndicator.error,
		called: profileQualityIndicator.called,
		success: profileQualityIndicator.success,
		data: {
			...profileQualityIndicator.data
		},
	}
};
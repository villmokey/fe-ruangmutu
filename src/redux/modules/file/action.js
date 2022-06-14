import { apiMethod } from "../../../globals/apiMethod";
import { URL_CONFIG } from "../../../globals/urlConfig";

export const fileActionType = {
	FETCHING: "file/FETCH_PROCESS",
	ERROR: "file/FETCHING_ERROR",
	SET_FILE: "file/SET_FILE",
	UPLOAD_FILE: "file/UPLOAD_FILE",
};


const fetchDataProcess = (value) => {
    return {
      type: fileActionType.FETCHING,
      payload: {
        loading: value
      }
    }
  }
  
const fetchDataError = (value) => {
	return {
		type: fileActionType.ERROR,
		payload: {
			error: value,
			loading: value
		}
	}
}

const setFile = (data, total) => {
	return {
		type: fileActionType.SET_FILE,
		payload: data
	}
}

export const uploadFileAPI = (bodyData) => {
	return {
		type: 'API',
		payload: {
			url: `${URL_CONFIG.UPLOAD_FILE_URL}`,
			requestParams: {
				method: apiMethod.POST,
				data: bodyData?.param ?? {},
				headers: {
          // 'Authorization': 'Bearer ' + bodyData?.accessToken,
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

export const fileSelector = ({ file }) => {
	return {
		loading: file.loading,
		error: file.error,
		called: file.called,
		success: {
			...file.success
		},
		data: {
			...file.data
		},
	}
};
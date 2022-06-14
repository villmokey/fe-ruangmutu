import { apiMethod } from "../../../globals/apiMethod";
import { URL_CONFIG } from "../../../globals/urlConfig";

export const subProgramActionType = {
	FETCHING: "subProgram/FETCH_PROCESS",
	ERROR: "subProgram/FETCHING_ERROR",
	SET_ALL_SUB_PROGRAM: "subProgram/SET_ALL_SUB_PROGRAM",
	SET_SINGLE_SUB_PROGRAM: "subProgram/SET_SINGLE_SUB_PROGRAM",
	CREATE_SUB_PROGRAM: "subProgram/ADD_SUB_PROGRAM",
	UPDATE_SUB_PROGRAM: "subProgram/EDIT_SUB_PROGRAM",
	DELETE_SUB_PROGRAM: "subProgram/DELETE_SUB_PROGRAM"
};


const fetchDataProcess = (value) => {
    return {
      type: subProgramActionType.FETCHING,
      payload: {
        loading: value
      }
    }
  }
  
const fetchDataError = (value) => {
	return {
		type: subProgramActionType.ERROR,
		payload: {
			error: value,
			loading: value
		}
	}
}

const setAllSubProgram = (data, total) => {
	return {
		type: subProgramActionType.SET_ALL_SUB_PROGRAM,
		payload: data
	}
}

const setSingleSubProgram = (data) => {
	return {
		type: subProgramActionType.SET_SINGLE_SUB_PROGRAM,
		payload: data
	}
}

export const getAllSubProgram = (bodyData) => {
	return {
		type: 'API',
		payload: {
			url: `${URL_CONFIG.SUB_PROGRAM_BASE_URL}`,
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
			return setAllSubProgram(data);
		},
		error: (err) => {
			const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(error);
		},
	}
}

export const getSingleSubProgram = (id, bodyData) => {
	return {
		type: 'API',
		payload: {
			url: URL_CONFIG.SUB_PROGRAM_BASE_URL + id,
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
			return setSingleSubProgram(data);
		},
		error: (err) => {
			const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(error);
		}
	}
}


export const subProgramSelector = ({ subProgram }) => {
	return {
		loading: subProgram.loading,
		error: subProgram.error,
		called: subProgram.called,
		success: {
			...subProgram.success
		},
		data: {
			...subProgram.data
		},
	}
};
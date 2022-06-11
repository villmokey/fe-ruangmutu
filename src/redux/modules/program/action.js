import { apiMethod } from "../../../globals/apiMethod";
import { URL_CONFIG } from "../../../globals/urlConfig";

export const programActionType = {
	FETCHING: "program/FETCH_PROCESS",
	ERROR: "program/FETCHING_ERROR",
	SET_ALL_PROGRAM: "program/SET_ALL_PROGRAM",
	SET_SINGLE_PROGRAM: "program/SET_SINGLE_PROGRAM",
	CREATE_PROGRAM: "program/ADD_PROGRAM",
	UPDATE_PROGRAM: "program/EDIT_PROGRAM",
	DELETE_PROGRAM: "program/DELETE_PROGRAM",
	SUCCESS_CHANGE_PASSWORD: 'program/SUCCESS_CHANGE_PASSWORD'
};


const fetchDataProcess = (value) => {
    return {
      type: programActionType.FETCHING,
      payload: {
        loading: value
      }
    }
  }
  
const fetchDataError = (value) => {
	return {
		type: programActionType.ERROR,
		payload: {
			error: value,
			loading: value
		}
	}
}

const setAllProgram = (data, total) => {
	return {
		type: programActionType.SET_ALL_PROGRAM,
		payload: data
	}
}

const setSingleProgram = (data) => {
	return {
		type: programActionType.SET_SINGLE_PROGRAM,
		payload: data
	}
}

export const getAllProgram = (bodyData) => {
	return {
		type: 'API',
		payload: {
			url: `${URL_CONFIG.PROGRAM_BASE_URL}`,
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
			return setAllProgram(data);
		},
		error: (err) => {
			const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(error);
		},
	}
}

export const getSingleProgram = (id, bodyData) => {
	return {
		type: 'API',
		payload: {
			url: URL_CONFIG.PROGRAM_BASE_URL + id,
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
			return setSingleProgram(data);
		},
		error: (err) => {
			const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(error);
		}
	}
}


export const programSelector = ({ program }) => {
	return {
		loading: program.loading,
		error: program.error,
		called: program.called,
		success: {
			...program.success
		},
		data: {
			...program.data
		},
	}
};
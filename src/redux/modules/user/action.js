import { apiMethod } from "../../../globals/apiMethod";
import { URL_CONFIG } from "../../../globals/urlConfig";

export const userActionType = {
	FETCHING: "user/FETCH_PROCESS",
	ERROR: "user/FETCHING_ERROR",
	SET_ALL_USER: "user/SET_ALL_USER",
	SET_SINGLE_USER: "user/SET_SINGLE_USER",
	CREATE_USER: "user/ADD_USER",
	UPDATE_USER: "user/EDIT_USER",
	DELETE_USER: "user/DELETE_USER",
	SUCCESS_CHANGE_PASSWORD: 'user/SUCCESS_CHANGE_PASSWORD'
};


const fetchDataProcess = (value) => {
    return {
      type: userActionType.FETCHING,
      payload: {
        loading: value
      }
    }
  }
  
const fetchDataError = (value) => {
	return {
		type: userActionType.ERROR,
		payload: {
			error: value,
			loading: value
		}
	}
}

const setAllUser = (data, total) => {
	return {
		type: userActionType.SET_ALL_USER,
		payload: data
	}
}

const setSingleUser = (data) => {
	return {
		type: userActionType.SET_SINGLE_USER,
		payload: data
	}
}

const setCreateUser = (response) => {
	return {
		type: userActionType.CREATE_USER,
		payload: { response },  
	}
};

const setUpdateUser = (response) => {
	return {
		type: userActionType.UPDATE_USER,
		payload: { response },  
	}
};

const setDeleteUser = (response) => {
	return {
		type: userActionType.DELETE_USER,
		payload: { response },  
	}
};

const successChangePassword = (response) => {
	return {
		type: userActionType.SUCCESS_CHANGE_PASSWORD,
		payload: { response }
	}
}

export const getAllUser = (bodyData) => {
	return {
		type: 'API',
		payload: {
			url: `${URL_CONFIG.USER_BASE_URL}?pagination=false`,
			requestParams: {
				method: apiMethod.GET,
				// data: bodyData.param ?? {},
				headers: {
          // 'Authorization': 'Bearer ' + bodyData.accessToken,
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
			return setAllUser(data);
		},
		error: (err) => {
			const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(error);
		},
	}
}

export const getSingleUser = (id, bodyData) => {
	return {
		type: 'API',
		payload: {
			url: URL_CONFIG.USER_BASE_URL + id,
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
			return setSingleUser(data);
		},
		error: (err) => {
			const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(error);
		}
	}
}

export const createUser = (bodyData) => {
	return {
		type: 'API',
		payload: {
			url: URL_CONFIG.USER_BASE_URL,
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
			return setCreateUser(response);
		},
		error: (err) => {
			const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(error);
		},
	}
}

export const updateUser = (id, bodyData) => {
	return {
		type: 'API',
		payload: {
			url: URL_CONFIG.USER_BASE_URL + id,
			requestParams: {
				method: apiMethod.PUT,
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
			return setUpdateUser(response);
		},
		error: (err) => {
			const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(error);
		},
	}
}

export const deleteUser = (id, bodyData) => {
	return {
		type: 'API',
		payload: {
			url: URL_CONFIG.USER_BASE_URL + id,
			requestParams: {
				method: apiMethod.DELETE,
				data: bodyData.param ?? {},
				headers: {
					'Authorization': 'Bearer ' +  bodyData.accessToken,
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
			return setDeleteUser(response);
		},
		error: (err) => {
			const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(error);
		},
	}
}

export const changePassword = (userId, bodyData) => {
	return {
		type: 'API',
		payload: {
			url: URL_CONFIG.USER_CHANGE_PASSWORD + userId,
			requestParams: {
				method: apiMethod.PATCH,
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
			return successChangePassword(response);
		},
		error: (err) => {
			// const error = err.errorCode ? err.errorCode : err.message;
			return fetchDataError(err);
		},
	}
}

export const userSelector = ({ user }) => {
	return {
		loading: user.loading,
		error: user.error,
		called: user.called,
		success: {
			...user.success
		},
		data: {
			...user.data
		},
	}
};
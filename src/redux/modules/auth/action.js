import { apiMethod } from "../../../globals/apiMethod";
import { localStorageKey } from "../../../globals/localStorageKey";
import { URL_CONFIG } from "../../../globals/urlConfig";
import { API } from "../action-types";

export const authActionType = {
	FETCHNG: 'auth/FETCHNG',
	ERROR: 'auth/ERROR',
	SET_LOGIN_SUCCESS: 'auth/SET_LOGIN_SUCCESS',
	VERIFY_CAPTCHA_SUCCESS: 'auth/VERIFY_CAPTCHA_SUCCESS',
	SET_ACCESS_TOKEN: 'auth/SET_ACCESS_TOKEN',
	REMOVE_ACCESS_TOKEN: 'auth/REMOVE_ACCESS_TOKEN',
};

export const removeAccessToken = () => {
	localStorage.removeItem(localStorageKey.ACCESS_TOKEN);
	localStorage.removeItem(localStorageKey.ROLE);
	localStorage.removeItem(localStorageKey.EMAIL);
	localStorage.setItem(localStorageKey.IS_AUTH, false);
	return {
		type: authActionType.REMOVE_ACCESS_TOKEN,
		payload: {
			isAuth: false,
			token: null,
			role: null,
			email: null
		}
	};
};

const setAuthFetching = (isFetching) => ({
	type: authActionType.FETCHNG,
	payload: {
		loading: isFetching,
	},
});

const setAuthError = (data) => ({
	type: authActionType.ERROR,
	payload: data,
});

const verifyCaptchaSuccess = (response) => ({
	type: authActionType.VERIFY_CAPTCHA_SUCCESS,
	payload: { response },
});

const setLoginSuccess = (data, response) => {
	let resultData = data;
	const accessToken = resultData ? resultData[localStorageKey.ACCESS_TOKEN] : null;
	localStorage.setItem(localStorageKey.IS_AUTH, !!accessToken);

	if (!!accessToken) {
		localStorage.setItem(localStorageKey.ACCESS_TOKEN, accessToken);
		localStorage.setItem(localStorageKey.ROLE, resultData.user.role);
		localStorage.setItem(localStorageKey.EMAIL, resultData.user.email);
		localStorage.setItem(localStorageKey.NAME, resultData.user.name);
		localStorage.setItem(localStorageKey.USER_ID, resultData.user.id);
	}

	return {
		type: authActionType.SET_LOGIN_SUCCESS,
		payload: {
			response,
			isAuth: !!accessToken,
			token: accessToken,
			role: resultData.user.role,
			email: resultData.user.email,
			name: resultData.user.name,
			id: resultData.user.id
		},
	}
};

export const loginApi = (params) => {
	return {
		type: API,
		payload: {
			url: URL_CONFIG.LOGIN_URL,
			requestParams: {
				method: apiMethod.POST,
				data: params,
				headers: {
					"Content-Type": "application/json",
				}
			},
		},
		startNetwork: () => {
			return setAuthFetching(true)
		},
		endNetwork: () => {
			return setAuthFetching(false)
		},
		success: (data, response) => {
			return setLoginSuccess(data.data, response);
		},
		error: (err) => {
			return setAuthError(err);
		},
	};
};

export const verifyCaptchaApi = (responseKey) => {
	return {
		type: API,
		payload: {
			url: `${URL_CONFIG.CAPTCHA_URL}?token=${responseKey}`,
			requestParams: {
				method: apiMethod.POST,
			},
			removeRequestId: true,
			startNetwork: () => {
				return setAuthFetching(true)
			},
			endNetwork: () => {
				return setAuthFetching(false)
			},
			success: (_, response) => {
				return verifyCaptchaSuccess(response);
			},
			error: (err) => {
				const error = err.errorCode ? err.errorCode : err.message;
				console.log(error)
				return setAuthError(error);
			},
		},
	};
};

export const authSelector = ({ auth }) => {
	return {
		loading: auth.loading,
		error: auth.error,
		called: auth.called,
		data: auth.token, // Use specific field data to retrieve
		response: auth.response,
		captchaResponse: auth.captchaResponse,
		isAuth: auth.isAuth
	}
};
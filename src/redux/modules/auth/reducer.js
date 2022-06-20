import { authActionType } from "./action";

const initialState = {
	loading: false,
	called: false,
	error: null,
	response: null,
	captchaResponse: null,
	email: null,
	token: null,
	isAuth: false,
	role: null,
	name: ''
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
	case authActionType.FETCHNG:
		state.called = false;
		state.loading = action.payload.loading;
		state.error = action.payload.loading ? state.error : null;
		return { ...state };

	case authActionType.ERROR:
		state.called = (action.payload === null) ? false : true;
		state.error = action.payload;
		state.response = action.payload;
		state.loading = false;
		return { ...state };

	case authActionType.SET_LOGIN_SUCCESS:
		state.called = true;
		state.response = action.payload.response;
		state.token = action.payload.token;
		state.isAuth = action.payload.isAuth;
		state.role = action.payload.role;
		state.email = action.payload.email
		state.name = action.payload.name;
		state.loading = false;
		return { ...state };

	case authActionType.VERIFY_CAPTCHA_SUCCESS:
		state.called = true;
		state.captchaResponse = action.payload.response;
		return { ...state };

	case authActionType.SET_ACCESS_TOKEN:
		state.token = action.payload.token;
		return { ...state };

	case authActionType.REMOVE_ACCESS_TOKEN:
		state.token = action.payload.token;
		state.isAuth = action.payload.isAuth;
		state.role = action.payload.role;
		return { ...state };

	default:
		return state;
	}
};
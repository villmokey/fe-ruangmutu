import { fileActionType } from "./action";

const initialState = {
	loading: false,
	called: false,
	error: null,
	response: null,
	data: {
		upload: null
	}
}

export const fileReducer = (state = initialState, action) => {
	switch (action.type) {
		case fileActionType.FETCHING:
			state.called = false;
			state.loading = action.payload.loading;
			state.error = action.payload.loading ? state.error : null;
			// state.data.single = null
			return { ...state };

		case fileActionType.ERROR:
			state.called = (action.payload === null) ? false : true;
			state.loading = false;
			state.error = action.payload;
			return { ...state };

		case fileActionType.SET_FILE:
			state.called = true;
			state.data.upload = action.payload.data;
			return { ...state };

		default:
			return { ...state };
	}
}
import { userActionType } from "./action";

const initialState = {
	loading: false,
	called: false,
	error: null,
	response: null,
	success: {
		add: false,
		update: false,
		delete: false,
		changePassword: false
	},
	data: {
		list: null,
		single: null,
		total: 0
	}
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case userActionType.FETCHING:
			state.called = false;
			state.loading = action.payload.loading;
			state.error = action.payload.loading ? state.error : null;
			state.data = {
				// list: null,
				single: null,
				// total: null
			}
			state.success = {
				add: false,
				edit: false,
				delete: false,
				changePassword: false
			};
			return { ...state };

		case userActionType.ERROR:
			state.called = (action.payload === null) ? false : true;
			state.loading = false;
			state.error = action.payload;
			return { ...state };

		case userActionType.SET_ALL_USER:
			state.called = true;
			state.data.list = action.payload.data.data;
			state.data.total = parseInt(action.payload.data.total);
			return { ...state };

		case userActionType.SET_SINGLE_USER:
			state.called = true;
			state.data.single = action.payload.data;
			return { ...state };
	
		case userActionType.CREATE_USER:
			state.called = true;
			state.success.add = true;
			return { ...state };

		case userActionType.DELETE_USER:
			state.called = true;
			state.success.delete = true;
			return { ...state };

		case userActionType.UPDATE_USER:
			state.called = true;
			state.success.update = true;
			return { ...state };

		case userActionType.SUCCESS_CHANGE_PASSWORD:
			state.called = true;
			state.success.changePassword = true;
			return { ...state };

		default:
			return { ...state };
	}
}
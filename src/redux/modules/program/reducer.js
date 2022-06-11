import { programActionType } from "./action";

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

export const programReducer = (state = initialState, action) => {
	switch (action.type) {
		case programActionType.FETCHING:
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

		case programActionType.ERROR:
			state.called = (action.payload === null) ? false : true;
			state.loading = false;
			state.error = action.payload;
			return { ...state };

		case programActionType.SET_ALL_PROGRAM:
			console.log(action.payload.data.data);
			state.called = true;
			state.data = {
				list: action.payload.data.data,
				total: parseInt(action.payload.data.total)
			};
			return { ...state };

		case programActionType.SET_SINGLE_PROGRAM:
			state.called = true;
			state.data.single = action.payload.data;
			return { ...state };
	
		case programActionType.CREATE_PROGRAM:
			state.called = true;
			state.success.add = true;
			return { ...state };

		case programActionType.DELETE_PROGRAM:
			state.called = true;
			state.success.delete = true;
			return { ...state };

		case programActionType.UPDATE_PROGRAM:
			state.called = true;
			state.success.update = true;
			return { ...state };

		case programActionType.SUCCESS_CHANGE_PASSWORD:
			state.called = true;
			state.success.changePassword = true;
			return { ...state };

		default:
			return { ...state };
	}
}
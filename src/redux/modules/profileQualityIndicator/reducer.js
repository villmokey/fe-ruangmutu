import { profileQualityIndicatorActionType } from "./action";

const initialState = {
	loading: false,
	called: false,
	error: null,
	response: null,
	data: {
		list: null,
		single: null,
		total: 0
	}
}

export const profileQualityIndicatorReducer = (state = initialState, action) => {
	switch (action.type) {
		case profileQualityIndicatorActionType.FETCHING:
			state.called = false;
			state.loading = action.payload.loading;
			state.error = action.payload.loading ? state.error : null;
			// state.data.single = null
			return { ...state };

		case profileQualityIndicatorActionType.ERROR:
			state.called = (action.payload === null) ? false : true;
			state.loading = false;
			state.error = action.payload;
			return { ...state };

		case profileQualityIndicatorActionType.SET_ALL_PROFILE_QUALITY_INDICATOR:
			state.called = true;
			state.data.list = action.payload.data;
			return { ...state };

		case profileQualityIndicatorActionType.SET_SINGLE_PROFILE_QUALITY_INDICATOR:
			state.called = true;
			state.data.single = action.payload.data;
			return { ...state };
	
		case profileQualityIndicatorActionType.CREATE_PROFILE_QUALITY_INDICATOR:
			state.called = true;
			state.success.add = true;
			return { ...state };

		case profileQualityIndicatorActionType.DELETE_PROFILE_QUALITY_INDICATOR:
			state.called = true;
			state.success.delete = true;
			return { ...state };

		case profileQualityIndicatorActionType.UPDATE_PROFILE_QUALITY_INDICATOR:
			state.called = true;
			state.success.update = true;
			return { ...state };

		case profileQualityIndicatorActionType.SUCCESS_CHANGE_PASSWORD:
			state.called = true;
			state.success.changePassword = true;
			return { ...state };

		default:
			return { ...state };
	}
}
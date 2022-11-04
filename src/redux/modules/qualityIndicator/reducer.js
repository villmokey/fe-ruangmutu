import { qualityIndicatorActionType } from "./action";

const initialState = {
	loading: false,
	called: false,
	error: null,
	response: null,
	data: {
		approvalList: null,
		list: null,
		single: null,
		total: 0,
		upload: null
	},
	success: {
		add: false,
		update: false
	}
}

export const qualityIndicatorReducer = (state = initialState, action) => {
	switch (action.type) {
		case qualityIndicatorActionType.FETCHING:
			state.called = false;
			state.loading = action.payload.loading;
			state.error = action.payload.loading ? state.error : null;
			state.success = {
				add: false,
				update: false
			}
			return { ...state };

		case qualityIndicatorActionType.ERROR:
			state.called = (action.payload === null) ? false : true;
			state.loading = false;
			state.error = action.payload;
			return { ...state };

		case qualityIndicatorActionType.SET_ALL_QUALITY_INDICATOR:
			state.called = true;
			state.data.list = action.payload.data.data;
			return { ...state };

		case qualityIndicatorActionType.SET_ALL_APPROVAL_QUALITY_INDICATOR:
			state.called = true;
			state.data.approvalList = action.payload.data.data;
			return { ...state };

		case qualityIndicatorActionType.SET_SINGLE_QUALITY_INDICATOR:
			state.called = true;
			state.data.single = action.payload.data;
			return { ...state };
	
		case qualityIndicatorActionType.CREATE_QUALITY_INDICATOR:
			state.called = true
			state.success.add = true;
			return { ...state };

		case qualityIndicatorActionType.UPDATE_STATUS_QUALITY_INDICATOR:
			state.called = true;
			state.success.update = true;
			return { ...state };

		case qualityIndicatorActionType.SET_FILE:
			state.called = true;
			state.data.upload = action.payload.upload;
			return { ...state };

		default:
			return { ...state };
	}
}
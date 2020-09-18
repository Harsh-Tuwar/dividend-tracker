import { QUERY_API, RESET_FETCHING_STATE } from '../actions/types';

const initialState = {
	options: {},
	fetchingData: true
}

export default function (state = initialState, action) {
	switch (action.type) {
		case QUERY_API:
			return {
				...state,
				fetchingData: false,
				options: [...action.payload]
			};
		
		case RESET_FETCHING_STATE:
			return {
				...state,
				fetchingData: true
			}
		
		default:
			return state;
	}
}
import { QUERY_API, RESET_FETCHING_STATE, ADD_NEW_HOLDING} from '../actions/types';

const initialState = {
	options: {},
	fetchingData: true,
	myHoldings: []
}

export default function (state = initialState, action) {
	switch (action.type) {
		case QUERY_API:
			return {
				...state,
				fetchingData: false,
				options: action.payload
			};
		
		case RESET_FETCHING_STATE:
			return {
				...state,
				fetchingData: true
			}
		
		case ADD_NEW_HOLDING:
			return {
				...state,
				myHoldings: [...state.myHoldings, action.payload]
			}
		
		default:
			return state;
	}
}
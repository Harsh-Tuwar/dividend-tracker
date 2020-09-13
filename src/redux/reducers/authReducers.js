// const isEmpty = require('is-empty');
import isEmpty from 'is-empty';
import { SET_CURRENT_USER, USER_LOADING, GET_ALL_USERS, UPDATE_USER } from '../actions/types';

const initialState = {
	isAuthenticated: false,
	user: {},
	loading: false,
	updatedData: {}
}

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		
		case USER_LOADING:
			return {
				...state,
				loading: true
			};
		
		case GET_ALL_USERS:
			return {
				...state,
				users: action.payload
			}
		
		case UPDATE_USER:
			return {
				...state,
				updatedData: action.payload
			}
		
		default:
			return state;
	}
}
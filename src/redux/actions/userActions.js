import axios from 'axios';
import { serverURL } from '../../utils/baseURL';
import config from '../../utils/apiKey';
import { GET_ERRORS, QUERY_API, RESET_FETCHING_STATE } from './types';

// Update UserData
export const updateUser = (updatedData, history) => dispatch => {
	axios
		.post(`${serverURL}/user/update`, updatedData)
		.then((res) => {
			localStorage.setItem("user", JSON.stringify(res.data.updatedDetails));
			history.push("/dashboard");
		}).catch((err) => {
			console.error(err);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		});
}

export const queryAPI = (val) => async dispatch => {
	await axios
		// .get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${val}&apikey=${config.apiKEY}`)
		.get('https://jsonplaceholder.typicode.com/posts')
		.then((res) => {
			dispatch({
				type: QUERY_API,
				payload: res.data
			});
		}).catch((err) => {
			console.error(err);
			dispatch({
				type: GET_ERRORS,
				payload: err
			});
		})
		// .finally(() => {
		// 	dispatch({ type: RESET_FETCHING_STATE });
		// });
}
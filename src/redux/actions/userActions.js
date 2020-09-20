import axios from 'axios';
import { serverURL } from '../../utils/baseURL';
import config from '../../utils/apiKey';
import { GET_ERRORS, QUERY_API, RESET_FETCHING_STATE, ADD_NEW_HOLDING } from './types';

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
	// const testData = [];

	// const one = {
	// 	'1. symbol': "SU.TRT",
	// 	'2. name': "Suncor Energy Inc.",
	// 	'3. type': "Equity",
	// 	'4. region': "Toronto",
	// 	'5. marketOpen': "09:30",
	// 	'6. marketClose': "16:00",
	// 	'7. timezone': "UTC-05",
	// 	'8. currency': "CAD",
	// 	'9. matchScore': "1.000",
	// };

	// const two = {
	// 	'1. symbol': "REI-UN.TO",
	// 	'2. name': "RioCan Real Estate Investment Trust",
	// 	'3. type': "Equity",
	// 	'4. region': "Toronto",
	// 	'5. marketOpen': "09:30",
	// 	'6. marketClose': "16:00",
	// 	'7. timezone': "UTC-05",
	// 	'8. currency': "CAD",
	// 	'9. matchScore': "1.000",
	// };

	// testData.push(one);
	// testData.push(two);

	await axios
		.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${val}&apikey=${config.apiKEY}`)
		// .get('https://jsonplaceholder.typicode.com/posts')
		.then((res) => {
			dispatch({
				type: QUERY_API,
				payload: res.data.bestMatches
				// payload: testData
			});
		}).catch((err) => {
			console.error(err);
			dispatch({
				type: GET_ERRORS,
				payload: err
			});
		}).finally(() => {
			dispatch({ type: RESET_FETCHING_STATE });
		});
}

export const addNewHolding = data => dispatch => {
	dispatch({
		type: ADD_NEW_HOLDING,
		payload: data
	});
}
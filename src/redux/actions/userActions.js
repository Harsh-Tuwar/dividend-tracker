import axios from 'axios';
import { serverURL } from '../../utils/baseURL';
import { GET_ERRORS } from './types';

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
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const initialState = {};
const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null;
const middleware = [thunk];

console.log(process.env.NODE_ENV);
const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		devTools,
	)
);

export default store;
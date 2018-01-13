import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
	initialState = initialState || {}
    return createStore(
        rootReducer,
        initialState
    );
}
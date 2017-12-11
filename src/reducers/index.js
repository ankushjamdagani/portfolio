import { combineReducers } from 'redux';

import gridReducer from './grid-reducer';
import componentsReducer from './components-reducer';

export default combineReducers({
	gridReducer,
	combineReducers
});
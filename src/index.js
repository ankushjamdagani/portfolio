import React from 'react';
import ReactDOM from 'react-dom';

import './scss/main.scss';
import App from './app';

import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('app-cover-page')
);
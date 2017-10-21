import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';

import './scss/main.scss';
import App from './app';

const store = configureStore();

ReactDOM.render(
	<App store={store} />, 
	document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import configureStore from './store';

import './scss/main.scss';

import App from './app';

import { Grid } from './components';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Grid rowCount={2} colCount={3} />
	</Provider>, 
	document.getElementById('app-cover-page')
);

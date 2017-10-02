import React from 'react';
import ReactDOM from 'react-dom';

import './scss/main.scss';

import App from './app';
import {CoverPage} from './views';

ReactDOM.render(
	<App/>,
	document.getElementById('window-body')
);


ReactDOM.render(<CoverPage/>, document.getElementById('app-cover-page'));

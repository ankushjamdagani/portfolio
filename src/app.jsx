import React from 'react';

import { Provider } from 'react-redux';
import { LoadingPage, CoverPage } from './views';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = ({store}) => (
	<Provider store={store}>
		<Router>
			<div>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/loading">Loading</Link></li>
				</ul>
				<Route exact path="/" component={CoverPage} />
				<Route path="/loading" component={LoadingPage} />
			</div>
	    </Router>
	</Provider>
)

export default App;

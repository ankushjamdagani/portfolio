import React from 'react';

import { Provider } from 'react-redux';
import { LoadingPage, CoverPage } from './views';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = ({store}) => (
	<Provider store={store}>
		<Router>
			<div>
				{/*<ul className="main-nav">
					<li><Link to="/portfolio/">Home</Link></li>
					<li><Link to="/portfolio/loading">Loading</Link></li>
				</ul>*/}

				{/*
					Yeah this is not exact match for the route. For all routes the CoverPage will be rendered
				*/}
				<Route path="/" component={CoverPage} />
				{/*<Route path="/portfolio/loading" component={LoadingPage} />*/}
			</div>
	    </Router>
	</Provider>
)

export default App;

import React from 'react';

import { Provider } from 'react-redux';
import { LoadingPage, CoverPage } from './views';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = ({store}) => (
	<Provider store={store}>
		<Router>
			<div>
				<ul>
					<li><Link to="/portfolio/">Home</Link></li>
					<li><Link to="/portfolio/loading">Loading</Link></li>
				</ul>
				<Route exact path="/portfolio/" component={CoverPage} />
				<Route path="/portfolio/loading" component={LoadingPage} />
			</div>
	    </Router>
	</Provider>
)

export default App;

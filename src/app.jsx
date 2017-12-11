import React from 'react';

import { Provider } from 'react-redux';
import { 
	LoadingPage, 
	CoverPage, 
	ComponentsPage
} from './views';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = ({store}) => (
	<Provider store={store}>
		<Router>
			<div>
				<ul className="main-nav">
					<li><Link to="/">Home</Link></li>
					<li><Link to="/components">Components</Link></li>
					<li><Link to="/components/loading">Components - Loading</Link></li>
					<li><Link to="/components/loading?s=123">Components - Loading with Query</Link></li>
				</ul>

				{/*
					Yeah this is not exact match for the route. For all routes the CoverPage will be rendered
				*/}
				<Route path="/" exact component={CoverPage} />
				{/*<Route path="/portfolio/loading" component={LoadingPage} />*/}
				<Route path="/components/" component={ComponentsPage} />
			</div>
	    </Router>
	</Provider>
)

export default App;

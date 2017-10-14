import React from 'react';

import { LoadingPage, CoverPage } from './views';

import { Grid } from './components';

class App extends React.Component {

	render() {
		return (
			<div className="app">
				<CoverPage />
				<LoadingPage />
			</div>
		)
	}
}

export default App;

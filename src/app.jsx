import React from 'react';

import { LoadingPage, CoverPage } from './views';

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

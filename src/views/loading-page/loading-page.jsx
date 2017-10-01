import React from 'react';
import PropTypes from 'prop-types';

import { Loader, Timer } from '../../components';

class LoadingPage extends React.Component {

	render() {
		let today = new Date();
		let launchTime = Date.parse('July 1, 2017');

		return (
			<div className="loading-page">
				<Loader />
				<h1 className="heading">Comming Soon !!</h1>
				{/* <Timer to={launchTime} from={today} interval={1000}/> */}
				<div className="footer">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		)
	}
}

export default LoadingPage;

import React from 'react';
import PropTypes from 'prop-types';

class Loader extends React.Component {

	render() {
		return (
			<div className="loader">
				<div className="loader-wrapper">
					<div className="loader-border">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div className="loader-center"></div>
					<div className="loader-center"></div>
					<div className="loader-center"></div>
				</div>
			</div>
		)
	}
}

export default Loader;
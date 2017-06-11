import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tdays: 0, 
			thours: 0, 
			tminutes: 0, 
			tseconds: 0
		}
	}

	componentWillMount() {
		let intervalTime = this.props.interval;

		let toDate = this.props.to ? this.props.to : Date.parse('July 1, 2017');
		let fromDate = this.props.from ? this.props.from : (new Date());

		let time = toDate - fromDate;

		let tdays = (time/(24*60*60*1000)),
			thours = (time/(60*60*1000)),
			tminutes = (time/(60*1000)),
			tseconds = (time/(1000));


		this.interval = setInterval(() => {
			tdays = Math.abs(tdays - intervalTime/(24*60*60*1000));
			thours = Math.abs(thours - intervalTime/(60*60*1000));
			tminutes = Math.abs(tminutes - intervalTime/(60*1000));
			tseconds = Math.abs(tseconds - intervalTime/1000);

			this.setState({
				tdays, 
				thours, 
				tminutes, 
				tseconds
			});

		}, intervalTime);
	}

	componentWillUnMount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div className="timer">
				<div>
					<span className="time">{Math.floor(this.state.tdays)}</span>
					<span className="time-label">days</span>
				</div>
				<div>
					<span className="time">{Math.floor(this.state.thours % 24)}</span>
					<span className="time-label">hours</span>
				</div>
				<div>
					<span className="time">{Math.floor(this.state.tminutes % 60)}</span>
					<span className="time-label">minutes</span>
				</div>
				<div>
					<span className="time">{Math.floor(this.state.tseconds % 60)}</span>
					<span className="time-label">seconds</span>
				</div>
			</div>
		);
	}
}

Timer.PropTypes =  {
	from: PropTypes.instanceOf(Date),
	to: PropTypes.instanceOf(Date),
	interval: PropTypes.number
}

export default Timer;
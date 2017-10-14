import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';
import { GridCell } from '../../components';

const GridRow = ({data, rowIndex}) => {

	const move = (isUp) => {
		const action = {
			type: 'ROW_MOVE',
			payload: {
				isUp: isUp,
				currentIndex: rowIndex
			}
		}
	}

	return (
		<div className="grid-row">
			{ data.map((item, i) => <GridCell data={item} colIndex={i} rowIndex={rowIndex} key={i} />) }
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return dispatch;
}

export default connect(
	mapDispatchToProps
)(GridRow);
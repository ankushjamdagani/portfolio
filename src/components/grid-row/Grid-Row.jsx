import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { GridCell } from '../../components';
import { rowMove, rowAdd } from '../../actions';

const GridRow = ({data, rowIndex, rowMove, rowAdd}) => {
	return (
		<div className="grid-row">
			<div className="grid-content">
				{ 
					data.map((item, i) => <GridCell data={item} colIndex={i} rowIndex={rowIndex} key={i} />) 
				}
			</div>
			<div className="grid-controls">
				<button onClick={() => rowMove(true)}>Move Up</button>
				<button onClick={() => rowMove(false)}>Move Down</button>
				<button onClick={() => rowAdd(true)}>Add Row Above</button>
				<button onClick={() => rowAdd(false)}>Add Row Below</button>
			</div>
		</div>
	)
}


const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		rowAdd: (isAbove) => dispatch(rowAdd(isAbove, ownProps.rowIndex)),
		rowMove: (isUp) => dispatch(rowMove(isUp, ownProps.rowIndex))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GridRow);
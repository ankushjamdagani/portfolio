import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { GridCell } from '../../components';
import { rowMove, rowAdd, rowRemove } from '../../actions';

const GridRow = ({data, rowIndex, rowAdd, rowMove, rowRemove}) => {
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
				<button onClick={() => rowRemove()}>X</button>
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
		rowAdd: (isUp) => dispatch(rowAdd(isUp, ownProps.rowIndex)),
		rowMove: (isUp) => dispatch(rowMove(isUp, ownProps.rowIndex)),
		rowRemove: () => dispatch(rowRemove(ownProps.rowIndex))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GridRow);
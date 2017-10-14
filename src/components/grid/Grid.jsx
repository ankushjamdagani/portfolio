import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { GridRow } from './components';
import { generateGrid } from '../../actions';

const Grid = ({data, colCount, rowCount, generateGrid}) => {
	if(!data) {
		generateGrid(rowCount, colCount);
		
		return <div className="loading-circle">
			Loading.....
		</div>;
	}

	return (
		<div className="component-grid">
			{ 
				data.map((dataItem, i) => <GridRow data={dataItem} key={i} rowIndex={i} />)
			}
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	console.log('state :: ', state.grid);
	console.log('ownProps :: ', ownProps);

	return {
		data: state.grid && state.grid.data ? state.grid.data : null,
		...ownProps
	};
}

const mapDispatchToProps = dispatch => {
	return {
		generateGrid: (x, y) => dispatch(generateGrid(x,y))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);
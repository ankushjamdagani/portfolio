import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { GridRow } from './components';

const Grid = ({data}) => {
	return (
		<div className="component-grid">
			{ 
				data.map((dataItem, i) => <GridRow data={dataItem} key={i} rowIndex={i} />)
			}
		</div>
	)
}

const mapStateToProps = state => {
	console.log(state);
	return state.grid;
}

const mapDispatchToProps = dispatch => {
	return dispatch
}

export default connect(
	mapStateToProps
)(Grid);
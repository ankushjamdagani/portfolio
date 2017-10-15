import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { GridRow } from '../../components';
import { csvGeneratedGrid, generateGrid } from '../../actions';

const Grid = ({data, colCount, rowCount, generateGrid, csvGeneratedGrid}) => {
	if(!data) {
		generateGrid(rowCount, colCount);
		
		return <div>
			Loading.....
		</div>;
	}

	const saveToCSV = () => {
		const csv = data.map(item => item.join(',')).join('\n');

		// TODO: Save to memory Bitch!!!!
		console.log(csv);
	}

	const loadFromCSV = () => {
		// TODO: Come-on Bitch... not again!!!! Load from memory
		const loadedCSV = '1,2,3\na,s,d';

		csvGeneratedGrid(loadedCSV);
	}

	return (
		<div className="component-grid">
			<button onClick={saveToCSV}>Save</button>
			<button onClick={loadFromCSV}>Load</button>
			{ 
				data.map((dataItem, i) => <GridRow data={dataItem} key={i} rowIndex={i} />)
			}
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	// console.log('state :: ', state.grid);
	// console.log('ownProps :: ', ownProps);

	return {
		data: state.grid && state.grid.data ? state.grid.data : null,
		...ownProps
	};
}

const mapDispatchToProps = dispatch => {
	return {
		generateGrid: (x, y) => dispatch(generateGrid(x,y)),
		csvGeneratedGrid: (csv) => dispatch(csvGeneratedGrid(csv))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);
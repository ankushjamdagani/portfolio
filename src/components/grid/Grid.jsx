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

	let _formulaInput = null;

	const saveToCSV = () => {
		const csv = data.map(item => item.join(',')).join('\n');

		// TODO: Save to memory Bitch!!!!
		localStorage.setItem('csv', csv);
	}

	const loadFromCSV = () => {
		// TODO: Come-on Bitch... not again!!!! Load from memory
		const loadedCSV = localStorage.getItem('csv');

		csvGeneratedGrid(loadedCSV);
	}

	const calculateFormula = () => {
		let inputValue = _formulaInput.value.trim();

		if(!inputValue)
			return false;

		let formula = inputValue.split(/\+|\-|\*|\//)
					.filter(operand => operand)
					.map(operand => operand.trim());

		console.log(formula);
	}

	return (
		<div className="component-grid">
			<div className="grid-controls-wrapper">
				<div className="controls">
					<button onClick={saveToCSV}>Save</button>
					<button onClick={loadFromCSV}>Load</button>
				</div>
				<div>
					<input 
						type="text" 
						name="formula-input" 
						placeholder="a4 = a1 + b2"
						ref={input => _formulaInput = input} />
					<button onClick={calculateFormula}>Calculate</button>
				</div>
			</div>
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
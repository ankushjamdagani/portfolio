import React from 'react';
import { connect } from 'react-redux';
var math = require('mathjs');

import './styles.scss';

import { GridRow } from '../../components';
import { csvGeneratedGrid, generateGrid, saveChanges } from '../../actions';

const Grid = ({data, colCount, rowCount, generateGrid, csvGeneratedGrid, computeCell}) => {
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

	// TODO: WHAT IF ROW IS GREATER THAN `Z`
	const getValueFromExpression = (op) => {
		let coords = op.match(/[^\d]+|\d+/g);

		coords[0] = coords[0].charCodeAt(0) - 97

		return {
			row: coords[0],
			col: parseInt(coords[1])
		}
	}

	const calculateFormula = () => {
		let inputValue = _formulaInput.value.trim();

		if(!inputValue)
			return false;

		let operands = inputValue.split(/\+|\-|\*|\/|\=/)
					.filter(operand => operand)
					.map(operand => operand.trim());

		let scope = {};
		let coords = {};
		let resultCell = {};

		for (var i = 0; i <= operands.length; i++) {
			if(operands[i]) {
				coords = getValueFromExpression(operands[i])
				
				scope[operands[i]] = parseInt(data[coords.row][coords.col]);

				if(i === 0) {
					resultCell = {row: coords.row, col: coords.col};
				}
			}
		}

		let result = math.eval(inputValue, scope);

		computeCell(result, resultCell.row, resultCell.col);
	}

	return (
		<div className="component-grid">
			<div className="grid-controls-wrapper">
				<div className="formula-input-wrapper">
					<input 
						type="text" 
						name="formula-input" 
						placeholder="a4 = a1 + b2"
						ref={input => _formulaInput = input} />
					<button onClick={calculateFormula}>Calculate</button>
				</div>
				<div className="controls">
					<button onClick={saveToCSV}>Save</button>
					<button onClick={loadFromCSV}>Load</button>
				</div>
			</div>
			<div className="grid-content-wrapper">
				{ 
					data.map((dataItem, i) => <GridRow data={dataItem} key={i} rowIndex={i} />)
				}
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		data: state.grid && state.grid.data ? state.grid.data : null,
		...ownProps
	};
}

const mapDispatchToProps = dispatch => {
	return {
		generateGrid: (x, y) => dispatch(generateGrid(x,y)),
		csvGeneratedGrid: (csv) => dispatch(csvGeneratedGrid(csv)),
		computeCell: (value, rowIndex, colIndex) => dispatch(saveChanges(value, rowIndex, colIndex))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Grid);
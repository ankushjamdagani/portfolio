import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

const GridCell = ({data, isActive, isEditable, rowIndex, colIndex, dispatch}) => {
	let _input = null;

	const saveChanges = (value) => {
		const action = {
			type: 'CELL_UPDATE',
			payload: {
				row: rowIndex,
				col: colIndex,
				value: value
			}
		};

		dispatch(action);
	}

	const onBlur = (e) => {
		saveChanges(e.target.value);
	}

	const onPressEnter = (e) => {
		if(e.keyCode === 13) {
			saveChanges(e.target.value);
		}
		else if(e.keyCode === 27) {
			/*
				revertChanges() // to data
			*/
		}
	} 

	return (
		<div className='grid-cell'>
			<input 
				type="text" 
				defaultValue={data} 
				ref={input => _input = input}
				onBlur={e => onBlur(e)} 
				onKeyUp={e => onPressEnter(e)} />
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return dispatch
}

export default connect(
	mapDispatchToProps
)(GridCell)
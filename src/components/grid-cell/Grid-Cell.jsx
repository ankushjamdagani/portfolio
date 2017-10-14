import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';
import { saveChanges } from '../../actions';

const GridCell = ({data, isActive, isEditable, rowIndex, colIndex, saveChanges}) => {
	let _input = null;

	const onBlur = (e) => {
		saveChanges(e.target.value);
	}

	const handleInput = (e) => {
		if(e.keyCode === 27) {
			/*
				revertChanges() // to data // make inactive
			*/
		}
		else {
			saveChanges(e.target.value);
		}
	} 

	return (
		<div className='grid-cell'>
			<input 
				type="text" 
				value={data} 
				ref={input => _input = input}
				onChange={e => handleInput(e)} />
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
		saveChanges: (value) => dispatch(saveChanges(value, ownProps.rowIndex, ownProps.colIndex))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GridCell)
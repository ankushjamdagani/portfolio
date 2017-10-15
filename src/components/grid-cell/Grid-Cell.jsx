import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';
import { saveChanges, rowMove, rowAdd, rowRemove, colAdd, colMove, colRemove } from '../../actions';

const GridCell = ({data, rowIndex, colIndex, saveChanges, rowAdd, rowMove, rowRemove, colAdd, colMove, colRemove}) => {
	let _input = null;
	let _controls = null;

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

	const showControls = () => {
		let controls = document.querySelectorAll('.grid-cell-controls.active').forEach(item => item.classList.toggle('active'));
		// controls.forEach
		if(_controls)
			_controls.classList.add('active');
	}

	return (
		<div className='grid-cell'>
			{
				colIndex === 0 && <div className="row-head">{String.fromCharCode(rowIndex+97)}</div>
			}
			<input 
				type="text" 
				value={data} 
				ref={input => _input = input}
				onChange={e => handleInput(e)}
				onFocus={() => showControls()} />

			<div className="grid-cell-controls" ref={controls => _controls = controls}>
				<div>
					<span className="controls-head">Row Controls</span>
					<button onClick={() => rowMove(true)}> > Move Row Up</button>
					<button onClick={() => rowMove(false)}> > Move Row Down</button>
					<button onClick={() => rowAdd(true)}> > Add Row Above</button>
					<button onClick={() => rowAdd(false)}> > Add Row Below</button>
					<button onClick={() => rowRemove()}> > Remove Row</button>
				</div>
				<div className="seperator"></div>
				<div>
					<span className="controls-head">Column Controls</span>
					<button onClick={() => colMove(true)}> > Move Col Left</button>
					<button onClick={() => colMove(false)}> > Move Col Right</button>
					<button onClick={() => colAdd(true)}> > Add Col Left</button>
					<button onClick={() => colAdd(false)}> > Add Col right</button>
					<button onClick={() => colRemove()}> > Remove Col</button>
				</div>
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
		saveChanges: (value) => dispatch(saveChanges(value, ownProps.rowIndex, ownProps.colIndex)),
		rowAdd: (isUp) => dispatch(rowAdd(isUp, ownProps.rowIndex)),
		rowMove: (isUp) => dispatch(rowMove(isUp, ownProps.rowIndex)),
		rowRemove: () => dispatch(rowRemove(ownProps.rowIndex)),
		colAdd: (isLeft) => dispatch(colAdd(isLeft, ownProps.colIndex)),
		colMove: (isLeft) => dispatch(colMove(isLeft, ownProps.colIndex)),
		colRemove: () => dispatch(colRemove(ownProps.colIndex))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GridCell)
const generateGrid = (x,y) => {
	let payload = [];

	if(x && y)
		payload = [...new Array(x).keys()]
		.map(() => 
			[...new Array(y).keys()]
			.map(() => Math.random()*10));

	return {
		type: 'GRID_INIT',
		payload
	}
}

const rowMove = (isUp, currentIndex) => ({
	type: 'ROW_MOVE',
	payload: {
		isUp,
		currentIndex
	}
})

const rowAdd = (isAbove, currentIndex) => ({
	type: 'ROW_ADD',
	payload: {
		isAbove,
		currentIndex
	}
})

const saveChanges = (value, rowIndex, colIndex) => ({
	type: 'CELL_UPDATE',
	payload: {
		rowIndex,
		colIndex,
		value
	}
})

export {
	generateGrid,
	rowMove,
	rowAdd,
	saveChanges
}
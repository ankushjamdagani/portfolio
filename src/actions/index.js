const generateGrid = (x,y) => {
	let payload = [];

	if(x && y)
		payload = [...new Array(x).keys()]
		.map(() => 
			[...new Array(y).keys()]
			.map(() => ''));

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

const rowAdd = (isUp, currentIndex) => ({
	type: 'ROW_ADD',
	payload: {
		isUp,
		currentIndex
	}
})

const colAdd = (isLeft, currentIndex) => ({
	type: 'COL_ADD',
	payload: {
		isLeft,
		currentIndex
	}
})

const colMove = (isLeft, currentIndex) => ({
	type: 'COL_MOVE',
	payload: {
		isLeft,
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
	rowAdd,
	rowMove,
	colAdd,
	colMove,
	saveChanges
}
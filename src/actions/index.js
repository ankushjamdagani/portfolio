const csvGeneratedGrid = (csv) => {
	let payload = [];

	if(csv.trim()) {
		payload = csv.split('\n').map(item => item.split(','));
	}

	return {
		type: 'GRID_INIT',
		payload
	}
}

const generateGrid = (x,y) => {
	let payload = [];

	if(x && y)
		payload = [...new Array(x).keys()]
		.map((item, j) => 
			[...new Array(y).keys()]
			.map((item, i) => j+''+i));

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

const rowRemove = (currentIndex) => ({
	type: 'ROW_REMOVE',
	payload: {
		currentIndex
	}
})

const colRemove = (currentIndex) => ({
	type: 'COL_REMOVE',
	payload: {
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
	csvGeneratedGrid,
	generateGrid,
	rowAdd,
	rowMove,
	rowRemove,
	colAdd,
	colMove,
	colRemove,
	saveChanges
}
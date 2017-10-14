const generateGrid = (x,y) => {
	let data = [];

	if(x && y)
		data = [...new Array(x).keys()]
		.map(() => 
			[...new Array(y).keys()]
			.map(() => ''));

	return {
		type: 'GRID_INIT',
		data
	}
}

export {
	generateGrid
}
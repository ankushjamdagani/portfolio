const initGridReducer = (x, y) => {
	// let arr = ;
	// console.log(...new Array(x).keys())

	return [...new Array(x).keys()].map(() => [...new Array(y).keys()]);
}

const initialState = {
	data: initGridReducer(25,25)
};

const grid = (state = initialState, payload) => {
	switch(payload.action) {
		default:
			return state
	}
}

export default grid;
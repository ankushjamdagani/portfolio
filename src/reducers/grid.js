const grid = (state = {}, action) => {
	switch(action.type) {
		case 'GRID_INIT': 
			const data = action.data;

			return {
				...state,
				data
			};
			break;
		default:
			return state;
	}
}

export default grid;
const grid = (state = {}, action) => {
	switch(action.type) {
		case 'GRID_INIT': 
			const data = action.payload;

			return {
				...state,
				data
			};
		
		case 'ROW_MOVE': {
			const {isUp, currentIndex} = action.payload;

			if(
				(isUp && currentIndex === 0) || 
				(!isUp && currentIndex === state.data.length - 1)
			) {
				return state;
			}

			if(isUp)
				return {
					...state,
					data: [
						...state.data.slice(0, currentIndex - 1),
						state.data[currentIndex],
						state.data[currentIndex - 1],
						...state.data.slice(currentIndex+1)
					]
				}
			else 
				return {
					...state,
					data: [
						...state.data.slice(0, currentIndex),
						state.data[currentIndex + 1],
						state.data[currentIndex],
						...state.data.slice(currentIndex + 2)
					]
				}
		
		}
		
		case 'ROW_ADD': {
			const isUp = false;
			console.log(action.payload);
			return state;
		}

		case 'CELL_UPDATE': {
			const {rowIndex, colIndex, value} = action.payload;

			state.data[rowIndex][colIndex] = value;

			console.log(value)

			return {
				...state,
				data: [
					...state.data
				]
			}
		}

		default:
			return state;
	}
}

export default grid;
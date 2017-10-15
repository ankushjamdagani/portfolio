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
			let refIndex;

			if(
				(isUp && currentIndex === 0) || 
				(!isUp && currentIndex === state.data.length - 1)
			) {
				return state;
			}


			if(isUp) {
				refIndex = currentIndex - 1;
			}
			else {
				refIndex = currentIndex;
			}

			return {
				...state,
				data: [
					...state.data.slice(0, refIndex),
					state.data[refIndex + 1],
					state.data[refIndex],
					...state.data.slice(refIndex + 2)
				]
			}
		
		}
		
		case 'ROW_ADD': {
			const {isAbove, currentIndex} = action.payload;
			
			// TODO: Handle case when rowCount is 0 and colCount is N
			// Hmmmm..... This action can only be dispatched by a row component, so minimum 1 row is must
			// If Add Row functionality is given to the Grid component, it can pass on the required colCount
			const colCount = state.data[0].length;
			
			let data = state.data;
			let newRowIndex = 0;

			if(isAbove) {
				newRowIndex = currentIndex;
			}
			else {
				newRowIndex = currentIndex + 1;
			}

			data = [
				...data.slice(0,newRowIndex),
				[...new Array(colCount).keys()].map(() => ''),
				...data.slice(newRowIndex)
			]

			return {
				...state,
				data
			};
		}

		case 'COL_ADD': {
			console.log(action);
			return state;
		}

		case 'CELL_UPDATE': {
			const {rowIndex, colIndex, value} = action.payload;

			const data = state.data.map((item, i) => {

				if(i === rowIndex) {
					return [
						...item.slice(0, colIndex),
						value,
						...item.slice(colIndex + 1)
					]
				}
				else {
					return item
				}
			})


			return {
				...state,
				data
			}
		}

		default:
			return state;
	}
}

export default grid;
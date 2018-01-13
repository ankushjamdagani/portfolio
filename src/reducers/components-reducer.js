const COMPONENTS_LIST = [
	{
		id: 0,
		category: 0,
		name: 'Grid',
		displayName: 'grid'
	},
	{
		id: 1,
		category: 0,
		name: 'FractalTree',
		displayName: 'Fractal Tree'
	},
	{
		id: 0,
		category: 0,
		name: 'Grid',
		displayName: 'grid'
	}
];

const CATEGORIES_LIST = [
	'CAT1'
]

const componentsInitialState = {
	activeCategoryIndex: -1,
	activeComponentIndex: -1,
	categories: CATEGORIES_LIST,
	filteredComponents: COMPONENTS_LIST
}

const componentsReducer = (state = componentsInitialState, action) => {
	switch (action.type) {
		case 'FILTER_BY_CATEGORY': {
			let category = CATEGORIES_LIST.indexof(action.payload.category);
			let filteredComponents = state.filteredComponents.filter(component => component.category === category);

			return {
				...state,
				filteredComponents,
				activeCategoryIndex: category,
				activeComponentIndex: filteredComponents.length || -1
			};
		}
		case 'FILTER_BY_ID': {
			let activeComponentIndex, activeCategoryIndex;

			for (var i = filteredComponents.length - 1; i >= 0; i--) {
				if( filteredComponents[i].id === action.payload.id ) {
					activeComponentIndex = i;
					activeCategoryIndex = filteredComponents[i].category;
				}
			}

			return {
				...state,
				activeCategoryIndex,
				activeComponentIndex
			}
		}
		case 'SEARCH': {
			let filteredComponents = COMPONENTS_LIST.filter(component => (
					component[i].id + '' === action.payload.searchStr || 
					component[i].name.indexOf(action.payload.searchStr) !== -1 ||  
					component[i].displayName.indexOf(action.payload.searchStr) !== -1
				));

			return {
				...state,
				activeCategoryIndex: -1,
				activeComponentIndex: -1,
				filteredComponents
			}
		}
		case 'MOVE_UP': {
			let indexToGo = -1;
			
			if(state.filteredComponents.length === 0)
				indexToGo = -1;
			else if ( state.filteredComponents.length - 1 === state.activeComponentIndex ) 
				indexToGo = 0;
			else 
				indexToGo = state.activeComponentIndex + 1;

			return {
				...state,
				activeComponentIndex
			}
		}
		case 'MOVE_DOWN': {
			let indexToGo = -1;
			
			if(state.filteredComponents.length === 0)
				indexToGo = -1;
			else if ( state.activeComponentIndex === 0 ) 
				indexToGo = state.filteredComponents.length - 1;
			else 
				indexToGo = state.activeComponentIndex - 1;

			return {
				...state,
				activeComponentIndex
			}
		}
		default: 
			return state
	}
}

export default componentsReducer;
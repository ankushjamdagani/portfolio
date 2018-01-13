import React from 'react';
import { connect } from 'react-redux';
import { ComponentActions } from '../../actions';
import * as AllComponents from '../../components';

const ComponentsPage = ({activeCategoryIndex, activeComponentIndex, categories, dispatch, filteredComponents, ...props}) => {

	const createComponentWrapper = (component, key) => {
		const WrapperType = AllComponents[component.name];
		return <div className="component-wrapper" key={key}>
			This is some Component...
			<WrapperType />
			...This is end of some component.
		</div>
	}

	const createComponentTile = (component, key) => {
		console.log(component);
		
		return <div className="component-tile" key={key}>
			<div className="component-tile-wrapper">
				<div className="badge">
					{ component.id }
				</div>
				<div className="title">
					{ component.displayName }
				</div>
				<div className="category">
				{ categories[component.category] }
				</div>
			</div>
		</div>
	}

	return <div className="components-wrapper">
		<h1>Components</h1>
		{ filteredComponents.map((item, i) => createComponentTile(item, i)) }
	</div>
}

const mapStateToProps = (reduxState, ownProps) => {
	const componentsReducer = reduxState && reduxState.componentsReducer;
	console.log(reduxState);
	
	return {
		...componentsReducer
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentsPage)
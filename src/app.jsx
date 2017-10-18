import React from 'react';

import { LoadingPage, CoverPage } from './views';

import { Grid, FractalTree } from './components';

class App extends React.Component {

	render() {
		return (
			<div className="app">
				{/*<LoadingPage />*/}
				<CoverPage />

				<div className="component-wrapper">
					<a href="https://github.com/ankushjamdagani/portfolio/tree/master/src/components" className="component-link">Component : <em>Excel Grid</em></a>
					<div className="label-wrapper">
						<span className="label">ReactJS</span>
					</div>
					<div className="component-demo-info">Use formula input box. Focus on cell for more controls.</div>
					<div className="component-demo">
						<Grid rowCount={10} colCount={10} />
					</div>
				</div>

				<div className="component-wrapper">
					<a href="https://github.com/ankushjamdagani/portfolio/tree/master/src/components/fractal-tree" className="component-link">Component : <em>Fractal Tree</em></a>
					<div className="label-wrapper">
						<span className="label">ReactJS</span>
					</div>
					<div className="component-demo-info">Click on whitespace</div>
					<div className="component-demo">
			            <FractalTree
			                x={0}
			                y={window.innerHeight*.8}
			                canvasHeight={window.innerHeight}
			                canvasWidth={window.innerWidth}
			                sizeBranch={105}
			                angle={-45}
			                speed={100}
			                colorBranch='#ccc'
			                colorLeaf='#ddd'/>
					</div>
				</div>
			</div>
		)
	}
}

export default App;

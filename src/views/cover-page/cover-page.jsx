import React from 'react';

import { Grid, FractalTree } from '../../components';

class CoverPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            begin: false
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                begin: true
            })
        }, 5000)
    }

    render() {
        return [
        <div className="cover-page page-view">
            <div id="portfolio-name">
                <div>
                    Ankush
                </div>
                <div>
                    Jamdagani
                </div>
            </div>
            <FractalTree
                x={this.state.width}
                y={this.state.height*.8}
                canvasHeight={this.state.height}
                canvasWidth={this.state.width}
                sizeBranch={105}
                angle={-145}
                speed={100}
                colorBranch='#ccc'
                colorLeaf='#ddd'
                begin={this.state.begin}/>
        </div>,
        <div className="component-wrapper">
            <a href="https://github.com/ankushjamdagani/portfolio/tree/master/src/components" className="component-link">Component : <em>Excel Grid</em></a>
            <div className="label-wrapper">
                <span className="label">ReactJS</span>
            </div>
            <div className="component-demo-info">Use formula input box. Focus on cell for more controls.</div>
            <div className="component-demo">
                <Grid rowCount={10} colCount={10} />
            </div>
        </div>,
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
        ]
    }
}

export default CoverPage;

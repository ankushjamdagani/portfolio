import React from 'react';

import { FractalTree } from '../../components';

class CoverPage extends React.Component {
    constructor(props) {
        super(props);

        console.log(window.innerWidth);
        console.log(window.innerHeight);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            begin: false
        }
    }

    render() {
        return <div className="cover-page">
            <div id="ankush">
                ANKUSH
            </div>
            <FractalTree
                x={0}
                y={this.state.height*.8}
                canvasHeight={this.state.height}
                canvasWidth={this.state.width}
                sizeBranch={110}
                angle={-45}
                speed={100}
                colorBranch='#666'
                colorLeaf='#777'
                begin={this.state.begin}/>

            <FractalTree
                x={this.state.width/2}
                y={this.state.height*.8}
                canvasHeight={this.state.height}
                canvasWidth={this.state.width/2}
                colorBranch='#999'
                colorLeaf='crimson'
                angle={-135}
                begin={this.state.begin}/>
        </div>
    }
}

export default CoverPage;

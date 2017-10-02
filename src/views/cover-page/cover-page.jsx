import React from 'react';

import { FractalTree } from '../../components';

class CoverPage extends React.Component {
    constructor(props) {
        super(props);

        console.log(window.innerWidth);
        console.log(window.innerHeight);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    render() {
        return <div className="cover-page">
            <div id="ankush">
                ANKUSH
            </div>
            <FractalTree
                x={0}
                y={this.state.height}
                length={100}
                height={this.state.height}
                width={this.state.width/2}
                angle={-45}/>
            <FractalTree
                x={this.state.width/2}
                y={this.state.height}
                length={100}
                height={this.state.height}
                width={this.state.width/2}
                angle={-135}/>
        </div>
    }
}

export default CoverPage;

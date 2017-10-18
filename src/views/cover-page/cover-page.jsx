import React from 'react';

import { FractalTree } from '../../components';

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
        return <div className="cover-page page-view">
            <div id="portfolio-name">
                <div>
                    Ankush
                </div>
                <div>
                    Jamdagani
                </div>
            </div>
            {/*<FractalTree
                            x={0}
                            y={this.state.height*.8}
                            canvasHeight={this.state.height}
                            canvasWidth={this.state.width}
                            sizeBranch={110}
                            angle={-45}
                            speed={100}
                            colorBranch='#666'
                            colorLeaf='#777'
                            begin={this.state.begin}/>*/}

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
        </div>
    }
}

export default CoverPage;

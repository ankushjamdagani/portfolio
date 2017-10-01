import React from 'react';

class FractalTree extends React.Component {
    constructor(props) {
        super(props);

        this.startPoint = {
            x: 0,
            y: 0,
            angle: 20,
            rotation: 10,
            length: 100,
            color: red
        }

        this.draw = this.draw.bind(this);
    }

    draw() {
        let ctx = this.canvas.getContext("2d");
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(this.startPoint.length,400);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(100,100,100,10,2*Math.PI);
        ctx.stroke();
    }

    render() {
        return <div className="fractal-tree">
            <canvas ref={_this => this.canvas = _this} className="fractal-tree-canvas" onClick={() => {this.draw()}} width="502" height="478"></canvas>
        </div>
    }
}

export default FractalTree;

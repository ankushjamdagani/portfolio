import React from 'react';
import PropTypes from 'prop-types';

class FractalTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = props;
        this.ctr = 0;

        this.drawBranch = this.drawBranch.bind(this);
        this.drawLeaf = this.drawLeaf.bind(this);
        this.toRadians = this.toRadians.bind(this);
    }


    toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    drawBranch(x, y, length, angle) {
        let ctx = this.canvas.getContext("2d"),
            x1 = x + (length * Math.cos(this.toRadians(angle))),
            y1 = y + (length * Math.sin(this.toRadians(angle))),
            r = Math.floor(Math.random()*125),
            g = Math.floor(Math.random()*255),
            b = Math.floor(Math.random()*125);

        console.log(x, y, length, angle);

        // ctx.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.1)';
        ctx.strokeStyle = '#eee';
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        this.ctr++;
        if(length < 40) {
            this.drawLeaf(x1, y1);
            return false;
        }

        setTimeout(() => {
            this.drawBranch(x1, y1, length - 10, angle + Math.random()*30 + 15);
            this.drawBranch(x1, y1, length - 10, angle - Math.random()*30 - 15);
        }, 200);
    }

    drawLeaf(x, y) {
        let ctx = this.canvas.getContext("2d");

        ctx.beginPath();
        // ctx.fillStyle = 'rgba(255,125,200,1)';
        ctx.arc(x, y, 5, 0, 2*Math.PI);
        ctx.stroke();
    }

    render() {
        let {x, y, length, angle, width, height} = this.props;

        return <div className="fractal-tree">
            <canvas
                ref={_this => this.canvas = _this} className="fractal-tree-canvas"
                onClick={(e) => {
                    this.drawBranch(x, y, length, angle);
                }}
                width={width}
                height={height}>
            </canvas>
        </div>
    }
}

FractalTree.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    angle: PropTypes.number,
    rotation: PropTypes.number,
    length: PropTypes.number,
    colorBranch: PropTypes.number,
    colorLeaf: PropTypes.number
}

export default FractalTree;

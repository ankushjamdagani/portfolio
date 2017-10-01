import React from 'react';
import PropTypes from 'prop-types';

class FractalTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = props;
        this.ctr = 0;

        this.draw = this.draw.bind(this);
        this.drawLeaf = this.drawLeaf.bind(this);
        this.toRadians = this.toRadians.bind(this);
    }


    toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    draw(x, y, length, angle) {
        let ctx = this.canvas.getContext("2d"),
            x1 = x + (length * Math.cos(this.toRadians(angle))),
            y1 = y + (length * Math.sin(this.toRadians(angle)));

        ctx.strokeStyle = '#eee';
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        this.ctr++;
        if(length < 10) {
            this.drawLeaf(x1, y1);
            return false;
        }

        setTimeout(() => {
            this.draw(x1, y1, length - 10, angle + Math.random()*30 + 15);
            this.draw(x1, y1, length - 10, angle - Math.random()*30 - 15);
        }, 40);
    }

    drawLeaf(x, y) {
        let ctx = this.canvas.getContext("2d");

        ctx.beginPath();
        ctx.fillSstyle = 'rgba(0,0,0,.3)';
        ctx.arc(x, y, 5, 0, 2*Math.PI);
        ctx.stroke();
    }

    render() {
        return <div className="fractal-tree">
            <canvas
                ref={_this => this.canvas = _this} className="fractal-tree-canvas"
                onClick={(e) => {
                    this.draw(this.props.x, this.props.y, this.props.length, this.props.angle);
                }}
                width={this.props.width}
                height={this.props.height}>
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

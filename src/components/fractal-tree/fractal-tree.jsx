import React from 'react';
import PropTypes from 'prop-types';

class FractalTree extends React.Component {
    constructor(props) {
        super(props);

        this.drawBranch = this.drawBranch.bind(this);
        this.drawLeaf = this.drawLeaf.bind(this);
        this.toRadians = this.toRadians.bind(this);
    }

    componentWillReceiveProps(props) {
        if(props.begin) {
            this.drawBranch(props.x, props.y, props.angle, props.sizeBranch, props.sizeLeaf, props.colorBranch, props.colorLeaf, props.speed, props.withLeaf);
        }
    }

    toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    drawBranch(x, y, angle, sizeBranch, sizeLeaf, colorBranch, colorLeaf, speed, withLeaf) {
        let ctx = this.canvas.getContext("2d"),
            x1 = x + (sizeBranch * Math.cos(this.toRadians(angle))),
            y1 = y + (sizeBranch * Math.sin(this.toRadians(angle)));

        ctx.strokeStyle = colorBranch;
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        this.ctr++;
        if(sizeBranch < 80) {
            if(withLeaf)
                this.drawLeaf(x1, y1, sizeLeaf, colorLeaf);
            return false;
        }

        setTimeout(() => {
            this.drawBranch(x1, y1, angle + Math.random()*30 + 15, sizeBranch - 5, sizeLeaf, colorBranch, colorLeaf, speed, withLeaf);

            this.drawBranch(x1, y1, angle - Math.random()*30 - 15, sizeBranch - 5, sizeLeaf, colorBranch, colorLeaf, speed, withLeaf);
        }, speed);
    }

    drawLeaf(x, y, sizeLeaf, colorLeaf) {
        let ctx = this.canvas.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = this.props.colorLeaf;
        ctx.strokeStyle = this.props.colorLeaf;
        ctx.arc(x, y, sizeLeaf, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    render() {
        let {x, y, angle, canvasWidth, canvasHeight, sizeBranch, sizeLeaf, colorBranch, colorLeaf, speed, withLeaf} = this.props;

        return <div className="fractal-tree">
            <canvas
                ref={canvas => this.canvas = canvas} className="fractal-tree-canvas"
                onClick={(e) => {
                    this.drawBranch(x, y, angle, sizeBranch, sizeLeaf, colorBranch, colorLeaf, speed, withLeaf);
                }}
                width={canvasWidth}
                height={canvasHeight}>
            </canvas>
        </div>
    }
}

FractalTree.defaultProps = {
    x: 0,
    y: 0,
    angle: 90,
    canvasHeight: 400,
    canvasWidth: 400,
    sizeBranch: 100,
    sizeLeaf: 5,
    colorBranch: '#ddd',
    colorLeaf: '#eee',
    begin: false,
    speed: 50,
    withLeaf: true
}

FractalTree.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    angle: PropTypes.number,
    canvasHeight: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    sizeBranch: PropTypes.number,
    sizeLeaf: PropTypes.number,
    colorBranch: PropTypes.string,
    colorLeaf: PropTypes.string,
    begin: PropTypes.bool,
    withLeaf: PropTypes.bool,
    speed: PropTypes.number
}

export default FractalTree;

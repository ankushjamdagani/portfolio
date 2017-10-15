import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import { GridCell } from '../../components';

const GridRow = ({data, rowIndex}) => {
	return (
		<div className="grid-row">
			{
				rowIndex === 0 &&
				<div className="grid-head">
					{
						data.map((item, i) => <div className="col-head" key={"col"+(i-1)}>{i-1}</div>)
					}
				</div>
			}
			<div className="grid-content">
				{ 
					data.map((item, i) => <GridCell data={item} colIndex={i} rowIndex={rowIndex} key={i} />) 
				}
			</div>
		</div>
	)
}

export default GridRow;
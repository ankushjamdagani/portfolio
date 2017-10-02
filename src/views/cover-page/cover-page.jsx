import React from 'react';

import { FractalTree } from '../../components';

class CoverPage extends React.Component {

    render() {
        return <div className="cover-page">
            <FractalTree
                x={250}
                y={500}
                length={100}
                height="500"
                width="1024"
                angle={-90}/>
            <FractalTree
                x={512}
                y={0}
                length={100}
                height="500"
                width="1024"
                angle={45}/>
        </div>
    }
}

export default CoverPage;

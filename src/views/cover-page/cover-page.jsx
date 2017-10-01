import React from 'react';

import { FractalTree } from '../../components';

class CoverPage extends React.Component {

    render() {
        return <div className="cover-page">
            <FractalTree
                x={0}
                y={0}
                length={100}
                height="500"
                width="1024"
                angle={90}/>
            <FractalTree
                x={1024}
                y={0}
                length={100}
                height="500"
                width="1024"
                angle={-90}/>
        </div>
    }
}

export default CoverPage;

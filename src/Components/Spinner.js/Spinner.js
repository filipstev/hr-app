import React from 'react';

import './Spinner.css';

const Spinner = (props) => (
    <div
        className={'loader'}
        style={{
            marginTop: props.small ? '0' : '80px',
            transform: props.small ? 'scale(0.3)' : 'none',
        }}
    >
        Loading...
    </div>
);

export default Spinner;

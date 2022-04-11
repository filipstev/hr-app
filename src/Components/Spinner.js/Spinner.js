import React, { useContext } from 'react';

import './Spinner.css';
import { ThemeContext } from '../../context/theme-context';

const Spinner = (props) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={theme === 'light' ? 'loader' : 'loader-dark'}
            style={{
                marginTop: props.small ? '0' : '80px',
                transform: props.small ? 'scale(0.3)' : 'none',
            }}
        >
            Loading...
        </div>
    );
};

export default Spinner;

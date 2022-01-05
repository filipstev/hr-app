import React from 'react';
import SingleContainer from './SingleContainer';

const MyProfile = () => {
    return (
        <div
            style={{
                marginTop: '50px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <h1
                style={{
                    fontSize: '28px',
                    lineHeight: '32px',
                    letterSpacing: '0.04em',
                }}
            >
                My Profile
            </h1>

            <div style={{ display: 'flex' }}>
                <SingleContainer />
                <SingleContainer />
            </div>
        </div>
    );
};

export default MyProfile;

import React from 'react';
import { Button, TextField } from '@material-ui/core';

const SingleContainer = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                // padding: '20px 0px 20px 0px',
                border: '1px solid black',
                fontFamily: 'Comic Neue',
                fontWeight: '600',
                marginRight: '40px',
                width: '370px',
            }}
        >
            <div style={{ padding: '10px 20px' }}>Basic Info</div>
            <div
                style={{
                    borderTop: '1px solid black',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                }}
            >
                <TextField
                    variant="outlined"
                    label="Name"
                    style={{ marginBottom: '15px', marginTop: '12px' }}
                />
                <input type="file" />
                {/* <Button /> */}

                <div
                    style={{
                        border: '1px solid black',
                        borderRadius: '4px',
                        width: 'fit-content',
                        padding: '3px 20px',
                        marginTop: '30px',
                        alignSelf: 'flex-end',
                        cursor: 'pointer',
                    }}
                >
                    Save
                </div>
            </div>
        </div>
    );
};

export default SingleContainer;

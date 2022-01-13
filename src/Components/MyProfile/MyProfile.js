import React, { useEffect, useState } from 'react';
import SingleContainer from './SingleContainer';

import axiosInstance from '../../helpers/axiosInstance';

const MyProfile = () => {
    const [user, setUser] = useState({});
    const userStorage = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        axiosInstance
            .get('/profiles?filters[user][id][$eq]=' + userStorage.user.id)
            .then((data) => {
                console.log(userStorage.user.id, 'here');
                setUser(data.data.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                <SingleContainer info user={user} />
                <SingleContainer
                    security
                    user={user}
                    email={userStorage.user.email}
                />
            </div>
        </div>
    );
};

export default MyProfile;

import React, { useEffect, useState } from 'react';
import SingleContainer from './SingleContainer';

import axiosInstance from '../../helpers/axiosInstance';
import { useQuery } from 'react-query';

const userStorage = JSON.parse(localStorage.getItem('user'));

const fetchUserData = async () => {
    const res = await axiosInstance.get(
        '/profiles?filters[user][id][$eq]=' + userStorage.user.id
    );

    return res.data.data[0];
};

const MyProfile = () => {
    const [user, setUser] = useState({});

    const { data, status, refetch } = useQuery(['user'], () => fetchUserData());

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
                <SingleContainer info user={data} />
                <SingleContainer
                    security
                    user={data}
                    email={userStorage.user.email}
                />
            </div>
        </div>
    );
};

export default MyProfile;

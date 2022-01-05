import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';

const EditProfile = () => {
    const [profile, setProfile] = useState();
    const params = useParams();
    const [firstTime, setFirstTime] = useState(true);
    const { id } = params;
    useEffect(() => {
        if (firstTime) {
            axiosInstance
                .get('/profiles?sort=id')
                .then(({ data }) => {
                    console.log();
                    console.log(data.data.filter((item) => +item.id === +id));
                })
                .catch((err) => {
                    console.log(new Error(err));
                });
            return () => {
                console.log('cleanup');
            };
        }
    }, [firstTime]);
    console.log(profile);
    return (
        <p style={{ margin: '150px' }}>{id}</p>
        // <p>s</p>
    );
};

export default EditProfile;

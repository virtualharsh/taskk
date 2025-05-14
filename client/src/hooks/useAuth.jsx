import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAuth = (SERVER) => {
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const localData = JSON.parse(localStorage.getItem('authToken'));
            if (!localData) {
                navigate('/login');
                return;
            }

            const { token, avatar } = localData;
            setAvatar(avatar);

            try {
                const res = await axios.get(`${SERVER}/home`, {
                    headers: { token }
                });
                setUser(res.data.user);
            } catch (err) {
                console.error('Error fetching user:', err);
                navigate('/login');
            }
        };

        fetchUser();
    }, [SERVER, navigate]);

    return { user, avatar };
};

export default useAuth;

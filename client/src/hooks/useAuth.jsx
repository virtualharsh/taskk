import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const SERVER = import.meta.env.VITE_SERVER;

    useEffect(() => {
        const checkAuth = async () => {
            const localData = JSON.parse(localStorage.getItem('authToken'));
            if (!localData) {
                navigate('/login');
                return;
            }

            try {
                const result = await axios.get(`${SERVER}/home`, {
                    params: {
                        user: username,
                    },
                });

                if (!result.data.exists) {
                    localStorage.removeItem('authToken');
                    navigate('/login');
                }

            } catch (err) {
                console.error('Auth check failed:', err);
                localStorage.removeItem('authToken');
                navigate('/login');
            }
        };

        checkAuth();
    }, [SERVER, navigate, username]);
};

export default useAuth;

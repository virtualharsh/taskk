import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const SERVER = import.meta.env.VITE_SERVER;

    useEffect(() => {
        const checkAuth = async () => {
            const token = JSON.parse(localStorage.getItem("authToken")).token;
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const res = await axios.get(`${SERVER}/user/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.data.redirect)
                    navigate('/login')
            } catch (err) {
                console.error("Auth check failed:", err);
                localStorage.removeItem("authToken");
                navigate("/login");
            }
        };

        checkAuth();
    }, [username, SERVER, navigate]);
};

export default useAuth;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { toast } from "sonner";

const Home = () => {
    const SERVER = import.meta.env.VITE_SERVER;

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${SERVER}/home`, { withCredentials: true });
                setUser(response?.data?.user);

            } catch (error) {
                toast.error("User not authenticated; Please login");
                console.log(error);
            }
        }

        fetchUser();

        const token = Cookies.get('authToken') || null

        if (token == null) {
            toast.error('Please login to continue')
            navigate('/login')
        }
    }, []);
    return (
        <div>Home, Welcome {user}</div>
    )
}

export default Home;
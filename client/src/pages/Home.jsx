import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
    const SERVER = import.meta.env.VITE_SERVER; 
    
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get(`${SERVER}/home`, { withCredentials: true });                
                setUser(response.data.user);

            } catch (error) {
                toast.error(error?.response?.data?.message);
                navigate("/login");
            }
        };

        verifyUser();
    }, []);
    return (
        <div>Home, Welcome {user}</div>
    )
}

export default Home;
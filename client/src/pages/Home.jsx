import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/home", { withCredentials: true });                
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const SERVER = import.meta.env.VITE_SERVER;

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    return (
        <div>Home, Welcome {user}</div>
    )
}

export default Home;
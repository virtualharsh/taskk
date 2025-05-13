import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModeToggle from "@/components/mode-toggle"


const Home = () => {
    const SERVER = import.meta.env.VITE_SERVER;

    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState("hi")
    const navigate = useNavigate();

    const func = async () => {
        const localData = JSON.parse(localStorage.getItem('authToken'));
        if (!localData) {
            navigate('/login')
        }
        const { token, avatar } = localData;
        setAvatar(avatar);
        const response = await axios.get(`${SERVER}/home`, {
            headers: { token }
        });
        return response.data.user ;
    }

    useEffect(() => {
        setUser(func());
    }, [])

    return (
        <>
            <div>Home, Welcome {user}</div>
            <img src={avatar} />
            <ModeToggle />
        </>
    )
}

export default Home;
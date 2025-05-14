import ModeToggle from "@/components/mode-toggle"
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";


const Home = () => {
    
    const SERVER = import.meta.env.VITE_SERVER;
    const { user, avatar } = useAuth(SERVER);

    const { username } = useParams();


    return (
        <>
            <div>Home, Welcome {username}</div>
            <img src={avatar} />
            <ModeToggle />
        </>
    )
}

export default Home;
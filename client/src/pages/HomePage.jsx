import { useParams, Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import useAuth from "../hooks/useAuth";

const HomePage = () => {

    useAuth();
    return (
        <div className="flex gap-0 flex-col min-h-screen md:flex-row bg-background text-foreground">
            <UserSidebar />
            <div className="w-full p-4 min-h-screen bg-background text-foreground">
                <Outlet />
            </div>
        </div>
    );
};


export default HomePage;

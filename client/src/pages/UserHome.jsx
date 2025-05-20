import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";


const UserHome = () => {
    const navigate = useNavigate();
    const { username } = useParams();

    const handleCreateNote = () => {
        navigate(`/user/${username}/new`);
    };

    return (
        <>
            <div>UserHome</div>
            <div className='fixed bottom-0 right-0 pr-6 py-24 lg:pb-10'>
                <Button
                    onClick={handleCreateNote}
                    className="bg-black dark:bg-white dark:text-black text-white w-16 h-16 md:w-18 md:h-18 p-0 rounded-full shadow-lg active:scale-95"
                >
                    <SquarePen size={40} style={{width:"2rem" , height:"2rem"}}/>
                </Button>
            </div>
        </>
    );
};

export default UserHome;

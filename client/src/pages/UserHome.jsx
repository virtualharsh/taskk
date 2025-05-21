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
            <div className="fixed bottom-0 right-0 pr-6 py-24 lg:pb-10">
                <Button
                    onClick={handleCreateNote}
                    className="bg-black dark:bg-white dark:text-black text-white w-12 h-12 md:w-14 md:h-14 p-0 rounded-full"
                >
                    <SquarePen className="w-10 h-10 md:w-12 md:h-12" />
                </Button>
            </div>
        </>
    );
};

export default UserHome;

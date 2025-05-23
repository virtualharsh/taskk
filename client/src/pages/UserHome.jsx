import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserHome = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { username } = useParams();

    const handleCreateNote = async () => {
        try {
            const response = await axios.post(`${API_URL}/tasks`, {
                title: "Untitled Note",
                content: "",
                user: username,
            });

            const task = response.data.task;
            navigate(`/user/${username}/${task._id}`);
        } catch (error) {
            console.error("Failed to create task:", error);
            // Optionally show an error notification
        }
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

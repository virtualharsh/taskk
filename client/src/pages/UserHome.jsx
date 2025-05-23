import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UserHome = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { username } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${API_URL}/tasks/user/${username}`);
                setTasks(response.data.tasks);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
                toast.error("Failed to fetch tasks");
            }
        })();
    }, [API_URL, username]);

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
            toast.error("Task creation failed");
        }
    };

    return (
        <>
            <div className="px-4 pt-20 md:py-6">
                <h1 className="text-2xl font-semibold mb-4">Your Notes</h1>

                {tasks.length === 0 ? (
                    <p className="text-gray-500">You have no notes. Create one using the button below.</p>
                ) : (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                onClick={() => navigate(`/user/${username}/${task._id}`)}
                                className="p-4 bg-white dark:bg-zinc-900 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                            >
                                <h2 className="font-medium text-lg truncate">{task.title || "Untitled"}</h2>
                                <p className="text-sm text-zinc-500 mt-2 line-clamp-3">
                                    {task.content || "No content"}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

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

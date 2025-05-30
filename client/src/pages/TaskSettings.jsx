import axios from "axios";
import { toast } from "sonner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";

const TaskSettings = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { taskID, username } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({});

    // Fetch task data
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${API_URL}/tasks/${taskID}`);
                setTask(response.data.task);

            } catch (err) {
                console.error("Error fetching task:", err);
                toast.error("Failed to load note.");
                navigate("/NotFound");
            }
        };

        if (taskID) {
            fetchTask();
        }
    }, [taskID]);

    const switchVisibility = async () => {
        try {

            const toggleShared = !task.isPublic;

            const response = await axios.put(`${API_URL}/tasks/${task._id}/share`, {
                isShared: toggleShared,
            });

            toast.success(`Note is now ${toggleShared ? "public" : "private"}`);

            setTask(response.data.task);

        } catch (error) {
            console.error("Failed to toggle share:", error);
            toast.error("Failed to toggle share status");
        }
    };

    const deleteTask = async () => {
        try {
            const response = await axios.delete(`${API_URL}/tasks/${task._id}`);
            setTask({})
            toast.success(response.data.message);
            navigate(`/user/${username}`)
        } catch (error) {
            console.error("Failed to delete task:", error);
            toast.error("Failed to delete task");
        }
    };


    return (
        <div className="p-3 mt-10 md:p-0 md:py-2 md:mt-0">
            <div className="hidden md:flex">
                <h1 className="text-xl mb-4 text-zinc-500">{task.title}'s Settings</h1>
            </div>

            {/* Danger Zone */}
            <div className="flex flex-col gap-3 px-4 py-12 md:px-10 max-w-3xl md:mx-auto">
                <h2 className="text-lg font-semibold text-red-600 dark:text-red-700">Danger Zone</h2>
                <div className="border rounded-lg divide-y">

                    {/* Change Visibility */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
                        <div>
                            <h3 className="font-medium">Change task visibility</h3>
                            <p className="text-sm text-muted-foreground">
                                This task is currently {(task.isPublic ? "public" : "private")}.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className="mt-4 md:mt-0"
                            onClick={switchVisibility}
                        >
                            Change to {(task.isPublic ? "private" : "public")}
                        </Button>
                    </div>

                    {/* Delete task */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
                        <div>
                            <h3 className="font-medium">Delete this task</h3>
                            <p className="text-sm text-muted-foreground">
                                Once you delete a task, there is no going back
                            </p>
                        </div>
                        <Button
                            variant="destructive"
                            className="mt-4 md:mt-0"
                            onClick={deleteTask}
                        >
                            Delete this task
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TaskSettings;

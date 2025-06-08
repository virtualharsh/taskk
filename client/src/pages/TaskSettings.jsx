import axios from "axios";
import { toast } from "sonner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Lock, Copy, Eye, EyeOff } from "lucide-react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

const TaskSettings = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const CLIENT = import.meta.env.VITE_CLIENT;
    const { taskID, username } = useParams();
    const [copied, setCopied] = useState(false);
    const [task, setTask] = useState({});
    const navigate = useNavigate();

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
            setTask({});
            toast.success(response.data.message);
            navigate(`/user/${username}`);
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

            {/* Share Settings */}
            <div className="flex flex-col gap-3 px-6 py-6 md:px-10 max-w-3xl md:mx-auto">
                <h2 className="text-lg font-semibold">Sharing</h2>
                <div className="border rounded-lg divide-y overflow-hidden">
                    {/* Share Task Link */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
                        <div>
                            <h3 className="font-medium">Share this task</h3>
                            <p className="text-sm text-muted-foreground">
                                {task.isPublic
                                    ? "Anyone with this link can view the task."
                                    : "Make this task public to share it with the world."}
                            </p>
                        </div>
                        {task.isPublic ? (
                            <Button
                                variant="outline"
                                className="mt-4 md:mt-0"
                                onClick={() => {
                                    const shareURL = `${CLIENT}/task/${task._id}/view`;
                                    navigator.clipboard.writeText(shareURL);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 1500);
                                }}
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                {copied ? "Copied" : "Copy Link"}
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                className="mt-4 md:mt-0 opacity-50 cursor-not-allowed"
                                disabled
                            >
                                <Lock className="w-4 h-4 mr-2" />
                                Private Task
                            </Button>
                        )}
                    </div>
                </div>
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
                                This task is currently {task.isPublic ? "public" : "private"}.
                            </p>
                        </div>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="mt-4 md:mt-0">
                                    {task.isPublic ? (
                                        <>
                                            <EyeOff className="w-4 h-4 mr-2" />
                                            Make Private
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="w-4 h-4 mr-2" />
                                            Make Public
                                        </>
                                    )}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {task.isPublic
                                            ? "Make this task private?"
                                            : "Make this task public?"}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {task.isPublic
                                            ? "Only you will be able to see this task after this."
                                            : "Anyone with the link will be able to see this task."}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={switchVisibility}>
                                        Confirm
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                    {/* Delete task */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
                        <div>
                            <h3 className="font-medium">Delete this task</h3>
                            <p className="text-sm text-muted-foreground">
                                Once you delete a task, there is no going back.
                            </p>
                        </div>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="mt-4 md:mt-0">
                                    Delete this task
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-red-600 dark:text-red-500">
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete the task and all its content.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={deleteTask}
                                        className="bg-red-600 text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskSettings;

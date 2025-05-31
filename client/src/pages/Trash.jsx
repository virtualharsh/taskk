import { Trash, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TrashPage = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { username } = useParams();
    const [trashedTasks, setTrashedTasks] = useState([]);

    useEffect(() => {
        fetchTrashedTasks();
    }, [username]);

    const fetchTrashedTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks/user/${username}/trash`);
            setTrashedTasks(response.data.tasks);
        } catch (error) {
            console.error("Failed to fetch trashed tasks:", error);
            toast.error("Failed to load trash");
        }
    };

    const handleRestore = async (taskId) => {
        try {
            await axios.put(`${API_URL}/tasks/${taskId}/restore`);
            setTrashedTasks((prev) => prev.filter((task) => task._id !== taskId));
            toast.success("Note restored");
        } catch (error) {
            console.error("Restore failed:", error);
            toast.error("Restore failed");
        }
    };

    const handlePermanentDelete = async (taskId) => {
        try {
            await axios.put(`${API_URL}/tasks/${taskId}/delete`);
            setTrashedTasks((prev) => prev.filter((task) => task._id !== taskId));
            toast.success("Permanently deleted");
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Permanent delete failed");
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 lg:pt-6 pb-20 md:pb-24">
                <div className="space-y-6">
                    <section>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Trash className="w-5 h-5" />
                                Trash
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Notes you've deleted. You can restore or permanently remove them.
                            </p>
                        </div>

                        {trashedTasks.length === 0 ? (
                            <div className="flex items-center justify-center h-60">
                                <p className="text-gray-500 text-sm text-center">Your trash is empty.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {trashedTasks.map((task) => (
                                    <Card key={task._id} className="relative group">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="truncate text-base">
                                                {task.title || "Untitled"}
                                            </CardTitle>
                                            <CardDescription className="text-sm line-clamp-2 mt-1 text-gray-500 dark:text-gray-400">
                                                {task.content || "No content"}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-2 flex justify-between gap-2">
                                            <Button
                                                variant="outline"
                                                className="text-sm px-3"
                                                onClick={() => handleRestore(task._id)}
                                            >
                                                <RotateCcw className="w-4 h-4 mr-1" />
                                                Restore
                                            </Button>
                                            
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        className="text-sm px-3"
                                                    >
                                                        Delete
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Permanently delete note?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete "{task.title || "Untitled"}" and remove it from our servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction 
                                                            onClick={() => handlePermanentDelete(task._id)}
                                                            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
                                                        >
                                                            Delete Permanently
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TrashPage;
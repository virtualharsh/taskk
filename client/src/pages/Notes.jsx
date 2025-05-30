import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const Notes = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const { taskID, username } = useParams();
    const navigate = useNavigate();

    // Auto-resize the content textarea
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.height = "auto";
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
        }
    }, [task.content]);

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

    // Focus title on mount
    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    // Update task content
    const handleChange = (key, value) => {
        setTask((prev) => ({ ...prev, [key]: value }));
    };

    // Save task
    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);

            const payload = {
                ...task,
                title: task.title || "Untitled",
                username,
                taskID,
            };

            await axios.put(`${API_URL}/tasks/${taskID}`, payload);
            toast.success("Note updated successfully!");
        } catch (err) {
            console.error("Save error:", err);
            setError("Failed to save note. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="p-3 mt-10 md:p-0 md:py-2 md:mt-0">
                <div className="hidden md:flex">
                    <h1 className="text-xl mb-4 text-zinc-500">{task.title}</h1>
                </div>

                <div className="flex flex-col gap-4 px-4 py-12 md:px-10 max-w-3xl md:mx-auto">
                    {/* Editable Title */}
                    <textarea
                        id="title"
                        ref={titleRef}
                        value={task.title || ""}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Untitled"
                        className="w-full text-3xl font-semibold outline-none bg-transparent text-foreground resize-none overflow-hidden"
                        style={{ height: "40px", border: "none", padding: "0px" }}
                        rows={1}
                    />

                    {/* Editable Body */}
                    <textarea
                        id="taskbody"
                        ref={contentRef}
                        value={task.content || ""}
                        onChange={(e) => handleChange("content", e.target.value)}
                        placeholder="Start writing your note..."
                        className="w-full min-h-32 text-base leading-7 text-foreground outline-none bg-transparent resize-none overflow-hidden"
                        style={{ border: "none", padding: "0px" }}
                    />

                    <Button
                        variant="outline"
                        className="mt-6 w-max"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Note"}
                    </Button>

                    {error && <p className="text-red-600 mt-2">{error}</p>}
                </div>
            </div>

            {/* Settings Floating Button */}
            <div className="fixed bottom-0 right-0 pr-6 pb-24 lg:pb-10">
                <Button
                    className="bg-black dark:bg-white dark:text-black text-white w-12 h-12 md:w-14 md:h-14 p-0 rounded-full"
                    aria-label="Settings"
                    onClick={() =>
                        navigate(`/user/${username}/${taskID}/settings`)
                    }
                >
                    <Settings className="w-10 h-10 md:w-12 md:h-12" />
                </Button>
            </div>
        </>
    );
};

export default Notes;

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {toast} from "sonner"
import { useNavigate, useParams } from "react-router-dom";

const Notes = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [dbTitle, setdbTitle] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const contentRef = useRef(null);
    const { taskID, username } = useParams();
    const navigate = useNavigate()


    // Auto-resize the content textarea
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.height = "auto";
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
        }
    }, [content]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${API_URL}/tasks/${taskID}`);
                const task = response.data.task;
                setTitle(task.title);
                setdbTitle(task.title);
                setContent(task.content);
            } catch (err) {
                console.error("Error fetching task:", err);
                toast.error("Failed to load note.");
                navigate('/NotFound')
            }
        };

        if (taskID) {
            fetchTask();
        }
    }, [taskID]);

    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);

            const payload = {
                title: title || "Untitled",
                content,
                username,
                taskID
            };

            const response = await axios.put(`${API_URL}/tasks/${taskID}`, payload);
            setLoading(false);
            toast.success("Note saved successfully!");
            

        } catch (err) {
            setLoading(false);
            setError("Failed to save note. Try again.");
            console.error("Save error:", err);
        }
    };

    return (
        <>
            <div className="p-3 mt-10 md:p-0 md:py-2 md:mt-0">
                <div className="hidden md:flex">
                    <h1 className="text-xl mb-4 text-zinc-500">{dbTitle}</h1>
                </div>
                <div className="flex flex-col gap-4 px-4 py-12 md:px-10 max-w-3xl md:mx-auto">
                    {/* Editable Title */}
                    <textarea
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Untitled"
                        className="w-full text-3xl font-semibold outline-none bg-transparent text-foreground resize-none overflow-hidden"
                        style={{ height: "40px", border: "none", padding: "0px" }}
                        rows={1}
                    />

                    {/* Editable Body */}
                    <textarea
                        id="taskbody"
                        ref={contentRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
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

            <div className="fixed bottom-0 right-0 pr-6 pb-24 lg:pb-10">
                <Button
                    className="bg-black dark:bg-white dark:text-black text-white w-12 h-12 md:w-14 md:h-14 p-0 rounded-full"
                    aria-label="Settings"
                >
                    <Settings className="w-10 h-10 md:w-12 md:h-12" />
                </Button>
            </div>
        </>
    );
};

export default Notes;

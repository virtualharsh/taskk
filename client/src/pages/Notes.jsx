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
    const [cursorPosition, setCursorPosition] = useState(0);
    const { taskID, username } = useParams();
    const navigate = useNavigate();

    const syncHeights = () => {
        if (contentRef.current) {
            contentRef.current.style.height = "auto";
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
        }
    };

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.height = "auto";
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
        }
        requestAnimationFrame(() => {
            syncHeights();
        });
    }, [task.content]);

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

        if (taskID) fetchTask();
    }, [taskID]);

    useEffect(() => {
        if (task.title === "Untitled Note" && titleRef.current) {
            titleRef.current.focus();
            setTimeout(() => titleRef.current?.select(), 100);
        }
    }, [task.title]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault();
                handleSave();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [task]);

    const handleChange = (key, value) => {
        setTask((prev) => ({ ...prev, [key]: value }));
    };

    const handleContentChange = (e) => {
        const value = e.target.value;
        setCursorPosition(e.target.selectionStart);
        handleChange("content", value);
        requestAnimationFrame(() => {
            syncHeights();
        });
    };

    const handleTextareaFocus = (e) => setCursorPosition(e.target.selectionStart);
    const handleTextareaClick = (e) => setCursorPosition(e.target.selectionStart);
    const handleTextareaKeyUp = (e) => setCursorPosition(e.target.selectionStart);

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
                    <textarea
                        id="title"
                        ref={titleRef}
                        value={(task.title || "").replace(/\n/g, "")}
                        onChange={(e) => handleChange("title", e.target.value.replace(/\n/g, ""))}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") e.preventDefault();
                        }}
                        placeholder="Untitled"
                        className="w-full text-3xl font-semibold outline-none bg-transparent text-foreground resize-none overflow-hidden"
                        style={{ height: "40px", border: "none", padding: "0px" }}
                        rows={1}
                    />

                    <div className="relative w-full min-h-32">
                        <textarea
                            id="taskbody"
                            ref={contentRef}
                            value={task.content || ""}
                            onChange={handleContentChange}
                            onFocus={handleTextareaFocus}
                            onClick={handleTextareaClick}
                            onKeyUp={handleTextareaKeyUp}
                            placeholder="Start writing your note..."
                            className="w-full min-h-32 text-base text-foreground caret-black dark:caret-white outline-none bg-transparent resize-none overflow-hidden"
                            style={{
                                border: "none",
                                padding: "0px",
                                margin: "0px",
                                lineHeight: "28px",
                                fontFamily: "inherit",
                                fontSize: "1rem"
                            }}
                        />
                    </div>

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
                    onClick={() => navigate(`/user/${username}/${taskID}/settings`)}
                >
                    <Settings className="w-10 h-10 md:w-12 md:h-12" />
                </Button>
            </div>
        </>
    );
};

export default Notes;


import { Settings, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Undo, Redo, Type, Palette } from "lucide-react";
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
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false
    });
    const { taskID, username } = useParams();
    const navigate = useNavigate();

    // Check which formats are currently active
    const updateActiveFormats = () => {
        if (!contentRef.current) return;

        setActiveFormats({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline')
        });
    };

    // Handle selection change to update toolbar state
    useEffect(() => {
        const handleSelectionChange = () => {
            updateActiveFormats();
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, []);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${API_URL}/tasks/${taskID}`);
                setTask(response.data.task);

                // Set content in the contentEditable div
                if (contentRef.current && response.data.task.content) {
                    contentRef.current.innerHTML = response.data.task.content;
                }
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

    const handleContentInput = () => {
        if (contentRef.current) {
            const content = contentRef.current.innerHTML;
            handleChange("content", content);
        }
    };

    // Formatting functions
    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        contentRef.current?.focus();
        updateActiveFormats();
        handleContentInput();
    };

    const formatText = (command) => {
        execCommand(command);
    };

    const setTextAlign = (alignment) => {
        execCommand('justify' + alignment.charAt(0).toUpperCase() + alignment.slice(1));
    };

    const insertList = (ordered = false) => {
        execCommand(ordered ? 'insertOrderedList' : 'insertUnorderedList');
    };

    const setFontSize = (size) => {
        execCommand('fontSize', size);
    };

    const setTextColor = (color) => {
        execCommand('foreColor', color);
    };

    const setBackgroundColor = (color) => {
        execCommand('backColor', color);
    };

    const undoRedo = (action) => {
        execCommand(action);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);

            const content = contentRef.current ? contentRef.current.innerHTML : '';

            const payload = {
                ...task,
                title: task.title || "Untitled",
                content: content,
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

                <div className="flex flex-col gap-2 sm:gap-4 px-2 sm:px-4 py-6 sm:py-12 md:px-10 max-w-5xl md:mx-auto h-screen overflow-hidden">
                    {/* Title Input */}
                    <textarea
                        id="title"
                        ref={titleRef}
                        value={(task.title || "").replace(/\n/g, "")}
                        onChange={(e) => handleChange("title", e.target.value.replace(/\n/g, ""))}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") e.preventDefault();
                        }}
                        placeholder="Untitled"
                        className="w-full text-xl sm:text-2xl md:text-3xl font-semibold outline-none bg-transparent text-foreground resize-none overflow-hidden"
                        style={{ height: "auto", border: "none", padding: "0px" }}
                        rows={1}
                    />

                    {/* Rich Text Toolbar */}
                    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600 pb-2 mb-2">
                        <div className="flex flex-wrap items-center gap-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                            {/* Undo/Redo */}
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => undoRedo('undo')}
                                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                                    title="Undo"
                                >
                                    <Undo className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => undoRedo('redo')}
                                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                                    title="Redo"
                                >
                                    <Redo className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                            </div>

                            <div className="w-px h-5 sm:h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                            {/* Font Size - Hidden on mobile */}
                            <select
                                id="selectheading"
                                onChange={(e) => setFontSize(e.target.value)}
                                className="hidden sm:block h-7 sm:h-8 px-1 sm:px-2 text-xs sm:text-sm border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                title="Font Size"
                            >
                                <option value="1">Small</option>
                                <option value="2">Normal</option>
                                <option value="3" defaultValue>Medium</option>
                                <option value="4">Large</option>
                                <option value="5">X-Large</option>
                                <option value="6">XX-Large</option>
                            </select>

                            <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                            {/* Basic Formatting */}
                            <div className="flex items-center gap-1">
                                <Button
                                    variant={activeFormats.bold ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => formatText('bold')}
                                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 font-bold"
                                    title="Bold"
                                >
                                    <Bold className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                                <Button
                                    variant={activeFormats.italic ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => formatText('italic')}
                                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 italic"
                                    title="Italic"
                                >
                                    <Italic className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                                <Button
                                    variant={activeFormats.underline ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => formatText('underline')}
                                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 underline"
                                    title="Underline"
                                >
                                    <Underline className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                            </div>

                            <div className="w-px h-5 sm:h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                            {/* Text Color - Simplified for mobile */}
                            <div className="flex items-center gap-1">
                                <label className="cursor-pointer flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="Text Color">
                                    <Type className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <input
                                        type="color"
                                        onChange={(e) => setTextColor(e.target.value)}
                                        className="w-0 h-0 opacity-0 absolute"
                                    />
                                </label>
                                <label className="cursor-pointer flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="Background Color">
                                    <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <input
                                        type="color"
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        className="w-0 h-0 opacity-0 absolute"
                                    />
                                </label>
                            </div>

                            <div className="w-px h-5 sm:h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                            {/* Alignment - Hidden on small mobile */}
                            <div className="hidden xs:flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setTextAlign('left')}
                                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                                    title="Align Left"
                                >
                                    <AlignLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setTextAlign('center')}
                                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                                    title="Align Center"
                                >
                                    <AlignCenter className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setTextAlign('right')}
                                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                                    title="Align Right"
                                >
                                    <AlignRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                            </div>

                            <div className="hidden xs:block w-px h-5 sm:h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                            {/* Lists */}
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => insertList(false)}
                                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                                    title="Bullet List"
                                >
                                    <List className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => insertList(true)}
                                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                                    title="Numbered List"
                                >
                                    <ListOrdered className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Rich Text Content Area */}
                    <div className="relative w-full border rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-600 flex flex-col">
                        <div
                            className="flex-1 overflow-y-auto p-3 sm:p-4"
                            style={{
                                height: 'calc(100vh - 380px)',
                                minHeight: '300px',
                                maxHeight: '70vh'
                            }}
                        >
                            <div
                                ref={contentRef}
                                contentEditable={true}
                                onInput={handleContentInput}
                                onFocus={updateActiveFormats}
                                onMouseUp={updateActiveFormats}
                                onKeyUp={updateActiveFormats}
                                className="w-full min-h-full text-sm sm:text-base text-foreground outline-none"
                                style={{
                                    lineHeight: "1.6",
                                    fontFamily: "inherit",
                                    fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
                                    wordWrap: "break-word",
                                    overflowWrap: "break-word"
                                }}
                                suppressContentEditableWarning={true}
                                data-placeholder="Start writing your note..."
                            />
                        </div>

                        {/* Placeholder styling */}
                        <style>{`
                            [contenteditable]:empty:before {
                                content: attr(data-placeholder);
                                color: #9ca3af;
                                pointer-events: none;
                                font-style: italic;
                            }

                            .overflow-y-auto::-webkit-scrollbar {
                                width: 8px;
                            }

                            .overflow-y-auto::-webkit-scrollbar-track {
                                background: #f1f5f9;
                                border-radius: 4px;
                            }

                            .dark .overflow-y-auto::-webkit-scrollbar-track {
                                background: #374151;
                            }

                            .overflow-y-auto::-webkit-scrollbar-thumb {
                                background: #cbd5e1;
                                border-radius: 4px;
                            }

                            .dark .overflow-y-auto::-webkit-scrollbar-thumb {
                                background: #6b7280;
                            }

                            .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                                background: #94a3b8;
                            }

                            .dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                                background: #9ca3af;
                            }`}</style>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-4 sm:mt-6">
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={handleSave}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Note"}
                        </Button>

                        {error && <p className="text-red-600 text-sm">{error}</p>}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 right-0 pr-3 sm:pr-6 pb-16 sm:pb-24 lg:pb-10">
                <Button
                    className="bg-black dark:bg-white dark:text-black text-white w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 p-0 rounded-full shadow-lg"
                    aria-label="Settings"
                    onClick={() => navigate(`/user/${username}/${taskID}/settings`)}
                >
                    <Settings className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                </Button>
            </div>
        </>
    );
};

export default Notes;
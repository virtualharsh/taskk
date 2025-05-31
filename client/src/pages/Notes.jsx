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
    const renderRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState(0);
    const { taskID, username } = useParams();
    const navigate = useNavigate();

    // Calculate cursor position in rendered content
    const calculateCursorPosition = (textContent, cursorPos) => {
        if (!textContent || cursorPos === 0) return { top: 0, left: 0 };
        
        const lines = textContent.substring(0, cursorPos).split('\n');
        const currentLineIndex = lines.length - 1;
        const currentLineContent = lines[currentLineIndex];
        
        // Calculate vertical position based on line heights
        let topOffset = 0;
        const allLines = textContent.split('\n');
        
        for (let i = 0; i < currentLineIndex; i++) {
            const line = allLines[i];
            if (line.match(/^#{1,6}\s/)) {
                const level = line.match(/^#+/)[0].length;
                const headerHeights = {
                    1: 32, // text-2xl
                    2: 24, // text-xl
                    3: 20, // text-lg
                    4: 16, // text-base
                    5: 16, // text-base
                    6: 14  // text-sm
                };
                topOffset += headerHeights[level] * 1.75; // line-height factor
            } else {
                topOffset += 16 * 1.75; // Regular line height (text-base * line-height)
            }
        }
        
        return { top: topOffset, currentLineContent };
    };

    // Auto-resize function for both textarea and rendered content
    const syncHeights = () => {
        if (contentRef.current && renderRef.current) {
            // Reset heights to auto to get accurate scrollHeight
            contentRef.current.style.height = "auto";
            renderRef.current.style.height = "auto";
            
            // Get the maximum height needed
            const textareaScrollHeight = contentRef.current.scrollHeight;
            const renderScrollHeight = renderRef.current.scrollHeight;
            const maxHeight = Math.max(textareaScrollHeight, renderScrollHeight);
            
            // Apply the same height to both elements
            contentRef.current.style.height = maxHeight + "px";
            renderRef.current.style.height = maxHeight + "px";
        }
    };

    // Auto-resize the content textarea and sync with rendered content
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.height = "auto";
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
        }
        
        // Use requestAnimationFrame to ensure DOM is updated before syncing
        requestAnimationFrame(() => {
            syncHeights();
        });
    }, [task.content]);

    // Fetch task data
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${API_URL}/tasks/${taskID}`);
                const fetchedTask = response.data.task;
                setTask(fetchedTask);
                
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

    // Focus and select title if it's "Untitled"
    useEffect(() => {
        if (task.title === "Untitled Note" && titleRef.current) {
            titleRef.current.focus();
            // Use setTimeout to ensure the DOM is fully updated
            setTimeout(() => {
                if (titleRef.current) {
                    titleRef.current.select();
                }
            }, 100);
        }
    }, [task.title]);

    // Add Ctrl+S save functionality
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault(); // Prevent browser's default save dialog
                handleSave();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [task]); // Include task as dependency so handleSave has access to current task data

    // Improved markdown parsing function with uniform line heights for cursor sync
    const parseMarkdown = (text) => {
        if (!text) return '';
        
        const lines = text.split('\n');
        const parsedLines = lines.map((line, index) => {
            // Headers (H1-H6) - use larger font but same line height as textarea
            if (line.match(/^#{1,6}\s/)) {
                const level = line.match(/^#+/)[0].length;
                const content = line.replace(/^#+\s/, '');
                const fontWeight = 'font-bold';
                const fontSize = {
                    1: 'text-2xl',
                    2: 'text-xl', 
                    3: 'text-lg',
                    4: 'text-base',
                    5: 'text-base',
                    6: 'text-sm'
                };
                // Use the same line-height as textarea for cursor alignment
                return `<div class="${fontSize[level]} ${fontWeight}" style="line-height: 28px; height: 28px; margin: 0; padding: 0; display: flex; align-items: baseline;">${parseInlineMarkdown(content)}</div>`;
            }
            
            // Unordered lists
            if (line.match(/^[-*+]\s/)) {
                const content = line.replace(/^[-*+]\s/, '');
                return `<div style="line-height: 28px; height: 28px; margin: 0; padding: 0; display: flex; align-items: baseline;">&nbsp;&nbsp;&nbsp;&nbsp;• ${parseInlineMarkdown(content)}</div>`;
            }
            
            // Ordered lists
            if (line.match(/^\d+\.\s/)) {
                const match = line.match(/^(\d+)\.\s(.*)$/);
                if (match) {
                    const number = match[1];
                    const content = match[2];
                    return `<div style="line-height: 28px; height: 28px; margin: 0; padding: 0; display: flex; align-items: baseline;">&nbsp;&nbsp;&nbsp;&nbsp;${number}. ${parseInlineMarkdown(content)}</div>`;
                }
            }
            
            // Empty lines - preserve with a single space to maintain structure
            if (line.trim() === '') {
                return `<div style="line-height: 28px; height: 28px; margin: 0; padding: 0;">&nbsp;</div>`;
            }
            
            // Regular paragraph
            return `<div style="line-height: 28px; height: 28px; margin: 0; padding: 0; display: flex; align-items: baseline;">${parseInlineMarkdown(line)}</div>`;
        });
        
        return parsedLines.join('');
    };

    // Parse inline markdown (bold, italic, underline)
    const parseInlineMarkdown = (text) => {
        if (!text) return '';
        
        // Bold with **text** or __text__
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
        
        // Italic with *text* or _text_ (but not if already processed as bold)
        text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
        text = text.replace(/(?<!_)_([^_]+)_(?!_)/g, '<em>$1</em>');
        
        // Underline with ++text++
        text = text.replace(/\+\+(.*?)\+\+/g, '<u>$1</u>');
        
        return text;
    };

    // Update task content
    const handleChange = (key, value) => {
        setTask((prev) => ({ ...prev, [key]: value }));
    };

    // Handle content change with cursor position tracking and height sync
    const handleContentChange = (e) => {
        const value = e.target.value;
        const position = e.target.selectionStart;
        setCursorPosition(position);
        handleChange("content", value);
        
        // Sync heights after content change
        setTimeout(() => {
            syncHeights();
        }, 0);
    };

    // Handle focus and click events to track cursor
    const handleTextareaFocus = (e) => {
        setCursorPosition(e.target.selectionStart);
    };

    const handleTextareaClick = (e) => {
        setCursorPosition(e.target.selectionStart);
    };

    const handleTextareaKeyUp = (e) => {
        setCursorPosition(e.target.selectionStart);
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

                    {/* Rich Text Editor Container */}
                    <div className="relative w-full min-h-32">
                        {/* Hidden textarea for input */}
                        <textarea
                            id="taskbody"
                            ref={contentRef}
                            value={task.content || ""}
                            onChange={handleContentChange}
                            onFocus={handleTextareaFocus}
                            onClick={handleTextareaClick}
                            onKeyUp={handleTextareaKeyUp}
                            placeholder="Start writing your note..."
                            className="absolute inset-0 w-full min-h-32 text-base text-transparent caret-black dark:caret-white outline-none bg-transparent resize-none overflow-hidden z-10"
                            style={{ 
                                border: "none", 
                                padding: "0px",
                                margin: "0px",
                                lineHeight: "28px",
                                color: "transparent",
                                background: "transparent",
                                fontFamily: "inherit",
                                fontSize: "1rem"
                            }}
                        />
                        
                        {/* Rendered markdown content */}
                        <div
                            ref={renderRef}
                            className="absolute inset-0 w-full min-h-32 text-base text-foreground pointer-events-none overflow-hidden z-0"
                            style={{ 
                                border: "none", 
                                padding: "0px",
                                margin: "0px",
                                lineHeight: "28px",
                                fontFamily: "inherit",
                                fontSize: "1rem",
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word"
                            }}
                            dangerouslySetInnerHTML={{ 
                                __html: task.content ? parseMarkdown(task.content) : '<div style="line-height: 28px; height: 28px; margin: 0; padding: 0; color: #9ca3af;">Start writing your note...</div>'
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
                    
                    {/* Markdown Syntax Help */}
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                        <strong>Markdown Syntax:</strong><br/>
                        # H1, ## H2, ### H3, #### H4, ##### H5, ###### H6<br/>
                        **bold** or __bold__, *italic* or _italic_, ++underline++<br/>
                        - or * for bullet lists, 1. for numbered lists
                    </div>
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
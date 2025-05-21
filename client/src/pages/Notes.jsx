import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const Notes = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const contentRef = useRef(null);

    // Auto-resize the content textarea
    useEffect(() => {
        if (contentRef.current) {
            // Reset height to auto to get the correct scrollHeight
            contentRef.current.style.height = "auto";
            // Set the height to scrollHeight to accommodate all content
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
        }
    }, [content]);

    const handleSave = () => {
        console.log("Saving note...", { title, content });
        // You can hook this into Supabase, a database, or state store
    };

    return (
        <>
            <div className="p-3 mt-10 md:p-0 md:py-2 md:mt-0">
                <div className="hidden md:flex">
                    <h1 className="text-xl mb-4">Note title</h1>
                </div>
                <div className="flex flex-col gap-4 px-4 py-12 md:px-10 max-w-3xl md:mx-auto">
                    {/* Editable Title - Using textarea instead of contentEditable */}
                    <textarea
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Untitled"
                        className="w-full text-3xl font-semibold outline-none bg-transparent text-foreground resize-none overflow-hidden"
                        style={{
                            height: "40px",
                            border: "none",
                            padding: "0px"
                        }}
                        rows={1}
                    />

                    {/* Editable Body - Using textarea instead of contentEditable */}
                    <textarea
                        id="taskbody"
                        ref={contentRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing your note..."
                        className="w-full min-h-32 text-base leading-7 text-foreground outline-none bg-transparent resize-none overflow-hidden"
                        style={{ border: "none", padding: "0px" }}
                    />

                    <Button variant="outline" className="mt-6 w-max" onClick={handleSave}>
                        Save Note
                    </Button>
                </div>
            </div>

            <div className="fixed bottom-0 right-0 pr-6 pb-24 lg:pb-10">
                <Button
                    className="bg-black dark:bg-white dark:text-black text-white w-12 h-12 md:w-14 md:h-14 p-0 rounded-full"
                >
                    <Settings className="w-10 h-10 md:w-12 md:h-12" />
                </Button>
            </div>

        </>
    );
};

export default Notes;
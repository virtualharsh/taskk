import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import ModeToggle from "@/components/mode-toggle";


const ViewTask = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { taskID } = useParams();
    const [task, setTask] = useState({});
    const contentRef = useRef(null);
    const navigate = useNavigate();

    // Auto-resize textarea
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.height = "auto";
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
        }
    }, [task.content]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${API_URL}/tasks/${taskID}/view`);
                setTask(response.data);
            } catch (error) {
                console.error("Error fetching public task:", error);
                toast.error("Unable to view task.");
                navigate("/NotFound");
            }
        };

        if (taskID) {
            fetchTask();
        }
    }, [taskID]);

    return (
        <div className="p-3 mt-10 md:p-0 md:py-4 md:px-4 md:mt-0">
            <div className="hidden md:flex">
                <h1 className="text-xl mb-4 text-zinc-500">{task.title}</h1>
            </div>

            <div className="fixed flex gap-2 md:gap-3 items-center justify-start right-0 top-0 p-4 md:pr-6 z-50">
                <div>
                    <ModeToggle size={24} />
                </div>
            </div>

            <div className="flex flex-col gap-4 px-4 py-12 md:px-4 max-w-3xl md:mx-auto">
                {/* Readonly Title */}
                <textarea
                    value={task.title || ""}
                    readOnly
                    className="w-full text-3xl font-semibold outline-none bg-transparent text-foreground resize-none overflow-hidden"
                    style={{ height: "40px", border: "none", padding: "0px" }}
                    rows={1}
                />

                {/* Readonly Body */}
                <textarea
                    ref={contentRef}
                    value={task.content || ""}
                    readOnly
                    placeholder="No content available."
                    className="w-full min-h-32 text-base leading-7 text-foreground outline-none bg-transparent resize-none overflow-hidden"
                    style={{ border: "none", padding: "0px" }}
                />
            </div>
        </div>
    );
};

export default ViewTask;

import { SquarePen, Star, StarOff, Users, Lock, CheckSquare, Calendar, Lightbulb, FileText, Target, Coffee, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TaskCard from "../components/TaskCard";

const UserHome = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { username } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, [username]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks/user/${username}`);
            setTasks(response.data.tasks);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
            toast.error("Failed to fetch tasks");
        }
    };

    const handleCreateNote = async (templateTitle = "Untitled Note", templateContent = "") => {
        try {
            const response = await axios.post(`${API_URL}/tasks`, {
                title: templateTitle,
                content: templateContent,
                user: username,
            });

            const task = response.data.task;
            navigate(`/user/${username}/${task._id}`);
        } catch (error) {
            console.error("Failed to create task:", error);
            toast.error("Task creation failed");
        }
    };

    const toggleFavorite = async (taskId, currentFavorite) => {
        try {
            await axios.put(`${API_URL}/tasks/${taskId}/favorite`, {
                favorite: !currentFavorite,
            });

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === taskId ? { ...task, favorite: !currentFavorite } : task
                )
            );
        } catch (error) {
            console.error("Failed to toggle favorite:", error);
            toast.error("Failed to toggle favorite");
        }
    };

    const handleDeleteTask = async (taskId, e) => {
        e.stopPropagation();
        try {
            await axios.delete(`${API_URL}/tasks/${taskId}`);
            setTasks((prev) => prev.filter((task) => task._id !== taskId));
            toast.success("Note deleted successfully");
        } catch (error) {
            console.error("Failed to delete task:", error);
            toast.error("Failed to delete note");
        }
    };

    // Categorize tasks
    const favoriteTasks = tasks.filter((task) => task.favorite);
    const sharedTasks = []; // Empty for now, will implement later
    const privateTasks = tasks.filter((task) => !task.favorite);

    // Task templates
    const taskTemplates = [
        {
            id: 1,
            title: "To-Do List",
            description: "Simple checklist for daily tasks",
            icon: CheckSquare,
            content: "# To-Do List\n\n- [ ] Task 1\n- [ ] Task 2\n- [ ] Task 3\n\n## Completed\n- [x] Completed task"
        },
        {
            id: 2,
            title: "Meeting Notes",
            description: "Template for meeting documentation",
            icon: FileText,
            content: "# Meeting Notes\n\n**Date:** \n**Attendees:** \n**Agenda:** \n\n## Discussion Points\n\n## Action Items\n\n## Next Steps"
        },
        {
            id: 3,
            title: "Daily Journal",
            description: "Daily reflection and planning",
            icon: Calendar,
            content: "# Daily Journal - \n\n## Today's Goals\n\n## What I Accomplished\n\n## Challenges Faced\n\n## Tomorrow's Priorities\n\n## Gratitude"
        },
        {
            id: 4,
            title: "Project Planning",
            description: "Project outline and milestones",
            icon: Target,
            content: "# Project: \n\n## Overview\n\n## Objectives\n\n## Timeline\n\n## Resources Needed\n\n## Milestones\n- [ ] Milestone 1\n- [ ] Milestone 2\n- [ ] Milestone 3\n\n## Risks & Mitigation"
        },
        {
            id: 5,
            title: "Ideas & Brainstorming",
            description: "Capture creative thoughts",
            icon: Lightbulb,
            content: "# Ideas & Brainstorming\n\n## Topic: \n\n### Initial Thoughts\n\n### Potential Solutions\n\n### Next Steps\n\n### Resources to Explore"
        },
        {
            id: 6,
            title: "Recipe",
            description: "Cooking recipe template",
            icon: Coffee,
            content: "# Recipe: \n\n**Prep Time:** \n**Cook Time:** \n**Servings:** \n\n## Ingredients\n- \n- \n- \n\n## Instructions\n1. \n2. \n3. \n\n## Notes"
        }
    ];

    const renderTasks = (taskList, emptyMessage) =>
        taskList.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[200px]">
                <p className="text-gray-500 text-center text-sm">{emptyMessage}</p>
            </div>
        ) : (
            <div className="space-y-3">
                {taskList.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onToggleFavorite={toggleFavorite}
                        onDelete={handleDeleteTask}
                    />
                ))}
            </div>
        );


    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 lg:pt-6 pb-20 md:pb-24">
                <div className="space-y-6 md:space-y-8">

                    {/* Recently Viewed Tasks */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                Recently Viewed
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-4">
                                Quick access to your recent notes
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {/* Render up to 3 recent tasks */}
                                {tasks.slice(0, 3).map((task) => (
                                    <Card
                                        key={task._id}
                                        className="cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 h-[120px] flex flex-col"
                                        onClick={() => navigate(`/user/${username}/${task._id}`)}
                                    >
                                        <CardHeader className="pb-2 flex-1 flex flex-col justify-center">
                                            <CardTitle className="truncate text-sm sm:text-base mb-1">
                                                {task.title || "Untitled"}
                                            </CardTitle>
                                            <CardDescription className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">
                                                {task.content || "No content"}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}

                                {/* Create New Note Card */}
                                <Card
                                    onClick={() => handleCreateNote()}
                                    className="flex items-center justify-center cursor-pointer border-2 border-dashed hover:border-gray-400 hover:shadow-sm transition-all duration-200 h-[120px] group"
                                >
                                    <div className="flex flex-col items-center justify-center text-center space-y-2 p-4">
                                        <SquarePen className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                                            New Note
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Three Column Layout - Fixed Height */}
                    <section>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                            {/* Shared Notes */}
                            <Card className="flex flex-col">
                                <CardHeader className="pb-3 flex-shrink-0 border-b">
                                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                                        <Users className="w-4 h-4 md:w-5 md:h-5 " />
                                        Shared
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        Notes shared with others
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4 flex-grow">
                                    <div className="h-80 sm:h-96 overflow-y-auto overflow-x-hidden duration-200 hide-scrollbar">
                                        {renderTasks(sharedTasks, "No shared notes yet")}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Private Notes */}
                            <Card className="flex flex-col">
                                <CardHeader className="pb-3 flex-shrink-0 border-b">
                                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                                        <Lock className="w-4 h-4 md:w-5 md:h-5 " />
                                        Private
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        Your personal notes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4 flex-grow">
                                    <div className="h-80 sm:h-96 overflow-y-auto overflow-x-hidden hide-scrollbar">
                                        {renderTasks(privateTasks, "No private notes yet")}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Favorite Notes */}
                            <Card className="flex flex-col">
                                <CardHeader className="pb-3 flex-shrink-0 border-b">
                                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                                        <Star className="w-4 h-4 md:w-5 md:h-5 " />
                                        Favorites
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        Your starred notes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4 flex-grow">
                                    <div className="h-80 sm:h-96 overflow-y-auto overflow-x-hidden duration-200 hide-scrollbar">
                                        {renderTasks(favoriteTasks, "No favorite notes yet")}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Task Templates */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                                Quick Start Templates
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                                Get started quickly with pre-made templates
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                            {taskTemplates.map((template) => {
                                const IconComponent = template.icon;
                                return (
                                    <Card
                                        key={template.id}
                                        className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 border-2 hover:border-gray-300 dark:hover:border-gray-700"
                                    >
                                        <CardHeader className="pb-3">
                                            <CardTitle className="flex items-center gap-3 text-sm sm:text-base">
                                                <div className="p-2 rounded-lg">
                                                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                                </div>
                                                <span className="truncate font-semibold">{template.title}</span>
                                            </CardTitle>
                                            <CardDescription className="text-xs sm:text-sm mt-2 leading-relaxed">
                                                {template.description}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-4 md:right-6 pb-20 pr-5 md:pb-0 z-50">
                <Button
                    onClick={() => handleCreateNote()}
                    className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white w-12 h-12 sm:w-14 sm:h-14 p-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                    size="icon"
                >
                    <SquarePen className="w-6 h-6 sm:w-8 sm:h-8" />
                </Button>
            </div>
        </div>
    );
};

export default UserHome;
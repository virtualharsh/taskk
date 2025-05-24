import { Star, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

const TaskCard = ({ task, onToggleFavorite, onDelete }) => {
    const navigate = useNavigate();
    const { username } = useParams();

    return (
        <div
            className="relative p-3 sm:p-4 bg-white dark:bg-zinc-900 border rounded-lg transition-all duration-200 cursor-pointer group"
            onClick={() => navigate(`/user/${username}/${task._id}`)}
        >
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 z-10">
                <Button
                    variant="icon"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400  transition-all duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(task._id, task.favorite);
                    }}
                >
                    {task.favorite ? (
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ) : (
                        <Star className="w-4 h-4 text-yellow-600" />
                    )}
                </Button>

                <Button
                    variant="icon"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-transparent transition-all duration-200"
                    onClick={(e) => onDelete(task._id, e)}
                >
                    <Trash className="w-4 h-4" />
                </Button>
            </div>

            <div className="pr-16">
                <h3 className="font-medium text-sm sm:text-base truncate mb-1">
                    {task.title || "Untitled"}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 line-clamp-2">
                    {task.content || "No content"}
                </p>
            </div>
        </div>
    );
};

export default TaskCard;

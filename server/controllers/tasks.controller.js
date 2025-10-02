const { Task, STATUS } = require('../models/task.model');

// Create new task
const handleCreateTask = async (req, res) => {
    try {
        const { title, content, user } = req.body;

        if (!title || !user) {
            return res.status(400).json({ message: "Title and user are required." });
        }

        const newTask = new Task({
            title,
            content,
            user,
        });

        const savedTask = await newTask.save();
        return res.status(201).json({ message: "Task created successfully", task: savedTask });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Update task content/title
const handleUpdateTask = async (req, res) => {
    try {
        const title = req.body.title;
        const content = req.body.content;
        const taskId = req.params.taskID;

        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (content !== undefined) updateFields.content = content;

        const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found." });
        }

        return res.json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Get single task by ID
const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskID;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }
        if(task.status!=1){
            return res.status(404).json({ message: "Task not found." });
        }

        return res.status(200).json({ task });
    } catch (error) {
        console.error("Error fetching task:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Get all tasks by username with status 1
const getTasksByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const tasks = await Task.find({ user: username, status: 1 }).sort({ updatedAt: -1 });        
        res.json({ tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
};


// Toggle favorite status
const toggleFavorite = async (req, res) => {
    try {
        const taskId = req.params.taskID;
        const { favorite } = req.body;

        if (typeof favorite !== "boolean") {
            return res.status(400).json({ message: "Favorite must be a boolean." });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { favorite },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found." });
        }

        return res.json({ message: "Favorite status updated", task: updatedTask });
    } catch (error) {
        console.error("Toggle favorite error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const toggleShared = async (req, res) => {
    try {
        const taskId = req.params.taskID;
        const { isShared } = req.body;

        if (typeof isShared !== "boolean") {
            return res.status(400).json({ message: "isShared must be a boolean." });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { isPublic: isShared },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found." });
        }

        return res.json({ message: "Share status updated", task: updatedTask });
    } catch (error) {
        console.error("Share error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const deleteTask = async (req, res) => {
    try {
        const { taskID } = req.params;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskID },
            { status: STATUS.TRASHED },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found or unauthorized." });
        }

        return res.json({ message: "Task moved to trash.", task: updatedTask });
    } catch (error) {
        console.error("Delete task error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const restoreTask = async (req, res) => {
    try {
        const { taskID } = req.params;
        const task = await Task.findByIdAndUpdate(taskID, { status: 1 }, { new: true });
        res.json({ task });
    } catch (error) {
        res.status(500).json({ message: "Restore failed" });
    }
};

const deleteTaskPermanently = async (req, res) => {
    try {
        const { taskID } = req.params;        
        const task = await Task.findByIdAndUpdate(taskID, { status: -1 }, { new: true });
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed" });
    }
};


// GET /tasks/user/:username/trash
const getTrashedTasks = async (req, res) => {
    const { username } = req.params;
    try {
        const tasks = await Task.find({ user: username, status: 0 }).sort({ updatedAt: -1 });        
        res.json({ tasks });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch trashed tasks" });
    }
};

const getPublicTaskById = async (req, res) => {
    const { taskID } = req.params;

    try {
        const task = await Task.findById(taskID).select("title content isPublic status");

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!task.isPublic) {
            return res.status(403).json({ message: "This task is private" });
        }

        if (task.status != 1){
            return res.status(403).json({ message: "This task is deleted" });
        }

        res.json({
            title: task.title,
            content: task.content,
        });
    } catch (error) {
        console.error("Error fetching public task:", error);
        res.status(500).json({ message: "Failed to fetch task" });
    }
};

const addDeadlineToTask = async (req, res) => {
    try {
        const { taskID } = req.params;
        const { deadline } = req.body; // date comes from frontend

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskID },
            { deadline: deadline },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found or unauthorized." });
        }

        return res.json({ message: "Deadline added successfully.", task: updatedTask });
    } catch (error) {
        console.error("Add deadline error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    handleCreateTask,
    handleUpdateTask,
    getTaskById,
    getTasksByUsername,
    toggleFavorite,
    toggleShared,
    deleteTask,
    getTrashedTasks,
    restoreTask,
    deleteTaskPermanently,
    getPublicTaskById,
    addDeadlineToTask,
    
};
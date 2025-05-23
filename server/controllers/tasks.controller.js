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

        return res.status(200).json({ task });
    } catch (error) {
        console.error("Error fetching task:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Get all tasks by username
const getTasksByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const tasks = await Task.find({ user: username }).sort({ updatedAt: -1 });
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

module.exports = {
    handleCreateTask,
    handleUpdateTask,
    getTaskById,
    getTasksByUsername,
    toggleFavorite,
};
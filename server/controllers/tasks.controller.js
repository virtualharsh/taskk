const {Task,STATUS} = require('../models/task.model')

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

const handleUpdateTask = async (req, res) => {
    try {
        const title = req.body.title;
        const content = req.body.content;
        const taskId = req.params.taskID;

        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (content !== undefined) updateFields.content = content;

        // Find and update the task
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



module.exports = {
    handleCreateTask,
    handleUpdateTask,
    getTaskById
};
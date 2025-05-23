const express = require('express')
const {
    handleCreateTask,
    handleUpdateTask,
    getTaskById,
    getTasksByUsername,
    toggleFavorite
} = require('../controllers/tasks.controller')

const taskRouter = express.Router()

taskRouter.post('/',handleCreateTask);
taskRouter.put('/:taskID',handleUpdateTask);
taskRouter.get("/:taskID", getTaskById);
taskRouter.get('/user/:username',getTasksByUsername);
taskRouter.put('/:taskID/favorite', toggleFavorite);

module.exports = taskRouter;
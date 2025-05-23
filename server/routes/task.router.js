const express = require('express')
const {
    handleCreateTask,
    handleUpdateTask,
    getTaskById,
    getTasksByUsername
} = require('../controllers/tasks.controller')

const taskRouter = express.Router()

taskRouter.post('/',handleCreateTask);
taskRouter.put('/:taskID',handleUpdateTask);
taskRouter.get("/:taskID", getTaskById);
taskRouter.get('/user/:username',getTasksByUsername)

module.exports = taskRouter;

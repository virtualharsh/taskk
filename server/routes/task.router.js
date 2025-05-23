const express = require('express')
const {
    handleCreateTask,
    handleUpdateTask,
    getTaskById
} = require('../controllers/tasks.controller')

const taskRouter = express.Router()

taskRouter.post('/',handleCreateTask);
taskRouter.put('/:taskID',handleUpdateTask);
taskRouter.get("/:taskID", getTaskById);


module.exports = taskRouter;

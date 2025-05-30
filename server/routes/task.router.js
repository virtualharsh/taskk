const express = require('express')
const {
    handleCreateTask,
    handleUpdateTask,
    getTaskById,
    getTasksByUsername,
    toggleFavorite,
    toggleShared,
    deleteTask,
    getTrashedTasks,
    deleteTaskPermanently
} = require('../controllers/tasks.controller')

const taskRouter = express.Router()

taskRouter.post('/',handleCreateTask);
taskRouter.put('/:taskID',handleUpdateTask);
taskRouter.get("/:taskID", getTaskById);
taskRouter.delete('/:taskID', deleteTaskPermanently);
taskRouter.put('/:taskID/share', toggleShared);

taskRouter.get('/user/:username',getTasksByUsername);
taskRouter.get('/user/:username/trash',getTrashedTasks);

taskRouter.put('/:taskID/favorite', toggleFavorite);



module.exports = taskRouter;
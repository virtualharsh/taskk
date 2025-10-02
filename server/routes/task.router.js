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
    deleteTaskPermanently,
    restoreTask,
    getPublicTaskById,
    addDeadlineToTask
} = require('../controllers/tasks.controller')

const taskRouter = express.Router()

taskRouter.post('/',handleCreateTask);
taskRouter.put('/:taskID',handleUpdateTask);
taskRouter.get("/:taskID", getTaskById);
taskRouter.delete('/:taskID', deleteTask);
taskRouter.put('/:taskID/share', toggleShared);

taskRouter.get('/:taskID/view', getPublicTaskById);

taskRouter.put('/:taskID/delete', deleteTaskPermanently);
taskRouter.put('/:taskID/restore', restoreTask);

taskRouter.get('/user/:username',getTasksByUsername);
taskRouter.get('/user/:username/trash',getTrashedTasks);

taskRouter.put('/:taskID/favorite', toggleFavorite);

taskRouter.put("/:taskID/deadline", addDeadlineToTask);




module.exports = taskRouter;
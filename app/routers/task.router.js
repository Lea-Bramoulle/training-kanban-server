const { Router } = require('express');
const taskController = require('../controllers/task.controller');

const router = new Router();

router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getOneTask);
router.get('/lists/:id/tasks', taskController.getAllTasksOfOneList);
router.post('/tasks', taskController.createTask);
router.patch('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;

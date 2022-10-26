const { Router } = require('express');
const taskController = require('../controllers/task.controller');

const router = new Router();

router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getOneTask);
router.get('/lists/:id/tasks', taskController.getAllTasksOfOneList);

module.exports = router;

const { Router } = require('express');
const subtaskController = require('../controllers/subTask.controller');

const router = new Router();

router.get('/subtasks', subtaskController.getAllSubtasks);
router.get('/subtasks/:id', subtaskController.getOneSubtask);
router.get('/tasks/:id/subtasks', subtaskController.getAllSubtasksOfOneTask);

module.exports = router;

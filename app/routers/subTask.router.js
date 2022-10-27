const { Router } = require('express');
const subtaskController = require('../controllers/subTask.controller');

const router = new Router();

router.get('/subtasks', subtaskController.getAllSubtasks);
router.get('/subtasks/:id', subtaskController.getOneSubtask);
router.get('/tasks/:id/subtasks', subtaskController.getAllSubtasksOfOneTask);
router.post('/subtasks', subtaskController.createSubtask);
router.patch('/subtasks/:id', subtaskController.updateSubtask);
router.delete('/subtasks/:id', subtaskController.deleteSubtask);

module.exports = router;

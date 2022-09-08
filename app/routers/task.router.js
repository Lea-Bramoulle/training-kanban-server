const taskController = require("./../controllers/task.controller");

const { Router } = require("express");

const router = new Router();

router.get("/tasks", taskController.getAllTasks);

module.exports = router;

const subTaskController = require("./../controllers/subTask.controller");

const { Router } = require("express");

const router = new Router();

router.get("/subTasks", subTaskController.getAllSubTasks);

module.exports = router;

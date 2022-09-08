const listController = require("./../controllers/list.controller");

const { Router } = require("express");

const router = new Router();

router.get("/lists", listController.getAllLists);

module.exports = router;

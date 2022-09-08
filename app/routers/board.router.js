const boardController = require("./../controllers/board.controller");

const { Router } = require("express");

const router = new Router();

router.get("/boards", boardController.getAllBoards);

module.exports = router;

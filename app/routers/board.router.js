const { Router } = require('express');
const boardController = require('../controllers/board.controller');

const router = new Router();

router.get('/boards', boardController.getAllBoards);

module.exports = router;

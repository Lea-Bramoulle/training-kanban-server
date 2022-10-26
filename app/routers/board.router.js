const { Router } = require('express');
const boardController = require('../controllers/board.controller');

const router = new Router();

router.get('/boards', boardController.getAllBoards);
router.get('/boards/:id', boardController.getOneBoard);

module.exports = router;

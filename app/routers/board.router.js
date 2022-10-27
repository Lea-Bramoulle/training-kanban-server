const { Router } = require('express');
const boardController = require('../controllers/board.controller');

const router = new Router();

router.get('/boards', boardController.getAllBoards);
router.get('/boards/:id', boardController.getOneBoard);
router.post('/boards', boardController.createBoard);
router.patch('/boards/:id', boardController.updateBoard);
router.delete('/boards/:id', boardController.deleteBoard);

module.exports = router;

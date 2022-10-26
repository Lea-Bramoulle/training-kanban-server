const { Router } = require('express');
const listController = require('../controllers/list.controller');

const router = new Router();

router.get('/lists', listController.getAllLists);
router.get('/lists/:id', listController.getOneList);
router.get('/boards/:id/lists', listController.getAllListsOfOneBoard);

module.exports = router;

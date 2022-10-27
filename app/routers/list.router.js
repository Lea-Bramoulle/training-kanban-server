const { Router } = require('express');
const listController = require('../controllers/list.controller');

const router = new Router();

router.get('/lists', listController.getAllLists);
router.get('/lists/:id', listController.getOneList);
router.get('/boards/:id/lists', listController.getAllListsOfOneBoard);
router.post('/lists', listController.createList);
router.patch('/lists/:id', listController.updateList);
router.delete('/lists/:id', listController.deleteList);

module.exports = router;

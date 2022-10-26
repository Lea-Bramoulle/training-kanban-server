const { Router } = require('express');
const listController = require('../controllers/list.controller');

const router = new Router();

router.get('/lists', listController.getAllLists);

module.exports = router;

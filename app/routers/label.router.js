const { Router } = require('express');
const labelController = require('../controllers/label.controller');

const router = new Router();

router.get('/labels', labelController.getAllLabels);
router.get('/labels/:id', labelController.getOneLabel);

module.exports = router;

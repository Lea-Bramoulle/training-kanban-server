const { Router } = require('express');
const labelController = require('../controllers/label.controller');

const router = new Router();

router.get('/labels', labelController.getAllLabels);
router.get('/labels/:id', labelController.getOneLabel);
router.post('/labels', labelController.createLabel);
router.patch('/labels/:id', labelController.updateLabel);
router.delete('/labels/:id', labelController.deleteLabel);

module.exports = router;

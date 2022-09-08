const labelController = require("./../controllers/label.controller");

const { Router } = require("express");

const router = new Router();

router.get("/labels", labelController.getAllLabels);

module.exports = router;

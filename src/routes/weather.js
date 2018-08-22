const express = require("express");
const router = express.Router();

const weatherController = require("../controllers/weatherController");

router.get("/weather", weatherController.index);
router.get("/weather/new", weatherController.new);
router.post("/weather/create", weatherController.create);
router.get("/weather/:id", weatherController.show);

module.exports = router;
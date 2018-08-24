const express = require("express");
const router = express.Router();

const criteriaController = require("../controllers/criteriaController");

router.get("/criteria", criteriaController.index);
router.get("/criteria/new", criteriaController.new);
router.post("/criteria/create", criteriaController.create);
router.get("/criteria/:id", criteriaController.show);

module.exports = router;
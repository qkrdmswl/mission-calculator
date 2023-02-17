const express = require("express");
const controller = require("../controllers/calculateController");

const router = express.Router();

router.get("/result", controller.getResultList);

router.post("/:num", controller.saveResult);

router.delete("/delete", controller.deleteResult);

module.exports = router;
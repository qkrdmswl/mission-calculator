const express = require("express");

const router = express.Router();

const calculatorRouter = require("./routes/calculatorRouter");

router.use("/api", calculatorRouter);

module.exports = router;

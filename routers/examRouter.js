const express = require("express");
const {body,param,query} = require("express-validator");
const controller = require("./../controllers/examController");

const router = express.Router();

router.post("/generate",controller.generateExam);
router.post("/answer",controller.answerExam);
module.exports = router;
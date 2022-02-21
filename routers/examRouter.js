const express = require("express");
const {body,param,query} = require("express-validator");
const controller = require("./../controllers/examController");

const router = express.Router();

router.get("",controller.generateExam);
router.post("",controller.answerExam);
module.exports = router;
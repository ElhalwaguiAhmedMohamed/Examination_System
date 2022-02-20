const express = require("express");
const {body,param,query} = require("express-validator");
const controller = require("./../controllers/authenticationController");
const router = express.Router();

router.post("/login" , controller.loginController);

module.exports = router;
const express = require("express");
const {body,param,query} = require("express-validator");
const controller = require("./../controllers/authenticationController");
const router = express.Router();

router.post("/login" , [body("name").isString() , body("password").isString() ,body("user").exists().isIn(['Student','Instructor']).withMessage("Specify a user") ] ,controller.loginController);

module.exports = router;
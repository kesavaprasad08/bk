const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/auth");

const userController = require("../controllers/user");

router.post("/signup", userController.addUser);

router.post("/login", userController.loginUser);

router.get("/auth",userAuthentication.authenticate,userController.checkUser)

module.exports = router;

const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/auth");

const scriptController = require("../controllers/script");

router.post("/create-script",userAuthentication.authenticate,scriptController.createScript);

router.get("/",userAuthentication.authenticate,scriptController.getScripts)

router.post("/",userAuthentication.authenticate,scriptController.postScript);

router.put("/",userAuthentication.authenticate,scriptController.editScript);

module.exports = router;

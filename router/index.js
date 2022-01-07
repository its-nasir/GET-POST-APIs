const express = require("express");
const { AuthenticateToken } = require("../auth/index");
const router = express.Router();
const controller = require("../controller/index");

router.post("/insert", controller.insertData);
router.post("/login", controller.login);
router.post("/logout", AuthenticateToken, controller.logOut);
router.get("/getstate", AuthenticateToken, controller.getState);
router.get("/getdistrict", AuthenticateToken, controller.getDistrict);
router.get("/getAll", controller.getAll);

module.exports = router;

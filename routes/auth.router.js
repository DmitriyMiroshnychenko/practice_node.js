const { Router } = require("express");
const { authController } = require("../controllers");
const { checkJwtToken } = require("../middlewares");

const router = Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.get("/logout", checkJwtToken, authController.logout);

module.exports = { router };

const { Router } = require("express");
const { authController } = require("../controllers");

const router = Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
//endpoint for logout
router.get("/logout", () => {});

module.exports = { router };

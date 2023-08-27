const { Router } = require("express");
const { productController } = require("../controllers");
const { checkJwtToken } = require("../middlewares");

const router = Router();

router.get("/", checkJwtToken, productController.getAll);
router.post("/", checkJwtToken, productController.createOne);

module.exports = { router };

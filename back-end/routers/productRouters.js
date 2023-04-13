const router = require("express").Router()
const { productControllers } = require("../controllers")

router.get("/", productControllers.getProducts);
router.post("/category", productControllers.createCategory);

module.exports = router
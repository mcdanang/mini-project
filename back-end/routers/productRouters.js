const router = require("express").Router()
const { productControllers } = require("../controllers")
const authorize = require('../middleware/authorization');

router.post("/create", authorize.isLogin, productControllers.createProduct);
router.patch("/update/:productId", authorize.isLogin, productControllers.updateProduct);
router.get("/", productControllers.getProducts);

module.exports = router
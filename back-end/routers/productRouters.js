const router = require("express").Router()
const { productControllers } = require("../controllers")

router.post("/create", productControllers.createProduct);
router.patch("/update/:productId", productControllers.updateProduct);
router.get("/", productControllers.getProducts);
router.post("/category", productControllers.createCategory);

module.exports = router
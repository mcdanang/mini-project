const router = require("express").Router()
const { cartControllers } = require("../controllers")
const authorize = require('../middleware/authorization');

router.get("/", authorize.isLogin, cartControllers.getCart)
router.post("/add", authorize.isLogin, cartControllers.addToCart)
router.delete("/delete/:product_id", authorize.isLogin, cartControllers.removeFromCart)
router.delete("/clear", authorize.isLogin, cartControllers.clearCart)

module.exports = router
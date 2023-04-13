const router = require("express").Router()
const { productControllers } = require("../controllers")

router.get("/", productControllers.getProducts)

module.exports = router
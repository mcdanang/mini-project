const router = require("express").Router()
const { categoryControllers } = require("../controllers")
const authorize = require('../middleware/authorization');

router.post("/create", authorize.isLogin, categoryControllers.createCategory);
router.patch("/update/:categoryId", authorize.isLogin, categoryControllers.updateCategory);

module.exports = router
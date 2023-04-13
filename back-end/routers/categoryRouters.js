const router = require("express").Router()
const { categoryControllers } = require("../controllers")

router.post("/create", categoryControllers.createCategory);
router.patch("/update/:categoryId", categoryControllers.updateCategory);

module.exports = router
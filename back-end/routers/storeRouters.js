const router = require("express").Router()
const { storeControllers } = require("../controllers")

router.get("/", storeControllers.getAllStore)
router.get("/:storename", storeControllers.getStore)

module.exports = router
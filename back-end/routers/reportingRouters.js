const router = require("express").Router();
const { reportingControllers } = require("../controllers");
const authorize = require("../middleware/authorization");

router.get("/gross/:store_id", authorize.isLogin, authorize.isOwner, reportingControllers.getGrossIncome)
router.get("/total-transaction/:store_id", authorize.isLogin, authorize.isOwner, reportingControllers.getTotalTransaction)
router.get("/top-selling/:store_id", authorize.isLogin, authorize.isOwner, reportingControllers.getTopSellingProducts)
router.get("/top-selling/:store_id/:category_id", authorize.isLogin, authorize.isOwner, reportingControllers.getTopSellingProductsByCategory)

module.exports = router
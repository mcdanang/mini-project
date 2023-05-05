const router = require("express").Router();
const { reportingControllers } = require("../controllers");
const authorize = require("../middleware/authorization");

router.get("/gross", authorize.isLogin, reportingControllers.getGrossIncome)
router.get("/total-transaction", authorize.isLogin, reportingControllers.getTotalTransaction)
router.get("/top-selling", authorize.isLogin, reportingControllers.getTopSellingProducts)


module.exports = router
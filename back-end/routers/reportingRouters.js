const router = require("express").Router();
const { reportingControllers } = require("../controllers");
const authorize = require("../middleware/authorization");

router.get("/gross/:store_id", authorize.isLogin, reportingControllers.getGrossIncome)
// router.get("/gross/:store_id", authorize.isLogin, reportingControllers.getGrossIncomeInCertainRange)
module.exports = router
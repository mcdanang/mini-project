const router = require("express").Router()
const {transactionControllers } = require("../controllers")
const authorize = require('../middleware/authorization');

router.post("/create", authorize.isLogin, transactionControllers.createTransaction )
router.delete("/delete/:id", authorize.isLogin, transactionControllers.deleteTransaction)

module.exports = router
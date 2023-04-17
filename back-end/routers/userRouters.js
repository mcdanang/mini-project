const router = require("express").Router()
const { userControllers } = require("../controllers")

router.get("/",userControllers.getAllUser)
router.post("/register", userControllers.register)
router.post("/login", userControllers.login)

//Diluar spesifikasi
router.delete("/:id",userControllers.deleteById)

module.exports = router
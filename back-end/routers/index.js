const userRouter = require("./userRouters")
const storeRouter = require("./storeRouters")
const productRouter = require("./productRouters")
const categoryRouter = require("./categoryRouters")
const transactionRouter = require("./transactionRouters")
const cartRouter = require("./cartRouters")

module.exports = {
    userRouter, productRouter, categoryRouter, transactionRouter, storeRouter, cartRouter
}
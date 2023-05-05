const userRouter = require("./userRouters");
const productRouter = require("./productRouters");
const categoryRouter = require("./categoryRouters");
const transactionRouter = require("./transactionRouters");
const reportingRouter = require("./reportingRouters");
const storeRouter = require("./storeRouters");
const cartRouter = require("./cartRouters")

module.exports = { 
    userRouter, 
    productRouter, 
    categoryRouter, 
    transactionRouter, 
    reportingRouter,
    storeRouter,
    cartRouter
};

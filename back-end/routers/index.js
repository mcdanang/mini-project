const userRouter = require("./userRouters");
const productRouter = require("./productRouters");
const categoryRouter = require("./categoryRouters");
const transactionRouter = require("./transactionRouters");
const reportingRouter = require("./reportingRouters");
const storeRouter = require("./storeRouters");

module.exports = { 
    userRouter, 
    productRouter, 
    categoryRouter, 
    transactionRouter, 
    reportingRouter,
    storeRouter
};

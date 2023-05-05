const dotenv = require("dotenv");
dotenv.config();
const express = require("express")
const PORT = process.env.PORT;
const app = express()
const db = require("./models")
const cors = require('cors');

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("This is my third latest API")
})

const { userRouter, storeRouter, productRouter, categoryRouter, transactionRouter, cartRouter} = require("./routers")
app.use("/user", userRouter)
app.use("/store", storeRouter)
app.use("/product", productRouter)
app.use("/category", categoryRouter)
app.use("/transaction", transactionRouter)
app.use("/cart", cartRouter)

app.listen(PORT, () => {
    // db.sequelize.sync({ alter: true })
    console.log(`server running at port : ${PORT}`);
})
const db = require("../models");
// const product = db.Product;

module.exports = {
    getProducts : async (req, res) => {
        try {
            res.status(200).send({
                message: "Products retrieved"
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
}

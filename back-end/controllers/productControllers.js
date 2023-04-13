const db = require("../models");
// const product = db.Product;
const category = db.Category;

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
    createCategory : async (req, res) => {
        try {
            const { name } = req.body;
            const newCategory = await category.create({
                name
            })
            res.status(200).send({
                message: "New category successfully created"
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
}

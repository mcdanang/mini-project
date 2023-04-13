const db = require("../models");
const product = db.Product;
const category = db.Category;

module.exports = {
    createProduct : async (req, res) => {
        try {
            const { name, description, price, category_id, image_url, store_id } = req.body;
            if (!name || !description || !price || !category_id || !image_url || !store_id) {
                throw "Please complete required product data"
            }

            const newProduct = await product.create({
                name, description, price, category_id, image_url, store_id
            })
            res.status(200).send({
                message: "Product successfully created",
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    updateProduct : async (req, res) => {
        try {    
            const productId = req.params.productId;
            
            const existingProduct = await product.findOne({
                where: {
                    id: productId
                }
            })

            if (!existingProduct) throw "Product id not found";

            const newProduct = {...existingProduct};
            const keys = Object.keys(req.body);
            keys.forEach((key) => {
                newProduct[key] = req.body[key];
            }) 

            const updateProduct = await product.update(
                newProduct,
                {
                    where: {
                        id: productId
                    }
                }
            )
            res.status(200).send({
                message: "Product successfully updated",
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
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

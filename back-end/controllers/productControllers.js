const db = require("../models");
const product = db.Product;
const category = db.Category;
const userStore = db.User_store;
const { Op } = require("sequelize");

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
            const page = parseInt(req.query.p) || 1;
            const pageSize = 8;

            const categoryId = parseInt(req.query.c) || null;
            const productName = req.query.n || null;

            const categoryQuery = categoryId? { category_id: categoryId } : {};
            const productQuery = productName? { name: {[Op.like]: '%' + productName + '%'} } : {};

            const products = await product.findAll({
                where: {
                    ...categoryQuery,
                    ...productQuery
                },
                include: [{
                    model: category,
                    attributes:["name"]
                },{
                    model: userStore,
                    attributes:["store_name", "store_address"]
                }],
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });

            res.status(200).send({
                message: "Products retrieved",
                products
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
}

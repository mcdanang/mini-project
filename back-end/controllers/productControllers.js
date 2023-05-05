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
                throw {
                    message: "Please complete required product data"
                }
            }

            const newProduct = await product.create({
                name, description, price, category_id, image_url, store_id
            })
            res.status(200).send({
                message: "Product successfully created",
                data: newProduct
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    updateProduct : async (req, res) => {
        try {    
            const productId = req.params.productId;
            const storeId = req.storeId;
            
            const existingProduct = await product.findOne({
                where: {
                    id: productId,
                    store_id: storeId,
                }
            })

            if (!existingProduct) throw {
                message: "Product id not found"
            }

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
                data: newProduct
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    getProducts : async (req, res) => {
        try {
            const page = parseInt(req.query.p) || 1;
            const pageSize = 9;

            const categoryId = parseInt(req.query.c) || null;
            const productName = req.query.q || null;
            const sortType = req.query.s || "none";
            const storeId = parseInt(req.query.store) || null;
            const isActive = parseInt(req.query.active) || null;

            const sortMap = {
                az: [["name", "ASC"]],
                za: [["name", "DESC"]],
                lh: [["price", "ASC"]],
                hl: [["price", "DESC"]],
                none: null
            };

            const categoryQuery = categoryId? { category_id: categoryId } : {};
            const storeQuery = storeId? { store_id: storeId } : {};
            const productQuery = productName? { name: {[Op.like]: '%' + productName + '%'} } : {};
            const activeQuery = isActive? { is_active: isActive } : {};
            
            const products = await product.findAndCountAll({
                where: {
                    ...categoryQuery,
                    ...productQuery,
                    ...storeQuery,
                    ...activeQuery
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
                order: sortMap[sortType],
            });

            res.status(200).send({
                message: "Products retrieved",
                products: products.rows,
                count: products.count,
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    }     
}
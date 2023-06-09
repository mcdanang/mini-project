const db = require("../models");
const category = db.Category;

module.exports = {
    getCategories : async (req, res) => {
        try {
            const categories = await category.findAll()
            res.status(200).send({
                message: "Categories retrieved",
                categories
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
                message: "New category successfully created",
                data: newCategory
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    updateCategory : async (req, res) => {
        try {
            const categoryId = req.params.categoryId;
            
            const existingCategory = await category.findOne({
                where: {
                    id: categoryId
                }
            })

            if (!existingCategory) throw "Category id not found";

            const newCategory = {...existingCategory};
            const keys = Object.keys(req.body);
            keys.forEach((key) => {
                newCategory[key] = req.body[key];
            }) 

            const updateCategory = await category.update(
                newCategory,
                {
                    where: {
                        id: categoryId
                    }
                }
            )
            
            res.status(200).send({
                message: "Category successfully updated",
                data: newCategory
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
}

const { Sequelize}=require("sequelize")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models")
const user = db.User
const user_store = db.User_store
const product = db.Product

module.exports = {
    register: async (req, res) => {
        try {
            const {username, email, password, address, phone, store_name, store_address} = req.body
    
            if (!username || !email || !password || !address || !phone || !store_name || !store_address) {
                throw "Please fill all required information"
            }
    
            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(req.body.password, salt)
    
            const userResult = await user.create({
                username,
                email,
                password: hashPass,
                address,
                phone
            })
         
            const userStoreResult = await user_store.create({
                store_name,
                store_address,
                user_id: userResult.id
                
            })
           
            res.status(200).send({
                data: {
                    user: userResult,
                    store: userStoreResult
                },
                message: "Your account has been registered successfully"
            })
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    

    login : async (req, res) => {
        try {
            const { username, password } = req.body

            // if (!username && !password ) throw "Username and password does not exist"
            if(!username)throw "Please insert username"
            if(!password) throw "Please insert password"

            const userExist = await user.findOne({
                where: {
                    username

                }
            })

            if (!userExist) throw {
                status: false,
                message: "User not found"
            }

            const isvalid = await bcrypt.compare(password, userExist.password)

            if (!isvalid) throw {
                status: false,
                message: "Incorrect password"
            }

            const payload = { id: userExist.id }
            const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "1h"})

            res.status(200).send({
                message: "Login Success",
                data: userExist,
                token
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },

    getAllUser : async (req,res) =>{
        try{
            const data = await user.findAll()
            res.status(200).send({
                status: true,
                data
            })
        }catch(err){
            res.status(400).send(err)
        }
    },

    deleteById: async (req,res) => {
        try{
            const terhapus = await user.destroy({where:{id: req.params.id}})
            res.status(200).send({
                status:true,
                message: "Data is Deleted"
            })
        }catch(err){
            res.status(400).send(err)
        }
    },

    filterProduct: async (req,res) => {
        try{
            const filteredProduct = await product.findAll({
                where: {
                    name: req.body.name
                }
            })
            res.status(200).send({
                status: true,
                data: filteredProduct
            })
        }catch(err){
            res.status(400).send(err)
        }
    }
}

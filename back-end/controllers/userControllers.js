const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models")
const user = db.User
const user_store = db.User_store

module.exports = {
    register: async (req, res) => {
        try {
            const {username, email, password, address, phone, store_name, store_address} = req.body
    
            if (!username || !email || !password || !address || !phone || !store_name || !store_address) {
                throw {
                    message: "Please fill all required information"
                }
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

            if(!username) throw {
                message: "Please insert username"
            }
            if(!password) throw {
                message: "Please insert password"
            }

            const userExist = await user.findOne({
                where: {
                    username
                },
            })

            if (!userExist) throw {
                message: "User not found"
            }

            console.log(userExist);

            const isvalid = await bcrypt.compare(password, userExist.password)

            if (!isvalid) throw {
                message: "Incorrect password"
            }

            const storeExist = await user_store.findOne({
                where: {
                    user_id: userExist.id
                },
            })

            const payload = { id: userExist.id }
            const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "1h"})

            res.status(200).send({
                message: "Login Success",
                user: userExist,
                store: storeExist,
                token
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },

    getAllUser : async (req,res) => {
        try{
            const data = await user.findAll()
            res.status(200).send({
                message: "Successfully get all users data",
                data
            })
        }catch(err){
            console.log(err);
            res.status(400).send(err)
        }
    },

    getUser : async (req,res) => {
        try{
            const userExist = await user.findOne({
                where: {username: req.params.username},
                include: user_store
            })
            if (!userExist) throw {
                message: "Username not found"
            }
            res.status(200).send({
                message: `Sucessfully get data for user_id ${userExist.id}`,
                userExist
            })
        }catch(err){
            console.log(err);
            res.status(400).send(err)
        }
    },

    deleteById: async (req,res) => {
        try {
            const userExist = await user.findOne({
                where: {id: req.params.id},
                include: user_store
            })
            if (!userExist) throw {
                message: "User ID not found"
            }
            const deletedUserStore = await user_store.destroy({where:{user_id: userExist.User_store.user_id}})
            const deletedUser = await user.destroy({where:{id: userExist.id}})
            res.status(200).send({
                message: `Data user_id ${req.params.id} is successfully deleted`
            })
        } catch(err) {
            console.log(err);
            res.status(400).send(err)
        }
    }
   
}

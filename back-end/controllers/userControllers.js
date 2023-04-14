const { Sequelize}=require("sequelize")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models")
const user = db.User

module.exports = {
    register : async (req, res) => {
        try {
            const {username, email, password, address, phone} = req.body

            if (!username|| !email || !password || !address || !phone) throw "Please fill all required information"

            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(password, salt)

            const result = await user.create({
                username,
                email,
                password: hashPass,
                address,
                phone
            })

            res.status(200).send({
                status: true,
                data: result,
                message: "Your account has been registered successfully "
            })
            
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    login : async (req, res) => {
        try {
            const { email, password } = req.body

            // if (!email && !password ) throw "Username and password does not exist"
            if(!email)throw "Please insert username"
            if(!password) throw "Please insert password"

            const userExist = await user.findOne({
                where: {
                    email

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
            const token = jwt.sign(payload, process.env.KEY, { expiresIn: "1h"})

            res.status(200).send({
                status: true,
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
    }
}

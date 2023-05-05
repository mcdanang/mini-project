const db = require("../models")
const user_store = db.User_store

module.exports = {
    getAllStore : async (req,res) => {
        try{
            const data = await user_store.findAll()
            res.status(200).send({
                message: "Successfully get all stores data",
                data
            })
        }catch(err){
            console.log(err);
            res.status(400).send(err)
        }
    },

    getStore : async (req,res) => {
        try{
            const data = await user_store.findOne({
                where: {store_name: req.params.storename},
            })
            if (!data) throw {
                message: "Store not found"
            }
            res.status(200).send({
                message: `Sucessfully get data for store_name: ${data.store_name}`,
                data
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
